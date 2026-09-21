# Embedded Software Architectures with Docker

![Python](https://img.shields.io/badge/Python-3-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![Docker](https://img.shields.io/badge/Docker-24-blue)
![Flask](https://img.shields.io/badge/Flask-REST%20API-black)

Bachelor thesis project investigating the deployment and performance of a containerized microservice architecture on embedded hardware.

The project simulates a **train communication and infotainment system** consisting of a React client and four Flask-based backend services. All components are deployed as Docker containers and evaluated under different CPU, memory, and network configurations.

The final target platform of the system was an **NXP i.MX8 quad-core embedded board**.

---

## Overview

The system consists of five containerized services:

- **React Client** — represents the train infotainment/display interface
- **Control Center Service**
- **Emergency Service**
- **Passenger Service**
- **Train Dispatcher Service**

The React client communicates with the backend services through REST APIs.

The main objective of the thesis was not only to containerize the application, but also to investigate how different container configurations affect system performance on resource-constrained embedded hardware.

Different container-to-CPU distributions were tested and compared using:

- CPU utilization
- Memory consumption
- Network throughput
- Container resource limits
- Response-time measurements

---

## Architecture

```text
                     ┌──────────────────────┐
                     │     React Client     │
                     │   Infotainment UI    │
                     └──────────┬───────────┘
                                │
                         REST API / HTTP
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
 ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
 │ Control Center │    │   Emergency    │    │   Passengers   │
 │ Flask Service  │    │ Flask Service  │    │ Flask Service  │
 └────────────────┘    └────────────────┘    └────────────────┘
                                │
                                ▼
                       ┌────────────────┐
                       │Train Dispatcher│
                       │ Flask Service  │
                       └────────────────┘

                 All components run in Docker containers
```

The architecture was designed to evaluate whether a microservice-based containerized system can operate efficiently on embedded hardware while maintaining acceptable performance and resource consumption.

---

## Technology Stack

### Backend

- Python 3
- Flask
- REST APIs

### Frontend

- React
- JavaScript
- Node.js

### Containerization

- Docker
- Docker Compose

### Monitoring and Performance Testing

- Python
- Docker resource constraints
- iPerf
- Prometheus
- Grafana

### Target Hardware

- NXP i.MX8
- Quad-core CPU

---

## Project Structure

```text
.
├── Backend/
│   └── webservers/
│       ├── control_center/
│       ├── emergency/
│       ├── passengers/
│       └── train_dispatcher/
│
├── my-infotainment/
│   └── React frontend application
│
├── IntegrationTests/
│   ├── CPU/
│   │   └── cpu.py
│   ├── Memory/
│   │   └── memory.py
│   └── Throughput/
│       └── throughput.py
│
├── MonitorTools/
│   └── docker-compose.yml
│
├── dynamicRelocation/
│   └── Dynamic container relocation logic
│
├── docker-compose.yml
└── startSystem.py
```

### Main Components

#### `Backend/webservers`

Contains the four Flask backend services used by the train communication simulation.

#### `my-infotainment`

Contains the React frontend representing the train infotainment screen.

#### `docker-compose.yml`

Defines and starts the five main application containers.

#### `MonitorTools/docker-compose.yml`

Starts the monitoring infrastructure used to observe container and system metrics.

#### `IntegrationTests`

Contains automated performance experiments for CPU, memory, and network throughput.

#### `dynamicRelocation`

Contains the logic for dynamically relocating Docker containers based on CPU utilization thresholds.

---

## Installation

For a local development environment, install:

- Python 3
- Node.js
- npm
- Flask
- Docker
- Docker Compose

Install the React dependencies:

```bash
cd my-infotainment
npm install
```

> **Note:** If you want to run the complete system through Docker, most application dependencies are installed directly inside the Docker images.

---

## Usage

To start the complete system and execute the configured integration tests:

```bash
sudo python3 startSystem.py
```

The script starts the required Docker containers and runs the performance experiments.

---

# Performance Experiments

A major part of the thesis was evaluating the behavior of the containerized architecture under different resource configurations.

The experiments focused on three main areas:

1. CPU utilization and container placement
2. Memory requirements
3. Network throughput

---

## CPU Tests

Location:

```text
IntegrationTests/CPU/cpu.py
```

The CPU experiments run the complete system using different distributions of containers across the four available CPU cores.

The goal was to determine how CPU affinity and container placement influence application performance.

Several deployment configurations were evaluated and compared.

For example:

```text
CPU Core 0 -> Client
CPU Core 1 -> Control Center
CPU Core 2 -> Emergency + Passenger
CPU Core 3 -> Train Dispatcher
```

Other experiments used different combinations of containers per CPU core.

The resulting performance metrics were compared to determine the most efficient distribution.

---

## Memory Tests

Location:

```text
IntegrationTests/Memory/memory.py
```

The memory experiments determine the minimum amount of memory required by each container.

Docker memory limits are progressively adjusted to observe:

- Normal application operation
- Memory consumption
- Minimum usable memory
- Out-of-memory behavior

These experiments help determine suitable memory allocations when deploying the architecture to resource-constrained embedded hardware.

---

## Network Throughput Tests

Location:

```text
IntegrationTests/Throughput/throughput.py
```

Network throughput between the client container and backend containers is measured using **iPerf**.

The tests measure the amount of data that can be transferred per second between the React client container and the backend services.

```text
Client
   │
   ├── Control Center
   ├── Emergency
   ├── Passengers
   └── Train Dispatcher
```

The results are expressed primarily in **MB/s** and are used to evaluate the communication performance of the containerized architecture.

---

## Monitoring

The project includes monitoring components based on:

- Prometheus
- Grafana
- Docker metrics

These tools were used to observe container performance during the experiments.

Metrics such as CPU consumption, memory consumption, and application behavior could be monitored while different deployment configurations were running.

---

## Dynamic Container Relocation

The repository also contains an experimental dynamic relocation mechanism.

Location:

```text
dynamicRelocation/
```

The purpose of this component is to react to CPU utilization.

If CPU utilization exceeds a configured threshold, containers can be reassigned to different CPU cores in order to investigate whether dynamic resource allocation can improve the overall system performance.

Conceptually:

```text
Monitor CPU Load
       │
       ▼
Threshold exceeded?
       │
      Yes
       │
       ▼
Determine alternative CPU core
       │
       ▼
Update container CPU affinity
```

This experiment explores how container orchestration concepts can be applied on a smaller scale to embedded systems.

---

## Results

Several container deployment strategies were evaluated using the collected CPU, memory, throughput, and response-time metrics.

The experiments showed that container placement and resource allocation have a measurable impact on the performance of the system.

Among the evaluated configurations, **Test Case E** provided the best overall distribution for the tested environment.

The result was determined by comparing the collected performance metrics across the different deployment configurations.

---

## Thesis Objectives

The project explored several questions related to containerized embedded systems:

- Can a microservice architecture run efficiently on embedded hardware?
- What is the resource overhead introduced by Docker containers?
- How should containers be distributed across a quad-core processor?
- How much memory should be allocated to each service?
- What network throughput can be achieved between containers?
- Can container placement be adjusted dynamically based on system load?

The experiments were designed to provide practical measurements rather than relying only on theoretical resource estimates.

---

## What I Learned

This project gave me practical experience with:

- REST API design
- Docker containerization
- Docker Compose
- CPU affinity and CPU pinning
- Container memory limits
- Embedded Linux environments
- Performance benchmarking
- Network throughput testing
- Prometheus monitoring
- Grafana dashboards
- React frontend development
- Flask backend development
- Automated performance experiments
- Resource-aware software architecture

It also introduced me to the challenges of deploying software architectures on hardware with limited CPU and memory resources.

---

## Academic Context

This repository contains the implementation developed as part of my **Bachelor's Thesis in Computer Science at TU Ilmenau**.

**Thesis topic:**  
*Embedded Software Architectures with Docker*

The project was developed as an academic research prototype and is published primarily for educational and portfolio purposes.

> **Note:** This is an archived university project. Some dependencies and implementation details reflect the software versions and experimental requirements used at the time of the thesis and may not represent current production best practices.

---

## License

This repository is provided for educational and portfolio purposes.
