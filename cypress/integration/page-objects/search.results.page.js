import Page from "./page";

class SearchResultsPage extends Page {

    openProductPage(selector) {
        return cy.getHrefLike(selector)
                 .first()
                 .click();
    }

    productFavouriteIcon(selector) {
        return cy.getHrefLike(selector)
                 .closest('li')
                 .find('[data-test="btn-wishlist-text"]')
                 .closest('button');
    }

    addItemToFavourites(selector) {
        this.productFavouriteIcon(selector)
            .click();
    }

    closeFavNotification() {
        cy.wait(1000);
        cy.getDataTestLike('modal-window-close')
          .dblclick();
        cy.getDataTestLike('modal-window')
          .should('have.length', 0);
    }
}

export default new SearchResultsPage();