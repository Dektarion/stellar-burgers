/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(id: string): Cypress.Chainable<void>;
    }
  }
}
