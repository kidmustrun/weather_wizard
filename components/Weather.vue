<template>
  <p v-if="$fetchState.pending">Loading....</p>
  <p v-else-if="$fetchState.error">Error</p>
  <div v-else>
    <h2>{{ item.data.city }}</h2>
    <img :src="iconWeather" />
    <img :src="iconWeather" />
    <img :src="iconWeather" />
    <p>{{ weather.weather[0].description }}</p>
    <p>Temperature: {{ Math.round(weather.main.temp) }} &#8451;</p>
    <p>Feels like: {{ Math.round(weather.main.feels_like) }} &#8451;</p>
    <p>Wind speed: {{ Math.round(weather.wind.speed) }} meter/sec</p>
    <p v-if="weather.main.grnd_level">
      Atmospheric pressure on the ground level:
      {{ Math.round(weather.main.grnd_level * 0.750064) }} mm
    </p>
    <p v-if="weather.snow">
      Snow volume for the last 1 hour: {{ weather.snow["1h"] }} mm
    </p>
  </div>
</template>
<script>
export default {
  name: "Weather",
  props: ["item"],
  computed: {
    weather() {
      return this.$store.getters.WEATHER;
    },
    iconWeather() {
      return `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
    },
  },
  async fetch() {
    this.$store.dispatch("getWeather", {
      lat: this.item.data.geo_lat,
      lon: this.item.data.geo_lon,
    });
  },
};
</script>
