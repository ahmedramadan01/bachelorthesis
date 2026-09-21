import docker
import time
import threading
from prometheus_client import Gauge, start_http_server


ports = [70,80,90,95]
system_containers_names = ["control_center","train_dispatcher","passengers","emergency","screen"]
system_backend_containers_names = ["control_center","train_dispatcher","passengers","emergency"]
threads = []

packet_loss_gauge = Gauge('iperf_packet_loss','Packet loss percentages')
def run_stresstest(container,i,servers_ipaddress):
    while(True):
        if(container.name == "screen"):
            exec_res = container.exec_run(["iperf", "-c", f"{servers_ipaddress[i]}","-u","-b","2000M","-p",f'{ports[i]}'])
            stdout = exec_res.output.decode('utf-8')
            print(type(stdout))
            print(stdout)
            #yield stdout
            revstdout = stdout[::-1]
            packet_loss = revstdout[revstdout.index(')') + 1:revstdout.index('(') ]
            packet_loss = packet_loss[::-1]
            packet_loss = packet_loss[0:len(packet_loss)-1]
            print("packetloss is", packet_loss)
            packet_loss_gauge.set(packet_loss)
            print("packetloss is", packet_loss)
            #parse_export_metrics(stdout)
        time.sleep(2)
def run_serverListen(container,port):
    try:
        command = ["iperf", "-s","-u","-p", str(port)]
        print(f"Running command in container {container.name}: {' '.join(command)}")
        execRes = container.exec_run(command)
        stdout = execRes.output.decode('utf-8')
        print(f"Output from container {container.name} on port {port}:\n{stdout}")
    except Exception as e:
        print(f"Failed to start iperf server in container {container.name} on port {port}: {e}")
    


def openServerConnection(containers,servers_ipaddress):
    for i in range(0,len(servers_ipaddress)):
        global ports
        if(containers[i].name in system_backend_containers_names):
            thread = threading.Thread(target=run_serverListen, args=(containers[i],ports[i]))
            threads.append(thread)
            thread.start()
            time.sleep(1)


def openClientConnection(container, servers_ipaddress: list[str]):
    for i in range(0,len(servers_ipaddress)):
            thread = threading.Thread(target=run_stresstest, args=(container,i,servers_ipaddress))
            threads.append(thread)
            thread.start()
            #time.sleep(5)


if __name__ == "__main__":
    start_http_server(8000)
    client = docker.from_env()
    containers = client.containers.list()
    print(type(containers))
    sysContainers = []
    for container in containers:
        if(container.name in system_containers_names):
            sysContainers.append(container)

    serverContainers = []
    serverContainersIpAddresses = []
    clientContainer = ""
    for container in containers:
        if (container.name == "screen"):
            print("this is the client container", container.id)
            clientContainer = container
        elif(container.name in system_backend_containers_names):
            serverContainers.append(container)
            ipAdress = container.attrs['NetworkSettings']['Networks']['infotainment_system_default']['IPAddress']
            serverContainersIpAddresses.append(ipAdress)
    print(serverContainersIpAddresses)

    openServerConnection(serverContainers,serverContainersIpAddresses)
    time.sleep(1)
    openClientConnection(clientContainer,serverContainersIpAddresses)
    #time.sleep()
    #print(server_containers)
    #containers_servers(serverContainers)
    #time.sleep(10)
    #container_client(clientContainer, serverContainersIpAddresses)
