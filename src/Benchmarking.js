const Benchmarking = ({ benchmarkVehicle }) => {
  return (
    <div>
      <BenchmarkVehicle {...benchmarkVehicle} />
      <AveragesOverview />
    </div>
  );
};

const BenchmarkVehicle = ({ make, model, year }) => {
  return (
    <div>
      {make} / {model} / {year}
    </div>
  );
};

const AveragesOverview = () => <div>Averages</div>;

export default Benchmarking;
