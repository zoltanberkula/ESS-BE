# Energy Storage and Management System

- Solar Systems
- Battery Systems
- Green Power Management
- Green Power Storage
- Smart Buildings
- IoT
- RasperryPi/RevPi/OrangePi/BananaPi

## Features

- Local data collection and metering from electrical measuring devices via ModbusRTU
- Remote Data telemetry to Cloud Databases via MQTT
- High Power switching mechanism controlling using GPIO pins
- Dynamic Data Visualization using Real Time Graphs and snapshot features
- Advanced data logging and debugging features
- Containerization support
- Versatile hardware enhancement


## System Design

![image](ESS_BLOCK_DIAGRAM_0v2.jpg)

## Tech

Dillinger uses a number of open source projects to work properly:

- [ReactJS]
- [NodeJS]
- [GCP]
- [Firestore]
- [CloudFunctions]
- [Docker]
- [RaspberryPi]
- [MQTT]
- [ModbusRTU]

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd ess-fe
npm install
npm start
```

## Docker

```sh
cd ess-fe
docker build -t <youruser>/ess-fe:${package.json.version} .
```

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=ess-fe <youruser>/ess-fe:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   
[ReactJS]: <https://react.dev/>
[NodeJS]: <http://nodejs.org>
[GCP]: <https://cloud.google.com/>
[Firestore]: <https://cloud.google.com/firestore>
[CloudFunctions]: <https://cloud.google.com/functions>
[Docker]: <https://www.docker.com/>
[RaspberryPi]: <https://www.raspberrypi.com/>
[MQTT]: <https://mqtt.org/>
[ModbusRTU]: <https://www.modbustools.com/modbus.html>

