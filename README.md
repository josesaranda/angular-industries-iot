# angular-industries-iot

This is a project made for fun with Angular, Angular Material Typescript, Scss, mocked server using json-server

## Requirements

- nodejs v16 installed

## Scripts

- `npm install` Install all needed dependencies
- `npm test` Run all tests
- `npm run test:coverage` Run all tests with coverage
- `npm start` Run project in development mode
- `npm run build` Generates distribution files
- `npm run start:json-server` Run json-server in port 8080
- `npm run start:all` Run project in development mode and json-server in port 8080

#### Scripts notes

To make angular client to call json-server endpoints, please go to `environments/environment.development.ts` and set `baseURL` value to `http://localhost:8080`
**Make sure** you're running both process `npm start` and `npm run start:json-server` or `npm run start:all`

#### Running industries-iot-app using docker

- `docker-compose up`

or

- `docker build -t industries-iot-app .`
- `docker run --name industries-iot-container -p 80:80 industries-iot-app`

## Notes

Create a service which is going to store all the information and it has to:

[x] get all industries  
[x] get just one industry by id  
[x] get all industries that match with the given search  
[x] update a industry  
[x] delete a industry  
[x] create a industry  
[x] create unit tests for this service

[x] get all IoTs  
[x] get just one IoT by id  
[x] get all IoTs that match with the given search  
[x] update a IoT  
[x] delete a IoT  
[x] create a IoT  
[x] create unit tests for this service

Create a component which will be able to:

[x] show a paginated list of industries where will appear two buttons with the text "Edit" and "Delete"  
[x] show an input for searching industries by the given text  
[x] show an empty form when pressing "Add"  
[x] show confirmation dialog when user clicks on "Delete"  
[x] delete Industry when user clicks on "Delete" inside the dialog  
[x] create unit tests for this component  
[x] create integration tests for this component

[x] show a paginated list of IoTs where will appear two buttons with the text "Edit" and "Delete"  
[x] show an input for searching IoTs by the given text and Industry  
[x] show an empty form when pressing "Add"  
[x] show confirmation dialog when user clicks on "Delete"  
[x] delete Industry when user clicks on "Delete" inside the dialog  
[x] create unit tests for this component  
[x] create integration tests for this component

[x] Unique identifier that is increased automatically (required)  
[x] Device name (required)  
[x] Warehouse addition time (required)  
[x] Number of devices (required, min: 1, max: 100)  
[x] Fee of the device (required, min: 0)  
[x] Linked industry (required, select from list of industries created)

Addionataly:

[x] use good practices  
[x] use angular material  
[x] use routes and navigation  
[x] use json-server somehow  
[x] communication between components  
[x] use reactive programming  
[x] use lambdas

Extra:

[x] add pipeline and run build and test process  
[x] dockerize project
