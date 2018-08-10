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

  if(window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function resetPage() {
  location.reload();
}

function clearInputs() {
  $("#medicalLookupForm").trigger("reset");
  $("#doctorLookupForm").trigger("reset");
  $("#navSearch").trigger("reset");
}

function clearResults() {
  $(".col-lg-3").each(() => {
  }).remove();
}

function displayResults(name, issue) {
  let doctor = new Doctor();
  let promise = doctor.findDoctor(name, issue);

  promise.then(results => {
    if(results.data.length === 0) {
      $(".errorDiv").hide().fadeIn(1000);
    } else {
      $(".errorDiv").hide();
      for(let i = 0; i < results.data.length; i++) {
        $(".card-group").append(
          `<div class="col-lg-3">
          <div class="card text-black bg-light">
            <img class="card-img-top" src="${results.data[i].profile.image_url}" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">${results.data[i].profile.first_name} ${results.data[i].profile.last_name}</h4>
              <h6 class="card-subtitle text-muted">${results.data[i].practices[0].visit_address.city}, ${results.data[i].practices[0].visit_address.state}</h6>
              <h6 class="card-subtitle text-muted">${results.data[i].practices[0].visit_address.street}</h6>
              <h6 class="card-subtitle text-muted">${results.data[i].practices[0].phones[0].number}</h6>
              <br>
              <h5 id="available${i}" class="card-subtitle"></h5>
              <br>
              <h5 id="distance${i}" class="card-subtitle"></h5>
              <br>
              <p class="card-text"><strong>About ${results.data[i].profile.first_name}:</strong></p>
              <p class="card-text">${results.data[i].profile.bio}</p>
              <p class="card-text"><strong>Specialties:</strong></p>
              <ul id="specialties${i}">
              </ul>
              <a href="${results.data[i].practices[0].website}" class="btn btn-primary">Visit Website</a>
            </div>
          </div>
          </div>`);

          const distance = (results.data[i].practices[0].distance).toFixed(2);
          $("#distance" + i).text("Distance: " + distance)

          if(results.data[i].practices[0].accepts_new_patients) {
            $("#available" + i).text("Accepting New Patients");
            $("#available" + i).addClass("font-green");
          } else {
            $("#available" + i).text("Not Accepting New Patients")
            $("#available" + i).addClass("font-red");
          }
          
          for(let j = 0; j < results.data[i].specialties.length; j++) {
            $("#specialties" + i).append(
              `<li>${results.data[i].specialties[j].name}</li>`
            );
          }
      }
    }
    $(".resultsDiv").hide().fadeIn(1000);
    scrollToView();
  }).catch(error => {
    $(".errorDiv").text(error);
    $(".errorDiv").hide().fadeIn(1000);
  });
}

$(document).ready(function() {

  window.onscroll = function() {
    stickyFunction();
  };

  $("#medicalLookupForm").submit((event) => {
    event.preventDefault();
    clearResults();

    let medicalIssue = $("#medicalSearchInput").val();
    displayResults("", medicalIssue);
    clearInputs();
  });

  $("#doctorLookupForm").submit((event) => {
    event.preventDefault();
    clearResults();

    let doctor = $("#doctorSearchInput").val();
    displayResults(doctor, "");
    clearInputs();
  });

  $("#navSearch").submit((event) => {
    event.preventDefault();
    clearResults();

    let doctor = $("#navInput").val();
    displayResults(doctor, "");
    clearInputs();
  });

  $("#reset").click(function() {
    resetPage();
  });

});