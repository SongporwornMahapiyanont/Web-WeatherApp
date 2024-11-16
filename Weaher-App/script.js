const apiKey = "b71100747c422aa6f05d37f658dd2186";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`); 
        // https://api.openweathermap.org/data/2.5/weather?units=metric&q=city&appid=${apiKey}
        if(response.status == 404)
        {
            document.querySelector(".error-name").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".detail").style.display = "none";
            throw new Error("Response is not okay : " + response.statusText);
        }
        else{
            document.querySelector(".error-name").style.display = "none";
            document.querySelector(".weather").style.display = "";
            document.querySelector(".detail").style.display = "";
            const data = await response.json();
            console.log(data);
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = `${data.main.temp} °C`;
            document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
            document.querySelector(".wind").innerHTML = `${data.wind.speed} km/hr`;
            if(data.weather[0].main == "Coulds"){
                weatherIcon.src = "img/weather-icon.jpg"
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "img/clear.jpg";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "img/rain.jpg";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "img/Drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "img/mist.png";
            }
        }
        
        // document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.log("There was a problem : ",error);
    }
}
    
searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
});
