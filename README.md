# Cypress automated tests

## App to be tested - https://computer-database.gatling.io/computers

## App to be tested -https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

## App to be tested -https://petstore.swagger.io/v2/store/order

## Libraries

- [Cypress](https://www.cypress.io/)

## Requirements

- Visual studio code (https://code.visualstudio.com)
- Git (https://git-scm.com/downloads)

- Node.js 12 or 14 and above
- npm / nodejs (https://nodejs.org/en/)

## Why use Cypress

- No other dependencies required to run tests as Cypress contains everything you need.
- Setup is minimal
- Cypress supports BDD and TDD style assertion syntax so this would already be familiar to engineers who have used other JavaScript testing libraries.
- Cypress Test Runner useful in debugging your tests. You can also directly inspect from Chrome dev tools.

## Install Cypress globally

> npm install cypress
> [Check documentatino](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

## Install Cypress locally as a dev dependency for your project

> npm install cypress --save-dev

## Open Cypress playground, test runner

> npx cypress open

## cypress basic info

> npx cypress info

## run all tests

> npx cypress run

## run single spec file (video/screenshots)

> npx cypress run --spec $path --browser chrome

## How to run

Clone the repo and Install the project dependencies
`npm init`

Install Cypress locally as a dev dependency for your project
`npm install cypress --save-dev`

Install XPath with npm
`npm install -D cypress-xpath`

To run the tests against the Cypress Test Runner, run
`npm run cypress open`

Once the test runner has loaded, click on the spec file you wish to test.
