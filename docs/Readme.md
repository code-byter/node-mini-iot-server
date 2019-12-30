# Mini IoT Server

This is a minimal server for IoT experiments.
The idea is to have the simplest server that accepts any files as up- and downloads.
In addition to this the server supports mapping CSV to the simple-json-data-source format.

Use Cases

- store images captures via an esp32cam
- store sensor data from an esp32/esp8266
- visualize sensor data with grafana (see below for details)

## Getting Started

Install nodejs, then clone this repose. Then, in a shell run the following commands in the repositories folder.

    npm install
    npm run compile
    npm run start

## Configuration

See `mini-iot-config.json`;

## Security

This server has no security. Any one can write to it. Only run this on your local network.

## Api Examples

The idea is that each device gets its own folder `your-device-id`, which can be a UUID or a human readable name. This folder is created once you try to upload a file.

### Upload a file

You can upload a file

    wget --header="Content-type: multipart/form-data boundary=FILEUPLOAD" --post-file docs/example.csv "http://localhost:8000/files/your-device-id/example.csv"
    wget --header="Content-type: multipart/form-data boundary=FILEUPLOAD" --post-file docs/example.csv.descr.json "http://localhost:8000/files/your-device-id/example.csv.descr.json"

### Download a file

You can download a file

    wget "http://localhost:8000/files/your-device-id/example.csv"

### Append to a file

You can append the contents of a file via
        wget --header="Content-type: multipart/form-data boundary=FILEUPLOAD" --post-file docs/example.csv "http://localhost:8000/files/your-device-id/example.csv?append=true" -O-

### Append CSV to a file

You can append the contents of a file and prefix it with the servers current time (`1572611432279,`):
        wget --header="Content-Type:text/plain"  --post-data "1,2,3" "http://localhost:8000/files/your-device-id/data.csv?append=true&tsprefix=true"

This is useful where your sensor does not have a clock.

If your device has a clock, you can remove the option `tsprefix`.

## Grafana Simple JSON Data Source

If you upload a CSV file, you can access it as a [grafana simple json data source](https://grafana.com/grafana/plugins/grafana-simple-json-datasource), if and only if the first column is the timestamp column, and all other values are `float`.

So far, only `timeserie` is supported.

Example URL:

    http://localhost:8000/csv2grafana/your-device-id/example.csv/

The following query parameters are supported:

- targets
- range

## Docker

Build the image locally

    docker build -t uvwxy/mini-iot-server .

Start the container

    docker run -p 8000:8000 -d uvwxy/mini-iot-server

Or

    docker-compose up -d

Check the `docker-compose.yml` for details.