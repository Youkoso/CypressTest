# Description

This is an example of testing project written under Cypress framework.
It does contain few frontend and backend tests:
1. UI tests for Bol.com written using page-object pattern.
2. REST api tests for user entity from https://petstore.swagger.io/v2/user web-resource. Test data was generated randomly via Chance library.

## Dependencies:

During development were used: 

Node.js v12.18.4 (should be installed separately)
```
"cypress": "^5.3.0"
"cypress-wait-until": "^1.7.1"
"cypress-failed-log": "^2.7.0",
"lodash": "^4.17.20",
"chance": "^1.1.7",
"@types/chance": "^1.1.0"
```

## Local run

1. Clone project.
```
git clone https://github.com/Youkoso/CypressTest.git
```
2. Execute from project root to install components from dependencies.
```
npm install
```

#### Run tests via terminal
1. To start all of the tests execute.
```
npx run cypress
```
or
```
npm run cypress:run
```
2. To start tests in chrome.
```
npx cypress run -b chrome
```
3. To start tests within particular test suite specify related config file
Example:
```
npx cypress run  --config-file cypress-run-Test01.json
```

#### Run tests via cypress Test Runner
1. Execute command to open Test Runner.
```
npm run cypress:open
```
2. In Test Runner you will see a list of test files. Click on the test file to execute tests within file.

#### Reporting
1. Report logs from failed test cases (if they would fail) are available in cypress/logs folder.
2. Videos from test runs are available in cypress/videos folder.
