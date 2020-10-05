import Page from "./page";

class LoginPage extends Page {

    visit() {
        this.profileElem.click();
    }

    get emailField() {
        return cy.getDataTestLike('login-form-email')
                 .clear();
    }

    get passwordField() {
        return cy.getDataTestLike('login-form-password')
                 .clear();
    }

    get loginButton() {
        return cy.getDataTestLike('login-form-submit');
    }

    userDoesLogin(email, password) {
        this.emailField.type(email)
                       .should('have.value', email);
        this.passwordField.type(password)
                          .should('have.value', password);
        this.loginButton.click();
    }
}

export default new LoginPage();