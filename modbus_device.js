var ModbusRTU = require("modbus-serial");

var vector = {
  getHoldingRegister: function (addr, _unitID, callback) {
    getData((err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const mappedAreaNames = AREA_NAMES.map((an) => {
        return data.filter((d) => d["AREA NAME"] === an)[0].MW;
      });
      console.log(
        `sending: ${ mappedAreaNames[addr]}`,
        mappedAreaNames[addr] * 10
      );
      callback(null, mappedAreaNames[addr] * 10);
    });
  },
};

// set the server to answer for modbus requests
console.log("ModbusTCP listening on modbus://127.0.0.1:502");
var serverTCP = new ModbusRTU.ServerTCP(vector, {
  host: "0.0.0.0",
  port: 8502,
  unitID: 1,
});


const postgres = require("postgres");
const sql = postgres("postgres://@localhost:5432/island_pulse", {
  // ...options,
});

function getData(cb) {
  const result = sql`
    select * from areas
    where "TIME" between (now() - '1 year'::interval) and (now() + '30 minutes'::interval - '1 year'::interval);
  `
    result
      .then((data) => {
        // console.log(data);
        cb(null, data)
      })
      .catch(console.error);
}

const AREA_NAMES = [
  "Airport",
  "Central/Wahiawa",
  "Downtown",
  "Ewa",
  "Kahuku",
  "Kailua",
  "Kalihi",
  "Total_System_Generation",
  "University/Manoa",
  "BioFuel",
  "Coal",
  "Fossil_Fuel",
  "Solar",
  "Waste2Energy",
  "WindFarm",
]
