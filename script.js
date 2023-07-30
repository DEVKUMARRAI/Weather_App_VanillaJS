const Search_Img = document.querySelector("#search_img");
const Search_Box = document.querySelector("#search_box");
const City_Name = document.querySelector(".city");
const City_Temprature = document.querySelector(".temp");
const City_Humidity = document.querySelector(".humidity");
const City_Wind = document.querySelector(".wind");
const City_Temp = document.querySelector(".temp");
const Weather_Display = document.querySelector(".weather");
const Invalid_Message = document.querySelector(".Invalid");

const Api_Key = "80d5db99aa90b0c54b5441b7049000c3";
async function Weather_Details(CityName) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${Api_Key}&units=metric`
  );
  if (response.status == 404) {
    if (Weather_Display.classList.contains("visible")) {
      Weather_Display.classList.remove("visible");
      Weather_Display.classList.add("not_visible");
      Invalid_Message.classList.remove("not_visible");
      Invalid_Message.classList.add("visible");
    } else {
      Weather_Display.classList.add("not_visible");
    }
  } else {
    if (Invalid_Message.classList.contains("visible")) {
      Invalid_Message.classList.remove("visible");
      Invalid_Message.classList.add("not_visible");
    }
  }
  const response_jsonformat = await response.json();
  const temprature = response_jsonformat.main.temp;
  const humidity = response_jsonformat.main.humidity;
  const wind_speed = response_jsonformat.wind.speed;
  return (resp = {
    temp: temprature,
    hum: humidity,
    win: wind_speed,
  });
}
Search_Img.addEventListener("click", async () => {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const city = Search_Box.value;
  const final_city_name = capitalizeFirstLetter(city);
  if (city != "") {
    Weather_Display.classList.remove("not_visible");
    Weather_Display.classList.add("visible");
    City_Name.innerHTML = final_city_name;
    City_Temprature.innerHTML =
      Math.round(await (await Weather_Details(`${city}`)).temp) + "°C";
    City_Wind.innerHTML =
      (await (await Weather_Details(`${city}`)).win) + "km/h";
    City_Humidity.innerHTML =
      (await (await Weather_Details(`${city}`)).hum) + "%";
  }
});
