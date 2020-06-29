/* Global Variables */
const appform = document.querySelector('.app-form');
const icons = document.querySelectorAll('.app-icon');
// Base URL and API Key for OpenWeatherMap API
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d6ad1e5d413f9edc76af038fbf5dbe54';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateData);

/* Function called by event listener */
function generateData($event) {
    $event.preventDefault();
    // get user input values
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeatherData(apiURL, zip, apiKey)
        .then(function (userData) {
            // add data to POST request
            postData('/postData', {
                date: newDate,
                temp: userData.main.temp,
                content
            })
        }).then(function (data) {
            // call updateUI to update browser content
            updateUI();
        })
    // reset form
    appform.reset();
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + zip + apiKey);
    try {
        // userData equals to the result of fetch function
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to POST data */
const postData = async (url, data) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });

    try {
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async () => {
    const req = await fetch('/getData');
    try {
        const allData = await req.json();
        icons.forEach(icon => icon.style.opacity = '1');
        // update new entry values
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.log("error", error);
    }
};