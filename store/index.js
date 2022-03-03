export const state = () => ({
  cities: [],
  weather: {},
});
export const getters = {
  CITIES: (state) => {
    return state.cities.filter((item) => item.data.city != null);
  },
  WEATHER: (state) => {
    return state.weather;
  },
};
export const mutations = {
  SET_WEATHER: (state, payload) => {
    state.weather = payload;
  },
  SET_CITIES: (state, payload) => {
    state.cities = payload;
  },
};
export const actions = {
  async getWeather(context, coords) {
    const response = await this.$axios.get(
      `?lat=${coords.lat}&lon=${coords.lon}&appid=a3ccb71704c27bed7c6916c6a587b6fb&units=metric`
    );
    context.commit("SET_WEATHER", response.data);
  },
  async getCities(context, q) {
    var token = "a2d5555b2f1d378ad3c81329e9456ee099105f43";
    var options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      }
    };
    var body = {
      query: q,
      language: "en",
      locations: [
        {
          country: "*",
        },
      ],
    };
    const response = await this.$axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      body,
      options
    );
    context.commit("SET_CITIES", response.data.suggestions);
  },
};
