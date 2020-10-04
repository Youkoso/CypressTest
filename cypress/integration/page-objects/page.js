export default class Page {

    get searchInput() {
        return cy.getDataTestLike('search_input_trigger')
                 .clear();
    }

    get profileElem() {
        return cy.getDataTestLike('login-link');
    }

    get basketElem() {
        return cy.getDataTestLike('basket-button');
    }

    get favouritesElem() {
        return cy.getDataTestLike('customer-lists-button');
    }

    doSearch(productToSearch) {
        this.searchInput.type(`${productToSearch}{enter}`);
    }

    
}   
