// 'use strict';

// class APIRequest {
//     constructor(APIURL) {
//         this.APIURL = APIURL;
//     }   
//     makeRequest = (successMethod, failMethod) => {   
//         const httpRequest = new XMLHttpRequest();     
//         httpRequest.addEventListener('readystatechange', () => {
//             if(httpRequest.readyState === 4){
//                 if (httpRequest.status === 200) {
//                     successMethod(httpRequest.responseText);
//                 }
//                 else {
//                     failMethod(httpRequest.status + ': ' + httpRequest.responseText);
//                 }
//             }
//         });
//         httpRequest.open('GET', this.APIURL);
//         httpRequest.send();        
//     }
// }

// class GeocoderAPIRequest extends APIRequest{
//     geocoderBaseURL = 'https://geocoder.ca/?locate=';
//     geocoderURLPostfix = '&geoit=xml&json=1';
//     constructor(streetNum, streetName, city, province){
//         super();
//         this.APIURL = this.geocoderBaseURL + streetNum + '%20' + streetName.replace(' ', '%20') + ',%20' + city + ',%20' + province + this.geocoderURLPostfix;        
//     }
// }

// class OpenCovidAPIRequest extends APIRequest {
//     constructor(prov){
//         super();
//         this.localDate = new Date();
//         this.APIURL = 'https://api.opencovid.ca/timeseries?stat=cases&loc=' + prov + '&date=' + `${this.localDate.getDate() - 1}` + '-' + `${this.localDate.getMonth() + 1}` + '-' + this.localDate.getFullYear();
//     }
// }

// window.onload = () => {

//     // ZIP API

//     const streetNumberField = document.querySelector('#streetNo');
//     const streetNameField = document.querySelector('#streetName');
//     const cityField = document.querySelector('#city');
//     const provinceField = document.querySelector('#province');
//     const zipField = document.querySelector('#zip');
//     const warningElement = document.createElement('p');    
//     document.querySelector('#personalInfo').appendChild(warningElement);

//     const zipUpdateUISuccess = (data) => {
//         const responseObject = JSON.parse(data);
//         console.log(responseObject);
//         if (responseObject.standard.confidence == 1) {
//             warningElement.textContent = '';
//             zipField.value = responseObject.postal;
//         }
//         else {
//             zipField.value = ''; 
//             warningElement.textContent = 'Please enter a valid Canadian address';
//         }
//     }

//     const zipUpdateUIError = (error) => {
//         zipField.value = '';   
//         console.log('Unable to make a request to Geocoder API' + error);
//         warningElement.textContent = 'Unable to make zipcode request to Geocoder API';
//     }    

//     const checkCompletion = () => {
//         if(streetNumberField.value !==  '' && 
//         streetNameField.value !== '' && 
//         cityField.value !== '' && 
//         provinceField.value !== '') {
//             let requestZip = new GeocoderAPIRequest(streetNumberField.value, streetNameField.value, cityField.value, provinceField.value);
//             requestZip.makeRequest(zipUpdateUISuccess, zipUpdateUIError);
//         }
//     }

//     streetNumberField.addEventListener('blur', checkCompletion);
//     streetNameField.addEventListener('blur', checkCompletion);
//     cityField.addEventListener('blur', checkCompletion);
//     provinceField.addEventListener('blur', checkCompletion);

//     // COVID API

//     const covidUpdateSection = document.querySelector('#covidUpdate');

//     const covidUpdateUISuccess = (data) => {
//         const responseObject = JSON.parse(data);
//         console.log(responseObject.cases[0]);
//         covidUpdateSection.children[0].textContent = 'COVID Update ' + responseObject.cases[0].date_report;
//         covidUpdateSection.children[1].textContent = responseObject.cases[0].province;
//         covidUpdateSection.children[2].textContent = 'Cases: ' + responseObject.cases[0].cases + ', ' + 'Cumulative cases: ' + responseObject.cases[0].cumulative_cases;        
//     }

//     const covidUpdateUIFailure = (error) => {
//         console.log('Unable to make a request to OpenCovid API' + error);
//         covidUpdateSection.children[0].textContent = 'COVID Update ';
//         covidUpdateSection.children[1].textContent = '';
//         covidUpdateSection.children[2].textContent = 'Please enter valid province (two character input)';    
//     } 

//     const updateCovidData = () => {
//         if(provinceField.value !== '') {
//             let requestOpenCovid = new OpenCovidAPIRequest(provinceField.value);
//             requestOpenCovid.makeRequest(covidUpdateUISuccess, covidUpdateUIFailure);
//         }
//     }

//     provinceField.addEventListener('blur', updateCovidData);    



// }
