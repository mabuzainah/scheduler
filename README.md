# Interview Scheduler

A React based project that can be utilized to book, edit or delete existing appointments with interviewers.  Users will be able to interact with the various days available and view the timeslots present to book an interview. 

Developed using an M1 Mac


## Features of the project

- Displaying the appointments throughout the various work week days.
- Each day of the week displays a number of available slots to be booked. Default is 5 appointment slots per day on an day with no appointments.
- Ability to Book, Edit, and Delete appointments for any given day.
- A user can book an interview and inputs the student name and selects an interviewer.
- When Deleting appointment a confirmation message/ warning message shows up to ask users to confirm deletion of appointment (as it's a destructive action).
- Adding an appointment will decrease the available appointments count for the day by 1, vice versa for Removing/Deleting an appointment. 
- Ability to run concurrent sessions of the application at the same time.

# Deployed application

https://schedulerapp-mabuzainah.netlify.app

## Setup

Install dependencies with `npm install`. 

Considerations: 
- Application was built using an M1 Mac, so had to resort to using Node 15.14.0 along with utilizing Electron browser for Cypress testing.
- If running the react project, please ensure that you're running both the Webpack Development Server and also running the Scheduler-Api from following GitHub URL (https://github.com/lighthouse-labs/scheduler-api). Be sure to follow the steps on the scheduler-api page for setting up the server.


## DEMO of running Project with WebSocket - if issues viewing please access through docs folder in Repository

![WebSocket Demo](https://github.com/mabuzainah/scheduler/blob/master/docs/WebSocket%20Demo.mov)

## Screenshots of the Project

Demo'ing deletion of a booked appointment:
![Deleting An Appointment](https://github.com/mabuzainah/scheduler/blob/master/docs/Deleting%20an%20Appointment.mov)

Error handling when student name is blank:
![Verifying Student Name](https://github.com/mabuzainah/scheduler/blob/master/docs/Verifying%20Student%20Name.png)

Error thrown when attempting to Save when running scheduler-api in error mode:
![Error Saving](https://github.com/mabuzainah/scheduler/blob/master/docs/Error%20Saving.png)

Error thrown when attempting to Delete when running scheduler-api in error mode:
![Error Deleting](https://github.com/mabuzainah/scheduler/blob/master/docs/Error%20Deleting.png)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress (E2E Testing Tool Used)

```sh
npm run cypress
```

## Dependcies for the project

- Axios
- classnames
- normalize
- react
- react-dom
- react-scripts
- Node v15.14.0. since using M1 Mac
- Babel
- Storybook
- Testing-library
- Node-sass
- Prop-types
- react-test-renderer
