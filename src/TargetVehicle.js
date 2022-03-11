import { months, averages } from "./constants";

const TargetVehicle = ({ input, benchmarkVehicle, trip }) => {
  const {
    make,
    model,
    year,
    classification,
    fuel_type,
    mpge,
    capacity_kwh,
    mpkwh,
    range,
    series,
    style,
  } = input;
  const savings = calculateSavings(input, benchmarkVehicle, trip) || 0;

  return (
    <div className="target-container">
      <div className="target-overview card">
        <div className="target-column target-column-left">
          <div className="target-row">
            <TargetSummaryItem label="Make" data={make} type={1} />
            <TargetSummaryItem label="Model" data={model} type={1} />
            <TargetSummaryItem label="Year" data={year} type={1} />
          </div>
          <div className="target-row">
            <TargetSummaryItem label="Series" data={series} type={2} />
            <TargetSummaryItem label="Style" data={style} type={2} />
          </div>
          <div className="target-row">
            <TargetSummaryItem
              label="Classification"
              data={classification}
              type={2}
            />
            <TargetSummaryItem label="Fuel Type" data={fuel_type} type={2} />
          </div>
        </div>
        <div className="target-column target-column-right">
          <div className="target-row">
            <TargetSummaryItem
              label="Capacity (kWh)"
              data={capacity_kwh}
              type={2}
            />
            <TargetSummaryItem label="MPGe" data={mpge} type={2} />
          </div>
          <div className="target-row">
            <TargetSummaryItem label="Miles / kWh" data={mpkwh} type={2} />
            <TargetSummaryItem label="Range (mi)" data={range} type={2} />
          </div>
        </div>
      </div>
      <div className="target-savings card">
        <div className="target-savings-title">Estimated Savings</div>
        <div className="target-savings-output-container">
          <div className="target-savings-output">
            <div className="target-savings-amount">${Math.round(savings)}</div>
            <div className="target-savings-label">per year</div>
          </div>
          <div className="target-savings-output">
            <div className="target-savings-amount">{20.02}</div>
            <div className="target-savings-label">lbs CO2 per year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TargetSummaryItem = ({ label, data, type }) => {
  const containerClassName = `target-summary target-summary-${type}`;
  return (
    <div className={containerClassName}>
      <div className="target-label">{label}</div>
      <div className="target-data">{data}</div>
    </div>
  );
};

// Calculates savings per year based on national averages
function calculateSavings(target, benchmark, trip) {
  const totalMiles = months.reduce(
    (acc, curr) => acc + parseInt(trip[curr]),
    0
  );

  const benchmarkGallonsConsumed = totalMiles / parseFloat(benchmark.mpg);
  const targetKwhConsumed = totalMiles / parseFloat(target.mpkwh);

  const benchmarkCost = benchmarkGallonsConsumed * averages.dollars_per_gal;
  const targetCost = targetKwhConsumed * averages.dollars_per_kwh;

  return benchmarkCost - targetCost;
}

export default TargetVehicle;