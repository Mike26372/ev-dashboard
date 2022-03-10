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

export default TripsPicker;
