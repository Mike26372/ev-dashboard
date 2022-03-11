# Electric Vehicle Cost Comparison Dashboard

This dashboard provides example trip data to help users estimate their potential dollar savings and emission reduction compared to a benchmark gasoline vehicle (Audi Q5, 2019).

To simulate your estimated travel, select an example trip using the dropdown provided to select an estimated monthly distance traveled. These distances will be used to calculate your estimated savings.

Next, using the filters provided, select your desired car's make, model and year to see your estimated cost savings per year compared to the benchmark gasoline vehicle and well as the % decrease in CO2 emissions due to driving an electric vehicle.

## Dashboard setup

There are a few steps required to get the EV Dashboard up and running

### UI Setup

In your terminal and within the project directory, run `npm start`. Once the build is complete the UI will be available at [http://localhost:3000](http://localhost:3000), which can be accessed from your browser.

### API Setup

In another terminal window from the same directory, run `npm run start-server`. This will launch a mock server at `http://localhost:3001` to provide input data for trips and vehicle selection.
