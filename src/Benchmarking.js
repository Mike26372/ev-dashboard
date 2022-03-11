import { TargetSummaryItem } from "./TargetVehicle";
import { averages } from "./constants";

// Benchmarking container component
const Benchmarking = ({ benchmarkVehicle }) => {
  if (!Object.keys(benchmarkVehicle).length) {
    return (
      <div className="container flex-column">
        <div className="trip-header blue-text">Benchmarking Assumptions</div>
        <div className="target-container flex-row">
          <div className="error-text">
            Error fetching benchmarking information
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex-column">
      <div className="trip-header blue-text">Benchmarking Assumptions</div>
      <div className="target-container flex-row">
        <BenchmarkVehicle {...benchmarkVehicle} />
        <AveragesOverview {...averages} />
      </div>
    </div>
  );
};

// Benchmark vehicle card displaying vehicle details
const BenchmarkVehicle = ({ make, model, year, fuel_type, mpg }) => {
  return (
    <div className="target-overview card">
      <div className="target-column target-column-left">
        <div className="target-row">
          <TargetSummaryItem label="Make" data={make} type={1} />
          <TargetSummaryItem label="Model" data={model} type={1} />
          <TargetSummaryItem label="Year" data={year} type={1} />
        </div>
        <div className="target-row"></div>
      </div>
      <div className="target-column target-column-right">
        <div className="target-row">
          <TargetSummaryItem label="Fuel Type" data={fuel_type} type={2} />
          <TargetSummaryItem label="MPG" data={mpg} type={2} />
        </div>
      </div>
    </div>
  );
};

// Averages card displaying national averages used to calculate savings
const AveragesOverview = () => (
  <div className="target-savings card flex-column">
    <div className="target-savings-title">National Averages</div>
    <div className="target-savings-output-container flex-row">
      <div className="target-savings-output">
        <div className="target-savings-amount">
          ${averages.dollars_per_gal.toFixed(2)}
        </div>
        <div className="target-savings-label">per gallon</div>
      </div>
      <div className="target-savings-output">
        <div className="target-savings-amount">
          {averages.co2_per_gal.toFixed(2)}
        </div>
        <div className="target-savings-label">lbs CO2 per gallon</div>
      </div>
    </div>
    <div className="target-savings-output-container flex-row">
      <div className="target-savings-output">
        <div className="target-savings-amount">
          ${averages.dollars_per_kwh.toFixed(2)}
        </div>
        <div className="target-savings-label">per kWh</div>
      </div>
      <div className="target-savings-output">
        <div className="target-savings-amount">
          {averages.co2_per_kwh.toFixed(2)}
        </div>
        <div className="target-savings-label">lbs CO2 per kWh</div>
      </div>
    </div>
  </div>
);

export default Benchmarking;
