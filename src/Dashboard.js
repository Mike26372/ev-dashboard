import { Component } from "react";
import Papa from "papaparse";
import TripsSelector from "./TripsSelector";
import TargetFiltering from "./TargetFiltering";
import LoadingSpinner from "./LoadingSpinner";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      selectedTripIndex: 0,
      benchmarkVehicle: {},
      inputs: [],
      trips: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    // Simulate a 1 second load time
    await setTimeoutAsync(1000);

    try {
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

      this.setState({ inputs, trips, benchmarkVehicle, isLoading: false });
    } catch (e) {
      // If error is caught, log the error and remove loading spinner.
      //Error messages will be displayd where data is not available
      console.error(e);
      this.setState({ isLoading: false });
    }
  }

  updateSelectedTripIndex = (index) => {
    this.setState({ selectedTripIndex: index });
  };

  render() {
    const { selectedTripIndex, inputs, trips, benchmarkVehicle, isLoading } =
      this.state;

    if (isLoading) {
      return (
        <div className="dashboard flex-column">
          <LoadingSpinner />
        </div>
      );
    }
    return (
      <div className="dashboard flex-column">
        <TripsSelector
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
  "Fuel Type": "fuel_type",
  "MPGe (Note that this is electric mpge for PHEVs)": "mpge",
  "Miles per kWh": "mpkwh",
  "Miles per gallon": "mpg",
  "Total Range": "range",
  "Capacity (kWh)": "capacity_kwh",
};

const setTimeoutAsync = (timeoutInMs) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, timeoutInMs);
  });
};
