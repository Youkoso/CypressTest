import AccountPage from "../../page-objects/account.page";
import SearchResultsPage from "../../page-objects/search.results.page";
import FavouritesPage from "../../page-objects/favourites.page";

describe('Bol.com test 03', () => {
    it('Positive: User adds product to favourites and delete it', () => {
        cy.fixture('bol.com').then(bolData => {
            cy.log('User logs in');
            cy.login(bolData.email, bolData.password);
            cy.log('User searches a product');
            AccountPage.doSearch(bolData.productNameTest01);
            cy.log('WHEN user adds product to favourites');
            SearchResultsPage.addItemToFavourites(bolData.productHrefTest01);
            cy.log('THEN favourites notification message opened and closed');
            SearchResultsPage.closeFavNotification();
            cy.log('WHEN user opens list of favourites');
            SearchResultsPage.favouritesElem.click();
            cy.log('THEN Product exists in favourites');
            FavouritesPage.favouriteProduct(bolData.productHrefTest01).should('exist');
            cy.log('WHEN user deletes product from favourites');
            FavouritesPage.removeFromFavourites(bolData.productHrefTest01);
            cy.log('THEN Product does not exist in favourites anymore');
            FavouritesPage.favouriteProduct(bolData.productHrefTest01).should('not.exist');       
        })
    })
})