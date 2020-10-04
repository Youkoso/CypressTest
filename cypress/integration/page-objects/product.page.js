import Page from "./page";

class ProductPage extends Page {

    productAvailability(productName) {
        this.productPresence(productName);
        return cy.getDataTestLike('delivery-highlight')
                 .contains('Op voorraad');
    }

    productPresence(productName) {
        cy.getDataTestLike('product-title')
          .find('span[data-test="title"]')
          .contains(`${productName}`);
    }


}

export default new ProductPage();