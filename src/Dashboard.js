import { Component, useState } from "react";
import Papa from "papaparse";

const TripsPicker = ({ trips = [], exampleVehicle }) => {
  if (!trips.length) return null;

  return (
    <div className="vehicle-container">
      {trips.map((trip, index) => (
        <SelectedTrip key={index} trip={trip} />
      ))}
    </div>
  );
};

const SelectedTrip = ({ trip }) => {
  return (
    <div className="vehicle-item">
      {trip.make}, {trip.model}, {trip.year}
    </div>
  );
};

const TargetFiltering = ({ inputs, selectedTrip, benchmarkVehicle }) => {
  return (
    <div>
      <BenchmarkVehicle benchmarkVehicle={benchmarkVehicle} />
      {inputs.map((input) => (
        <TargetVehicle
          key={
            input.year + input.make + input.model + input.series + input.style
          }
          input={input}
          benchmarkVehicle={benchmarkVehicle}
          trip={selectedTrip}
        />
      ))}
    </div>
  );
};

const TargetVehicle = ({ input, benchmarkVehicle, trip }) => {
  const { make, model, year } = input;
  const savings = calculateSavings(input, benchmarkVehicle, trip) || 0;

  return (
    <div>
      {make} / {model} / {year} : {savings}
    </div>
  );
};

const BenchmarkVehicle = ({ benchmarkVehicle }) => {
  const { make, model, year } = benchmarkVehicle;
  return (
    <div>
      {make} / {model} / {year}
    </div>
  );
};

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      exampleVehicle: {},
      selectedTripIndex: 0,
      benchmarkVehicle: {},
      inputs: [],
      trips: [],
    };
  }

  async componentDidMount() {
    // Fetch inputs.csv
    const inputsResponse = await fetch("http://localhost:3001/inputs");
    const inputsJson = await inputsResponse.json();
    const rawInputsData = Papa.parse(inputsJson.text).data;
    const adjustedInputData = adjustCsvData(rawInputsData);

    const benchmarkVehicle = adjustedInputData[0];
    const inputs = adjustedInputData.slice(1);
    console.log(inputs);

    // Fetch trips.csv
    const tripsResponse = await fetch("http://localhost:3001/trips");
    const tripsJson = await tripsResponse.json();
    const rawTripsData = Papa.parse(tripsJson.text).data;
    const trips = adjustCsvData(rawTripsData);
    console.log(trips);

    this.setState({ inputs, trips, benchmarkVehicle });
  }

  render() {
    const {
      exampleVehicle,
      selectedTripIndex,
      inputs,
      trips,
      benchmarkVehicle,
    } = this.state;
    return (
      <div className="dashboard">
        <TripsPicker trips={trips} exampleVehicle={exampleVehicle} />
        <TargetFiltering
          inputs={inputs}
          selectedTrip={trips[selectedTripIndex]}
          benchmarkVehicle={benchmarkVehicle}
        />
      </div>
    );
  }
}

function adjustCsvData(trips) {
  const headerColumns = trips[0];
  const tripsData = trips.slice(1);

  return tripsData.map((trip) =>
    trip.reduce((acc, data, index) => {
      const rawColumnName = headerColumns[index];

      const columnName =
        remappedHeaders[rawColumnName] || rawColumnName.toLowerCase().trim();
      return { ...acc, [columnName]: data };
    }, {})
  );
}

const remappedHeaders = {
  "MPGe (Note that this is electric mpge for PHEVs)": "mpge",
  "Miles per kWh": "mpkwh",
  "Miles per gallon": "mpg",
  "Total Range": "range",
  "Capacity (kWh)": "capacity_kwh",
};

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const averages = {
  co2_per_kwh: 0.9,
  dollars_per_kwh: 0.14,
  co2_per_gal: 19.59,
  dollars_per_gal: 3.6,
};

function calculateSavings(target, benchmark, trip) {
  const totalMiles = months.reduce(
    (acc, curr) => acc + parseInt(trip[curr]),
    0
  );
  // console.log(totalMiles);

  const benchmarkGallonsConsumed = totalMiles / parseFloat(benchmark.mpg);
  const targetKwhConsumed = totalMiles / parseFloat(target.mpkwh);

  const benchmarkCost = benchmarkGallonsConsumed * averages.dollars_per_gal;
  const targetCost = targetKwhConsumed * averages.dollars_per_kwh;

  return benchmarkCost - targetCost;
}
