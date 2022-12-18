import 'cypress-localstorage-commands';

before(() => {
  cy.visit('http://localhost:4200');
  cy.get('input[name=username]').type('1');
  cy.get('input[name=password]').type('password');
  cy.get('button[type=submit]').click();
  cy.url().should('include', '/users');
  cy.saveLocalStorage();
});
beforeEach(() => {
  cy.restoreLocalStorage();
});

describe('admin', () => {
  it('should add user', () => {
    cy.visit('http://localhost:4200/users');

    cy.get('#open-new-user-modal-button').click({ waitForAnimations: true });

    cy.get('[data-cy="first-name"]').type('TESTFIRSTNAME');

    cy.get('[data-cy="last-name"]').type('TESTLASTNAME');

    cy.get('[data-cy="age"]').type('21');

    cy.get('[data-cy="email"]').type('cd.ad@mail.com');

    cy.get('[data-cy="password"]').type('password');
    cy.get('.btn-primary').click();

    cy.get('td').should('contain.text', 'TESTFIRSTNAME');
    cy.get('td').should('contain.text', 'TESTLASTNAME');
    cy.get('td').should('contain.text', '21');
  });

  it('should search user', () => {
    cy.visit('http://localhost:4200/users');
    cy.get('.input').type('1');
    cy.get('.h-6').click();
    cy.get('.alert > :nth-child(1) > span').should(
      'have.text',
      'We found Cody Adam for query 1.'
    );
  });

  it('should create associations', () => {
    cy.visit('http://localhost:4200/associations');

    cy.get('thead > tr > :nth-child(3) > .btn').click();

    cy.get('[data-cy="association-name"]').type("Cody's great association");
    cy.get('[data-cy="association-next"]').click();
    cy.get('[data-cy="association-role-name"]').type('president');
    cy.get('[data-cy="association-add-role"]').click();
    cy.get('[data-cy="association-member-id"]').type('1');
    cy.get('[data-cy="association-add-member"]').click();
    cy.get('[data-cy="association-member-name-0"]').should(
      'have.text',
      'Cody Adam'
    );
    cy.get('[data-cy="association-finish"]').click();
    cy.get('[data-cy="association-member-role-0"]').should(
      'have.text',
      'Member'
    );
    cy.get('[data-cy="association-member-name-0"]').should(
      'have.text',
      'Cody Adam'
    );
    cy.get(':nth-child(3) > :nth-child(1) > h1').should(
      'have.text',
      "Cody's great association"
    );
    cy.get('[data-cy="association-create"]').click();
    cy.get('td').should('contain.text', "Cody's great association");
  });

  it('should delete user', () => {
    cy.visit('http://localhost:4200/users');
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > :nth-child(5) > .btn').click();
    cy.get('[data-cy="delete-user-modal"]').click();
    cy.get('.btn-ghost > span').click();
    cy.get('td').should('not.contain.text', 'TESTFIRSTNAME');
    cy.get('td').should('not.contain.text', 'TESTLASTNAME');
    cy.get('td').should('not.contain.text', '21');
    /* ==== End Cypress Studio ==== */
  });
});
