import { months } from "./constants";

const TripsPicker = ({
  trips = [],
  selectedTripIndex,
  updateSelectedTripIndex,
}) => {
  if (!trips.length) return null;

  return (
    <div className="vehicle-container">
      <div className="trip-header">Example Trip: Miles Traveled Each Month</div>
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
    <div className="card">
      <div className="vehicle-title">
        {trip.make} {trip.model}, {trip.year}
      </div>
      <div className="vehicle-item">
        {months.map((month) => (
          <Month key={month} name={month} value={trip[month]} />
        ))}
      </div>
    </div>
  );
};

const Month = ({ name, value }) => (
  <div className="month-container">
    <div className="month">{name[0].toUpperCase() + name.substring(1)}</div>
    <div className="miles">{value}</div>
  </div>
);

export default TripsPicker;
