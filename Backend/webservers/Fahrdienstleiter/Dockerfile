FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir flask=='3.0.0' && \
    pip install --no-cache-dir Flask-Cors=='4.0.0'
RUN apt-get update && \
    apt-get install -y iputils-ping && \
    apt-get install -y iperf && \
    apt-get install -y nano  && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*



EXPOSE 5000

ENV FLASK_APP=fahrdienstleiter.py

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]

