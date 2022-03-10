import Benchmarking from "./Benchmarking";

import { months, averages } from "./constants";

const TargetFiltering = ({ inputs, selectedTrip, benchmarkVehicle }) => {
  return (
    <div>
      <Benchmarking benchmarkVehicle={benchmarkVehicle} />
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

export default TargetFiltering;
