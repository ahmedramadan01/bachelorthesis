import docker
import time
import threading
import subprocess

client = docker.from_env()
threads = []
system_containers_names = ["control_center","train_dispatcher","passengers","emergency","screen"]
system_backend_containers_names = ["control_center","train_dispatcher","passengers","emergency"]


def run_stresstest(container):
    if(container.name != "screen"):
        container.exec_run(cmd=["python", "stresstest.py"])
    elif(container.name == "screen"):
        container.exec_run(cmd=["node","stresstest.js"])

#Test Case D
def containers_four_cpus(containers):
    for container in containers:
        if(container.name in system_containers_names):
            try:
                container.update(cpuset_cpus="0,1,2,3")
                time.sleep(1)
                # monitor in grafana
            except Exception as e:
                print("Error is ", e)
    print("sleep begins before stress on 4 cores")
    time.sleep(120)
    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)
    # monitor in grafana

#TEST CASE A
def containers_one_cpu(containers):
    for container in containers:
        if(container.name in system_containers_names):
            try:
                container.update(cpuset_cpus="0")
                time.sleep(1)
                # monitor in grafana
            except Exception as e:
                print("Error is ", e)
    print("sleep for one cpu begins before running the stress test....")
    time.sleep(1)

    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)
    # monitor in grafana
 


"""
TEST 3: all containers running on 2 cpus # 3 on one core and # 2 on another cpu
"""
def containers_two_cpus(containers):
    for container in containers:

        if(container.name in system_containers_names):
            try:
                container.update(cpuset_cpus="1,2")
                # monitor in grafana
                time.sleep(1)

            except Exception as e:
                print("Error is ", e)
    time.sleep(120)
    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)


#TESTCASE B
def containers_different_cpus(containers):
    for container in containers:
        if(container.name == "screen"):
            try:
                container.update(cpuset_cpus="0")
                # monitor in grafana
                time.sleep(1)

            except Exception as e:
                print("Error is ", e)
        elif(container.name in system_backend_containers_names):
            try:
                container.update(cpuset_cpus="1,2,3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
    print("sleep for different cpus begins before running the stress test....")
    time.sleep(5)
    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)

#TESTCASE C
def containers_cpu_Affinity(containers):
    for container in containers:
        if(container.name == "screen"):
            try:
                container.update(cpuset_cpus="0")
                # monitor in grafana
                time.sleep(1)

            except Exception as e:
                print("Error is ", e)
        elif(container.name == "control_center"):
            try:
                container.update(cpuset_cpus="1")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "passengers"):
            try:
                container.update(cpuset_cpus="2")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "emergency"):
            try:
                container.update(cpuset_cpus="3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "train_dispatcher"):
            try:
                container.update(cpuset_cpus="0")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
    print("sleep for Affinity cpus begins before running the stress test....")
    time.sleep(1)
    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)

#TestCase E

def containers_cpu_Even(containers):
    for container in containers:
        if(container.name == "screen"):
            try:
                container.update(cpuset_cpus="0,1,2,3")
                # monitor in grafana
                time.sleep(1)

            except Exception as e:
                print("Error is ", e)
        elif(container.name == "control_center"):
            try:
                container.update(cpuset_cpus="0,3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "passengers"):
            try:
                container.update(cpuset_cpus="1,3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "emergency"):
            try:
                container.update(cpuset_cpus="2,3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
        elif(container.name == "train_dispatcher"):
            try:
                container.update(cpuset_cpus="3")
                time.sleep(1)
            except Exception as e:
                print("Error is ", e)
    print("sleep for evenly distribution begins before running the stress test....")
    time.sleep(1)
    for container in containers:
        if(container.name in system_containers_names):
            thread = threading.Thread(target=run_stresstest, args=(container,))
            threads.append(thread)
            thread.start()
            time.sleep(1)
      
"""
TEST 4: all containers exceed available cpus
"""
def all_containers_Exceed_available_cpus(containers):
    for container in containers:

        try:
            container.update(cpuset_cpus="0,1,2,3,4")
        except Exception as e:
            print("Error is ", e)


"""
TEST 4: run high cpu usage script inside all the containers
prime numbers or similar in every test
"""


def main():
    while True:
        all_containers = client.containers.list()
        print(all_containers)
        #print("Starting stress test on one cpu")
        #containers_one_cpu(all_containers)
        #print("sleeping begins...")
        #time.sleep(120)
        #print("Starting stress test on two cpus")
        #containers_two_cpus(all_containers)
        #print("sleeping begins...")
        #time.sleep(120)
        #print("Starting stress test on four cpus")
        #containers_four_cpus(all_containers)
        #print("sleeping begins...")
        #time.sleep(60)
        #print("Starting stress test on different cpus")
        #containers_different_cpus(all_containers)

        #print("Affinity test")
        #containers_cpu_Affinity(all_containers)
        #print("Test E ")

        containers_cpu_Even(all_containers)
        print("sleeping begins...")
        time.sleep(5000)
        #print("Containers relocating begins....")
        #subprocess.run(["sudo","python3","dynamicRelocation.py"])
        #print("sleeping begins...")
        #time.sleep(60)
        #print("allocating Memory begins...")
        #subprocess.run(["sudo","python3","../Memory/memory.py"])
        #time.sleep(60)
        #subprocess.run["sudo","python3","../Troughput/throughput.py"]
        
        #print("long sleep begins...")
        #time.sleep(500)

if __name__ == "__main__":
    main()
    
print(client)