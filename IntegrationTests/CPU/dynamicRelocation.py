import docker
import psutil
import time

#Initialize Docker client
client = docker.from_env()
system_containers_names = ["control_center","train_dispatcher","passengers","emergency","screen"]

#CPU usage percentage
def get_cpu_usage(container_id):
    container = client.containers.get(container_id)
    stats = container.stats(stream=False)
    print("stats are", stats)
    cpu_usage = stats['cpu_stats']['cpu_usage']['total_usage']
    system_cpu_usage = stats['cpu_stats']['system_cpu_usage']
    pre_cpu_usage = stats['precpu_stats']['cpu_usage']['total_usage']
    pre_system_cpu_usage= stats['precpu_stats']['system_cpu_usage']
    cpu_count = stats['cpu_stats']['online_cpus']
    cpu_delta = cpu_usage - pre_cpu_usage
    system_delta = system_cpu_usage - pre_system_cpu_usage
    print("count is ",cpu_count)
    cpu_percent = (cpu_delta / system_delta) * cpu_count * 100
    return cpu_percent

def get_least_utilized_cpu():

    #interval is the time over calculating the cpu percentage 
    cpu_count = psutil.cpu_count(logical=True)
    cpu_percentages = [psutil.cpu_percent(interval=1, percpu=True)[i] for i in range(cpu_count)]
    least_utilized_cpu = cpu_percentages.index(min(cpu_percentages))
    return least_utilized_cpu
    

def relocate_container(container_id):
    least_utilized_cpu = get_least_utilized_cpu()
    container = client.containers.get(container_id)
    container.update(cpuset_cpus=f'{least_utilized_cpu}')
    
    

def main():
    #while True:
        # Get all running containers
    containers = client.containers.list()
        
    for container in containers:

        if container.name in system_containers_names:

            #CPU usage of each container
            cpu_percent = get_cpu_usage(container.id)
            print(cpu_percent)
                
            #threshold, relocate container
            if cpu_percent > 90:
                print(f"Container {container.name} (ID: {container.id}) is using {cpu_percent}% CPU.")
                print("Relocating container to least utilized CPU...")
                relocate_container(container.id)
                print("Container relocated successfully.")
        
        # Wait for some time before checking again
    #time.sleep(60)
    

if __name__ == "__main__":
    main()
