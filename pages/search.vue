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
            item-text="Description"
            item-value="City"
            label="Cities"
            placeholder="Start typing to Search"
            prepend-icon="mdi-map-marker"
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="model" class="purple lighten-3">
            <v-list-item v-for="(entry, i) in entries" :key="i">
              <v-list-item-content>
                
                <v-list-item-title
                  @click="value = entry.value"
                  v-text="entry.value"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-3" @click="model = null">
            Clear
            <v-icon right> mdi-close-circle </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "InspirePage",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.value.length > this.descriptionLimit
            ? entry.value.slice(0, this.descriptionLimit) + "..."
            : entry.value;

        return Object.assign({}, entry, { Description });
      });
    },
    item(){
      return this.items.find(item => item.value === this.model)
    }
  },
  watch: {
    search(val) {
      if (this.isLoading) return;

      this.isLoading = true;

      var url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      var token = "a2d5555b2f1d378ad3c81329e9456ee099105f43";

      var options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({
          query: val,
          language: "en",
          locations: [
            {
              country: "*",
            },
          ],
        }),
      };

      fetch(url, options)
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then((result) => {
          this.entries = result.suggestions;
          this.entries = this.entries.filter(item => item.data.city != null)
          this.isLoading = false;
          console.log(this.entries)
        })
        .catch((error) => console.log("error", error))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
