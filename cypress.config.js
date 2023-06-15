const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    projectId: 'qavhbw',
    numTestsKeptInMemory: 150,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://computer-database.gatling.io/computers',
  },
});
