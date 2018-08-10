import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Doctor} from './doctor.js';

function scrollToView() {
  const resultsDiv = document.getElementById("resultsJumbo");
  resultsDiv.scrollIntoView();
}

function stickyFunction() {
  const navbar = document.getElementById("navbar");
  let sticky = navbar.offsetTop;

  if(window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function resetPage() {
  location.reload();
}

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
            <p class="card-text"><strong>About ${results.data[i].profile.first_name}:</strong></p>
            <p class="card-text">${results.data[i].profile.bio}</p>
            <p class="card-text"><strong>Specialties:</strong></p>
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
    scrollToView();
  }).catch(error => {
    $(".resultsDiv").text("Search returned 0 results!");
  });
}

$(document).ready(function() {

  window.onscroll = function() {
    stickyFunction();
  };

  $("#medicalLookupForm").submit((event) => {
    event.preventDefault();

    let medicalIssue = $("#medicalSearchInput").val();
    displayResults("", medicalIssue);
    scrollToView();
  });

  $("#doctorLookupForm").submit((event) => {
    event.preventDefault();

    let doctor = $("#doctorSearchInput").val();
    displayResults(doctor, "");
    scrollToView();
  });

  $("#navSearch").submit((event) => {
    event.preventDefault();

    let doctor = $("#navInput").val();
    displayResults(doctor, "");
    scrollToView();
  });

  $("#reset").click(function() {
    resetPage();
  });

});