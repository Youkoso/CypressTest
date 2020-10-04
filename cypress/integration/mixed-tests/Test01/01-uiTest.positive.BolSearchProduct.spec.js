import MainPage from "../../page-objects/main.page";
import SearchResultsPage from "../../page-objects/search.results.page";
import ProductPage from "../../page-objects/product.page";

describe('Bol.com test 01', () => {
    it('Positive: User checks product in stock', () => {
        cy.fixture('bol.com').then(bolData => {
            MainPage.visit();
            cy.log('WHEN user searches a product');
            MainPage.doSearch(bolData.productNameTest01);
            cy.log('THEN product was found in search results');
            cy.getHrefLike(bolData.productHrefTest01).should('exist');
            cy.log('WHEN user opens product page');
            SearchResultsPage.openProductPage(bolData.productHrefTest01);
            cy.log('THEN inspected product is in stock');
            ProductPage.productAvailability(bolData.productNameTest01).should('exist');
        })
    })
})