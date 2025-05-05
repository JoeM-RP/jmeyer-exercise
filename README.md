# Expo Auth Sample
A simple example of Expo functionality

## Getting Started

To run this project, make sure your local dev environment is prepared according to the [Expo Getting Started Guide](https://docs.expo.dev/get-started/set-up-your-environment/).

- `nvm use` (Or ensure you are using node v20.18.1)
- `yarn && yarn start` (or similar)
- Press `i` (for iOS) or `a` (for Android) to install/launch Expo Go on the simulator or connected device of your choosing


## Assumptions
- Appointment status (booked vs avilable) would be committed to central backend using a RESTful API. I've used mock data to represent a simple data model and use some "tickery" on the front end to mimic backend behaviors.
- Appointments do not contain PII and cane be stored "in the clear". PII would need to be stored using SecureStorage 
- English is the fallback language 
- Screen reader only supports English
