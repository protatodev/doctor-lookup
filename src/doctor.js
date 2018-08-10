export class Doctor {

  constructor() {

  }

  findDoctor(name, medicalIssue) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url;
      (name !== "") ? url = `https://api.betterdoctor.com/2018-03-01/doctors?location=45.5122,-122.6587,7&name="${name}"&skip=0&limit=10&user_key=${process.env.exports.apiKey}`
                    : url = `https://api.betterdoctor.com/2018-03-01/doctors?location=45.5122,-122.6587,7&query="${medicalIssue}"&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;

      request.onload = function() {
        if(request.status === 200) {
          let results = JSON.parse(request.response);
          resolve(results);
        } else {
          reject(request.statusText);
        }
      }

      request.open("GET", url, true);
      request.send();
    });
  }

}