import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Doctor} from './doctor.js';

function displayResults(name, issue) {
  let doctor = new Doctor();
  let promise = doctor.findDoctor(name, issue);

  promise.then(results => {
    console.log(results.data[0]);
    for(let i = 0; i < results.data.length; i++) {
      $(".card-group").append(
        `<div class="col-lg-3">
        <div class="card">
          <img class="card-img-top" src="${results.data[i].profile.image_url}" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">${results.data[i].profile.first_name} ${results.data[i].profile.last_name}</h4>
            <h6 class="card-subtitle text-muted">${results.data[i].practices[0].visit_address.city}, ${results.data[i].practices[0].visit_address.state}</h6>
            <h6 class="card-subtitle text-muted">${results.data[i].practices[0].visit_address.street}</h6>
            <p class="card-text">${results.data[i].profile.bio}</p>
            <ul id="specialties${i}">
            </ul>
          </div>
        </div>
        </div>`);
        
        for(let j = 0; j < results.data[i].specialties.length; j++) {
          $("#specialties" + i).append(
            `<li>${results.data[i].specialties[j].name}</li>`
          );
        }
    }
  }).catch(error => {
    $(".resultsDiv").text("Search returned 0 results!");
  });
}

$(document).ready(function() {

  $("#medicalLookupForm").submit((event) => {
    event.preventDefault();

    let medicalIssue = $("#medicalSearchInput").val();
    displayResults("", medicalIssue);
    
  });

  $("#doctorLookupForm").submit((event) => {
    event.preventDefault();

    let doctor = $("#doctorSearchInput").val();
    displayResults(doctor, "");
    
  });

});