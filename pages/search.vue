<template>
  <v-row>
    <v-col class="text-center">
      <v-card color="purple" dark>
        <v-card-title class="text-h5">
          Enter the name of the city
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="city"
            item-value="City"
            label="Cities"
            placeholder="Start typing to Search"
            prepend-icon="mdi-map-marker"
            :disabled="!!model"
          ></v-autocomplete>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-3" @click="model = null">
              Clear
              <v-icon right> mdi-close-circle </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="model" class="purple lighten-3">
            <Weather
              :item="this.items.find((item) => item.value === this.model)"
            />
          </v-list>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SearchPage",
  props: ["item"],
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    items() {
      return this.entries.map((entry) => {
        const city = entry.value;
        return Object.assign({}, entry, { city });
      });
    },
    entries() {
      return this.$store.getters.CITIES;
    },
  },
  watch: {
    search(val) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store.dispatch("getCities", val);
      this.isLoading = false;
      console.log(
        "item changed " + this.items.find((item) => item.value === this.model)
      );
    },
  },
};
</script>
