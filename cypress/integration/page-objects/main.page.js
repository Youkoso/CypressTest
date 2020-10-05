import Page from "./page";
import {URL_BOL} from "../../helpers/apiSettings";

class MainPage extends Page {

    visit() {
        cy.clearCookies();
        cy.visit(URL_BOL);
        cy.wait(1000);
        this.acceptCookies();
    }

    acceptCookies() {
        cy.getDataTestLike('consent-modal-confirm-btn')
          .click();
        cy.getDataTestLike('modal-window')
          .should('have.length', 0);
    }


}

export default new MainPage();