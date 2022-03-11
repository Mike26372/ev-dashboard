import React, { useState } from "react";
import Benchmarking from "./Benchmarking";
import TargetVehicle from "./TargetVehicle";

const TargetFiltering = ({ inputs = [], selectedTrip, benchmarkVehicle }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const filters = { make, model, year };
  const filteredInputs = filterInputs(inputs, filters);

  // When updating the "make", clear selections for model and year
  const updateMake = (value) => {
    setMake(value);
    setModel("");
    setYear("");
  };

  // When updating "model", clear selections for year
  const updateModel = (value) => {
    setModel(value);
    setYear("");
  };

  // Clear all selections when hitting the "clear" button
  const clearSelection = () => {
    setMake("");
    setModel("");
    setYear("");
  };

  return (
    <div className="container flex-column">
      <Benchmarking benchmarkVehicle={benchmarkVehicle} />
      <div className="trip-header blue-text">Cost Comparison</div>
      <div className="target-text">
        Use the provided filters to select your desired vehicle and calculate
        your estimated savings
      </div>
      <div className="target-filters">
        <SelectForField
          field="make"
          value={make}
          inputs={inputs}
          setField={updateMake}
        />
        <SelectForField
          field="model"
          value={model}
          inputs={inputs.filter((input) => input.make === make)}
          setField={updateModel}
          disabled={!make}
        />
        <SelectForField
          field="year"
          value={year}
          inputs={inputs.filter(
            (input) => input.make === make && input.model === model
          )}
          setField={setYear}
          disabled={!make || !model}
        />
        <button onClick={clearSelection}>Clear</button>
      </div>
      {filteredInputs.length ? (
        filteredInputs.map((input) => (
          <TargetVehicle
            key={
              input.year + input.make + input.model + input.series + input.style
            }
            input={input}
            benchmarkVehicle={benchmarkVehicle}
            trip={selectedTrip}
          />
        ))
      ) : (
        <div className="error-text">Error fetching comparison vehicles</div>
      )}
    </div>
  );
};

const SelectForField = ({ inputs, field, setField, value, disabled }) => {
  return (
    <select onChange={(e) => setField(e.target.value)} disabled={disabled}>
      {!value && <option selected={true}>select a {field}</option>}
      {getAllPossibleOptions(inputs, field).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

// Pulls all possible options for filtering based on fieldName parameter and returns them in an array
function getAllPossibleOptions(data, fieldName) {
  console.log(data);
  let options = data.reduce((acc, curr) => {
    return { ...acc, [curr[fieldName]]: 1 };
  }, {});

  return Object.keys(options);
}

// Filters out all inputs that have not been selected by filters for make, model and year
function filterInputs(inputs, filters) {
  let filteredInputs = inputs;
  if (filters.make) {
    filteredInputs = filteredInputs.filter(
      (input) => input.make === filters.make
    );
  }

  if (filters.model) {
    filteredInputs = filteredInputs.filter(
      (input) => input.model === filters.model
    );
  }

  if (filters.year) {
    filteredInputs = filteredInputs.filter(
      (input) => input.year === filters.year
    );
  }

  return filteredInputs;
}

export default TargetFiltering;
