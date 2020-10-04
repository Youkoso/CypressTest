// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import MainPage from "../integration/page-objects/main.page";
import LoginPage from "../integration/page-objects/login.page";
import 'cypress-wait-until';

Cypress.Commands.add('login', (email, password) => {
    MainPage.visit();
    LoginPage.visit();
    LoginPage.userDoesLogin(email, password);
})

Cypress.Commands.add("getDataTestLike", (selector) => {
    return cy.get(`[data-test*=${selector}]`);
})

Cypress.Commands.add("getHrefLike", (selector) => {
    return cy.get(`a[href*=${selector}]`);
})
