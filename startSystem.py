"""
run the system and tests
"""
import subprocess
import time


def start_system():
    subprocess.run(["sudo", "docker", "compose", "up"])


def start_integration_tests():
    subprocess.run(["sudo", "python3", "IntegrationTests/CPU/cpu.py"])
    time.sleep(100)
    subprocess.run(["sudo", "python3", "IntegrationTests/Memory/memory.py"])
    time.sleep(100)
    subprocess.run(["sudo", "python3","IntegrationTests/Throughput/throughput.py"])


def start_monitor_tools():
     subprocess.run(["sudo", "docker", "compose","up"], cwd="monitorTools")


if __name__ == "__main__":
    start_system()
    time.sleep(100)
    start_monitor_tools()
    time.sleep(100)
    start_integration_tests()
