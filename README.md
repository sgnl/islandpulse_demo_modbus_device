# Island Pulse Modbus Device
This is a supplemental repository used as an aid for a [InfluxDB Dashboard Template for Modbus](https://github.com/influxdata/community-templates/tree/master/modbus). Please refer to that repository for more information.

## Requirements

- Node version 8.6.0 or higher
- Yarn package manager for NodeJS
- Postgres database installed or have access to

## How to start

1. Clone repo and run `yarn` to install dependencies
1. Import `areas.csv` file into apostgres database as a table named "areas"
1. run `yarn start`

Your device should start accepting TCP connections!

**Default Settings**

**Slave Id:** `1`
**Location:** `tcp://127.0.0.1:502`

