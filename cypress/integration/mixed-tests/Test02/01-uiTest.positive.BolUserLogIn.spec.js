import MainPage from "../../page-objects/main.page";
import LoginPage from "../../page-objects/login.page";
import AccountPage from "../../page-objects/account.page";

describe('Bol.com test 02', () => {
    it('Positive: User logs into account', () => {
        cy.fixture('bol.com').then(bolData => {
                MainPage.visit();
                cy.log('WHEN user clicks on profile');
                LoginPage.visit();
                cy.log('THEN Login page was opened');
                LoginPage.emailField.should('exist')
                cy.log('WHEN user does login');
                LoginPage.userDoesLogin(bolData.email, bolData.password);
                cy.log('THEN user logged in successfully');
                AccountPage.validateLogin(bolData.email);
            })          
    })
})