import docker
import time
import gc

gc.disable()
client = docker.from_env()

system_containers_names = ["control_center","train_dispatcher","passengers","emergency","screen"]


def allocate_memory_mb(container) -> str:
    seed_mem = "300m"
    stats = container.stats(stream=False)
    print(stats)
    container_id = container.id
 

    while (True):
        try:
            container.update(mem_limit=seed_mem, memswap_limit=seed_mem,kernel_memory=seed_mem,mem_reservation="0m")
        except Exception as e:
            print("Error is ",e)
        isHealthy = check_container_health(container_id)
        time.sleep(2)
        isHealthy = check_container_health(container_id)
        print(isHealthy)
        if isHealthy:
            new_mem = seed_mem.split("m")[0]
            print(f'The memory allocated to container {container.name} is ' , new_mem)
            new_mem = int(new_mem) - 1
            seed_mem = str(new_mem) + "m"

        else:
            min_mb = seed_mem.split("m")[0]
            min_mb = int(min_mb) + 1
            min_mb = str(min_mb) + "m"
            try:
                container.update(mem_limit=min_mb,memswap_limit=min_mb,kernel_memory=min_mb,mem_reservation="0m")
            except Exception as e:
                print("Error is ",e)
            time.sleep(2)
            container.restart()
            return min_mb


def allocate_mem_bytes(container, mini_mb) -> int:
    low_bytes = 1
    high_bytes = 10**6

    mini_b = int(mini_mb.split("m")[0]) * 10**6
    res = ""
    while (low_bytes <= high_bytes):
        mid = (low_bytes + high_bytes) // 2
        mem_bytes_precise = mini_b - mid
        print(mem_bytes_precise, "b")
        container.update(mem_limit=str(mem_bytes_precise) + "b",kernel_memory=str(mem_bytes_precise) + "b",memswap_limit=str(mem_bytes_precise) + "b",mem_reservation="0m")
        isHealthy = check_container_health(container.id)
        time.sleep(2)
        isHealthy = check_container_health(container.id)


        if isHealthy:
            res = mem_bytes_precise
            high_bytes = mid - 1

        else:
            low_bytes = mid + 1
    else:
        return res


def check_container_health(container_id) -> bool:
    container = client.containers.get(container_id)
    # Check if the container is running
    if container.status != 'running':
        return False
    else:
        return True

def main():
    containers = client.containers.list()
    print(system_containers_names)

    for container in containers:
        if container.name in system_containers_names:
            print(type(container))
            name = container.name
            ports = container.ports
            image = container.image.tags
            image_str = "".join(image)
            cpus = container.attrs['HostConfig']['CpusetCpus']
            print("num cpus are", cpus)
            print("container_name is", name)
            print("container_ports are ",ports)
            print("container_image_is ", image_str)

            min_mb = allocate_memory_mb(container)
            print(f'minimum mega bytes for this container {container.name}',min_mb)
            time.sleep(5)
            min_byte = allocate_mem_bytes(container, min_mb)
            print(f'minimum bytes for this container {container.name}',min_byte)


    
if __name__ == "__main__":
    main()


gc.enable()

    

