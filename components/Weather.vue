<template>
  <div v-if="weather.weather">
      <h2>{{weather.name}}</h2>
    <img :src="iconWeather" />
    <p>{{ weather.weather[0].description }}</p>
    <p>Temperature: {{ weather.main.temp }} &#8451;</p>
    <p>Feels like: {{ weather.main.feels_like }} &#8451;</p>
    <p>Wind speed: {{weather.wind.speed}} meter/sec</p>
    <p v-if="weather.main.grnd_level">Atmospheric pressure on the ground level: {{weather.main.grnd_level}}</p>
  </div>
</template>
<script>
export default {
  name: "Weather",
  props: ["item"],
  data: () => {
    return {
      weather: {},
      iconWeather: null
    };
  },
  created() {
    console.log(this.item.data.geo_lat);
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.item.data.geo_lat}&lon=${this.item.data.geo_lon}&appid=a3ccb71704c27bed7c6916c6a587b6fb&units=metric`;

    var options = {
      headers: {},
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        this.weather = result;
        console.log(this.weather);
        this.iconWeather = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`
        
      })
      .catch((error) => console.log("error", error));
  }
};
</script>
