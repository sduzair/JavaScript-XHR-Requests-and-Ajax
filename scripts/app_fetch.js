"use strict";

const handleResponseError = (response) => {
  if (!response.ok) {
    //response.ok is true even when url in wrong format i.e. response body not as expected
    throw response.status + ": " + response.statusText;
  }
  return response.json();
};

// using fetch instead of XHR request
const createRequest = function (url, succeed, fail) {
  fetch(url)
    .then((response) => handleResponseError(response)) //response object properties say if server sends HTTP error status
    .then((data) => succeed(data))
    .catch((error) => fail(error)); //catches error in success function when response body is not as expected
};

window.onload = () => {
  // ZIP API......................................................................

  const streetNumberField = document.querySelector("#streetNo");
  const streetNameField = document.querySelector("#streetName");
  const cityField = document.querySelector("#city");
  const provinceField = document.querySelector("#province");
  const zipField = document.querySelector("#zip");
  const warningElement = document.createElement("p");
  document.querySelector("#personalInfo").appendChild(warningElement);

  const zipUpdateUISuccess = (data) => {
    // const data = JSON.parse(data);
    console.log(data);
    if (data.standard.confidence == 1) {
      warningElement.textContent = "";
      zipField.value = data.postal;
    } else {
      zipField.value = "";
      warningElement.textContent = "Please enter a valid Canadian address";
    }
  };

  const zipUpdateUIError = (error) => {
    zipField.value = "";
    console.log("Unable to make a request to Geocoder API " + error);
    warningElement.textContent =
      "Unable to make zipcode request to Geocoder API";
  };

  const checkCompletion = () => {
    // if(streetNumberField.value !==  '' &&
    // streetNameField.value !== '' &&
    // cityField.value !== '' &&
    // provinceField.value !== '') {
    //     let url = 'https://geocoder.ca/?locate=636%20Montpellier%20Dr,%20Waterloo,%20ON&geoit=xml&json=1';
    //     createRequest(url, zipUpdateUISuccess, zipUpdateUIError);
    // }
    let url =
      "https://geocoder.ca/?locate=636%20Montpellier%20Dr,%20Waterloo,%20ON&geoit=xml&json=1"; //FOR TESTING
    createRequest(url, zipUpdateUISuccess, zipUpdateUIError);
  };

  streetNumberField.addEventListener("blur", checkCompletion);
  streetNameField.addEventListener("blur", checkCompletion);
  cityField.addEventListener("blur", checkCompletion);
  provinceField.addEventListener("blur", checkCompletion);

  // COVID API......................................................................

  const covidUpdateSection = document.querySelector("#covidUpdate");

  const covidUpdateUISuccess = (data) => {
    console.log(data.cases[0]);
    covidUpdateSection.children[0].textContent =
      "COVID Update " + data.cases[0].date_report;
    covidUpdateSection.children[1].textContent =
      "Province: " + data.cases[0].province;
    covidUpdateSection.children[2].textContent =
      "Cases: " +
      data.cases[0].cases +
      ", " +
      "Cumulative cases: " +
      data.cases[0].cumulative_cases;
  };

  const covidUpdateUIFailure = (error) => {
    console.log("Unable to make a request to OpenCovid API " + error);
    covidUpdateSection.children[0].textContent = "COVID Update ";
    covidUpdateSection.children[1].textContent = "";
    covidUpdateSection.children[2].textContent =
      "Please enter valid province (two character input)";
  };

  const updateCovidData = () => {
    if (provinceField.value !== "") {
      let localDate = new Date();
      let APIURL =
        "https://api.opencovid.ca/timeseries?stat=cases&loc=" +
        provinceField.value +
        "&date=" +
        `${localDate.getDate() - 1}` +
        "-" +
        `${localDate.getMonth() + 1}` +
        "-" +
        localDate.getFullYear();
      createRequest(APIURL, covidUpdateUISuccess, covidUpdateUIFailure);
    }
  };

  provinceField.addEventListener("blur", updateCovidData);


  // // WEATHER API...................................................................................

  // const weaterUpdateSection = document.querySelector('#weatherUpdate');

  // const successWeatherUpdateAPI = (data) => {
  //   console.log(data);
  //   // weaterUpdateSection.children[0].textContent =
  //   //   "COVID Update " + data.cases[0].date_report;
  //   //   weaterUpdateSection.children[1].textContent =
  //   //   "Province: " + data.cases[0].province;
  //   //   weaterUpdateSection.children[2].textContent =
  //   //   "Cases: " +
  //   //   data.cases[0].cases +
  //   //   ", " +
  //   //   "Cumulative cases: " +
  //   //   data.cases[0].cumulative_cases;
  // }

  // const failedWeatherUpdateAPI = (data) => {
  //   console.log("Unable to make a request to Weather API " + error);
  //   covidUpdateSection.children[0].textContent = "Weather Update ";
  //   covidUpdateSection.children[1].textContent = "";
  //   covidUpdateSection.children[2].textContent = "Please enter valid province (two character input)";    
  // }

  // const updateWeatherData = () => {
  //   if (provinceField.value !== "") {
  //     let url = 'https://api.openweathermap.org/data/2.5/weather?q=Waterloo,ON,CA&appid=&units=metric';
  //     createRequest(url, successWeatherUpdateAPI, failedWeatherUpdateAPI);
  //   }
  // }

  // provinceField.addEventListener("blur", updateWeatherData);
  
};
