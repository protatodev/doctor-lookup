import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Doctor} from './doctor.js';

function displayResults(issue, name) {
  let doctor = new Doctor();
  let promise = doctor.findDoctor(issue, name);

  promise.then(results => {
    for(let i = 0; i < results.length; i++) {
      $(".card-group").append(
        `<div class="card">
          <img class="card-img-top" data-src=${results[i].data[0].profile.image_url} alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">${results[i].data[0].profile.first_name} " " ${results[i].data[0].profile.last_name}</h4>
            <h6 class="card-subtitle text-muted">${results[i].data[0].practices[0].visit_address.city}, ${results[i].data[0].practices[0].visit_address.state}</h6>
            <h6 class="card-subtitle text-muted">${results[i].data[0].practices[0].visit_address.street}</h6>
            <p class="card-text">${results[i].data[0].profile.title}</p>
            <ul id="specialties${i}">
            </ul>
          </div>
        </div>`);
        
        for(let j = 0; j < results[i].data[0].specialties.length; j++) {
          $("#specialties" + i).append(
            `<li>${results[i].data[0].specialties.name}</li>`
          );
        }
    }
  }).catch(error => {
    $(".resultsDiv").text("Search returned 0 results!");
  });
}

$(document).ready(function() {

  $(".medicalLookupForm").submit((event) => {
    event.preventDefault();

    let medicalIssue = $("#medicalSearchInput").val();
    displayResults(medicalIssue, "");
    
  });

});