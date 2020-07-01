/* Global Variables */
// Base URL and API Key for OpenWeatherMap API
const apiURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=d6ad1e5d413f9edc76af038fbf5dbe54";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document
  .querySelector("#generate")
  .addEventListener("click", handleGenerateClick);

/**
 * @description Handle click event on generate button
 * @param {Event} $event
 */
function handleGenerateClick($event) {
  $event.preventDefault();
  const zip = document.querySelector("#zip").value;
  const content = document.querySelector("#feelings").value;

  if (zip && content) {
    getWeatherData(apiURL, zip.trim(), apiKey.trim()).then(function (userData) {
      postUserData("/postData", {
        date: newDate,
        temp: userData.main.temp,
        content,
      }).then(function (data) {
        updateUI();
      });
    });
  } else {
    console.log("Please enter zip and feeling !!");
    return;
  }
}

/**
 * @description Get weather data using fetch api
 * @param {string} baseURL
 * @param {string} zip
 * @param {string} apiKey
 */
async function getWeatherData(baseURL, zip, apiKey) {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("Error fetching data ", error);
  }
}

/**
 * @description Get weather data using fetch api
 * @param {string} url
 * @param {Object} data
 */
async function postUserData(url, data) {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const res = await request.json();
    return res;
  } catch (error) {
    console.log("Error posting data ", error);
  }
}

/**
 * @description Update ui using data from server
 */
async function updateUI() {
  const res = await fetch("/getData");
  try {
    document.getElementById("data-holder").classList.remove("invisible");
    const allData = await res.json();
    document.querySelector("#date").innerHTML = allData.date;
    document.querySelector("#temp").innerHTML = allData.temp;
    document.querySelector("#content").innerHTML = allData.content;
  } catch (error) {
    console.log("Error updating UI ", error);
  }
}
