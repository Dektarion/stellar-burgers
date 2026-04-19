import mockedData from '../fixtures/ingredients.json';
import mockedOrderData from '../fixtures/orderResponse.json';

describe('test page load & api/ingredients & modals', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('should load ingredients from mocked API', () => {
    cy.fixture('ingredients.json').then((data) => {
      data.data.slice(0, 3).forEach((item: any) => {
        cy.get(`[data-test-id="${item._id}"]`).should('exist');
      });
    });
  });

  it('should modal works with mocked data', () => {
    cy.contains('Краторная булка').should('be.visible').click();
    cy.get(`[data-test-id="close"]`).should('be.visible').click();

    cy.contains('Биокотлета из').should('be.visible').click();
    cy.get(`[data-test-id="overlay"]`).should('exist').click({ force: true });

    cy.contains('Соус Spicy-X').should('be.visible').click();
    cy.get(`[id="modals"]`).should('contain.text', 'Соус Spicy-X');
  });
});

describe('test add/remove ingredients to/from cart', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('add & remove ingredients', () => {
    cy.get(`[data-test-id="${mockedData.data[0]._id}"]`).find('button').click();
    cy.get(`[data-test-id="${mockedData.data[1]._id}"]`).find('button').click();
    cy.get(`[data-test-id="${mockedData.data[2]._id}"]`).find('button').click();

    cy.get(`[data-test-id-in-cart="${mockedData.data[1]._id}"]`)
      .find('.constructor-element__action')
      .click();
    cy.get(`[data-test-id-in-cart="${mockedData.data[2]._id}"]`)
      .find('.constructor-element__action')
      .click();
  });
});

describe('create order with auth user', () => {
  beforeEach(() => {
    cy.fixture('tokens.json').then((tokens) => {
      cy.setCookie('accessToken', tokens.accessToken);

      cy.visit('http://localhost:4000', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', tokens.refreshToken);
        }
      });
    });

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'orderResponse.json'
    }).as('postOrder');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage();
  });

  it('create order', () => {
    cy.get(`[data-test-id="${mockedData.data[0]._id}"]`).find('button').click();
    cy.get(`[data-test-id="${mockedData.data[1]._id}"]`).find('button').click();
    cy.get(`[data-test-id="${mockedData.data[2]._id}"]`).find('button').click();

    cy.contains('Оформить заказ').should('be.visible').click();

    cy.wait('@postOrder');

    cy.get(`[id="modals"]`).should(
      'contain.text',
      `${mockedOrderData.order.number}`
    );

    cy.get(`[data-test-id="close"]`).should('be.visible').click();
    cy.get(`[id="modals"]`).should('not.be.visible');

    cy.get(`[data-test-id="no-ingredients"]`)
      .find('li')
      .should('have.length', 0);

    cy.get(`[data-test-id="no-buns"]`).find('div').should('have.length', 0);
  });
});
