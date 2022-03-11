import { months } from "./constants";

const TripsSelector = ({
  trips = [],
  selectedTripIndex,
  updateSelectedTripIndex,
}) => {
  if (!trips.length)
    return (
      <div className="vehicle-container flex-column">
        <div className="trip-header blue-text">
          Example Trip: Miles Traveled Each Month
        </div>
        <div className="error-text">Error fetching Example Trip data</div>
      </div>
    );

  return (
    <div className="vehicle-container flex-column">
      <div className="trip-header blue-text">
        Example Trip: Miles Traveled Each Month
      </div>
      <div className="trip-input">
        <label className="trip-label" htmlFor="trips">
          Select an example trip:
        </label>
        <select
          name="trips"
          onChange={(e) => updateSelectedTripIndex(parseInt(e.target.value))}
        >
          {trips.map((trip, index) => (
            <option key={index} value={index}>
              #{index + 1} {trip.make} {trip.model}, {trip.year}
            </option>
          ))}
        </select>
      </div>
      <SelectedTrip trip={trips[selectedTripIndex]} />
    </div>
  );
};

const SelectedTrip = ({ trip }) => {
  return (
    <div className="card selected-trip-container flex-column">
      <div className="vehicle-title">
        {trip.make} {trip.model}, {trip.year}
      </div>
      <div className="vehicle-item flex-row">
        {months.map((month) => (
          <Month key={month} name={month} value={trip[month]} />
        ))}
      </div>
    </div>
  );
};

const Month = ({ name, value }) => (
  <div className="month-container flex-column">
    <div className="month">{name[0].toUpperCase() + name.substring(1)}</div>
    <div className="miles">{value}</div>
  </div>
);

export default TripsSelector;
