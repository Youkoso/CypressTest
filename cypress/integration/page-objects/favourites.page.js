import Page from "./page";

class FavouritesPage extends Page {

    visit() {
        this.favouritesElem.click();
    }
    
    favouriteProduct(href) {
        return cy.get('ul.js_wishlist_items_container')
                 .find(`a[href*="${href}"]`);
    }

    removeFromFavourites(href) {
        return this.favouriteProduct(href)
                         .closest('li')
                         .find('wsp-wishlist-delete-subject')
                         .click();
    }
}

export default new FavouritesPage();