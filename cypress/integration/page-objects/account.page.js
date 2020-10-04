import Page from "./page";

class AccountPage extends Page {

    validateLogin(email) {
        cy.getDataTestLike('email')
          .should('contain', `${email}`);
    }
}

export default new AccountPage();