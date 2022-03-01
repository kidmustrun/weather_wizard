export const state = {};
export const mutations = {};
export const actions = {
  async getWeather({ context }, coords) {
    const response = await this.$axios.get(
      `?lat=${coords.lat}&lon=${coords.lon}&appid=a3ccb71704c27bed7c6916c6a587b6fb&units=metric`
    );
    return response.data;
  },
};
