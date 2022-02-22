<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to Weather Wizard &#10024;
        </v-card-title>
        <v-card-text>
          <p>This application will help you determine the current weather anywhere in the world. </p>
          <p>
            By default, the current installed city is Moscow. Enjoy it!
          </p>
          <p>
            If you have any questions, write to me in <a
              href="https://t.me/kidmustrun"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >Telegram
            </a>.
          </p>
          <p>Thank you!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/search"
          >
            Let's start          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
