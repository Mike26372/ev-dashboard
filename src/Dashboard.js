import { Component, useState } from "react";
import Papa from "papaparse";
import TripsPicker from "./TripsPicker";
import TargetFiltering from "./TargetFiltering";

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

    // Fetch trips.csv
    const tripsResponse = await fetch("http://localhost:3001/trips");
    const tripsJson = await tripsResponse.json();
    const rawTripsData = Papa.parse(tripsJson.text).data;
    const trips = adjustCsvData(rawTripsData);

    this.setState({ inputs, trips, benchmarkVehicle });
  }

  updateSelectedTripIndex = (index) => {
    this.setState({ selectedTripIndex: index });
  };

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
        <TripsPicker
          trips={trips}
          selectedTripIndex={selectedTripIndex}
          updateSelectedTripIndex={this.updateSelectedTripIndex}
        />
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
