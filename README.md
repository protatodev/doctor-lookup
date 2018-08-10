# Doctor Lookup

#### Epicodus Javascript Week 2 Project, 8.10.2018

#### By Protatodev (Thad Donaghue)

## Description

This website is designed to help users locate medical proffesionals in the greater Portland-metro area. The user is able to search for a doctor by inputting either an illness or a doctor's name. The resulting doctor's are then displayed back to the user for them to research.

## Specs

| Behavior | Input | Output | Why |
|----------|-------|--------|-----|
| Accept a doctor's name | John Smith | *results are shown* | Accept a name from a form input and display all doctor's with that name. Simple to implement |
| Accept a medical condition | sore throat | *results are shown* | Accept a medical condition from a form input and display all doctor's with that provide services for this condition. Simple to implement |
| Make a call to the BetterDoctor API to retrieve search results | *search criteria* | *results captured in JSON* | Implement asonchronous functionality using an API call and wrapping it in a promise. Moderately difficult to implement |
| Grab properties from the JSON returned and display in results | *search criteria* | *results captured in JSON* | Navigate the returned JSON from the API and populate website. Moderately difficult to implement |

## Setup on OSX / Windows

* Download and install the latest version of `node.js` (see link section below)
* Clone the repository
* In a command line, navigate to the folder and run `npm install`
* From the command line, run `npm run start`

## Testing Program Functionality (Command Line)

* No testing has been implemented

## Contribution Requirements

1. Clone the repo
1. Make a new branch
1. Commit and push your changes
1. Create a PR

## Technologies Used

* Javascript (ES6)
* API Data
* jQuery 3.3.1
* Webpack 4
* Node.js 
* npm 
* Bootstrap 4.1.3
* Babel

## Links

* https://github.com/protatodev/doctor-lookup
* https://nodejs.org/en/

## License

This software is licensed under the MIT license.

Copyright (c) 2018 **Protatodev**