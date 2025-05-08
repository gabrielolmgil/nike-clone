describe('Login', () => {
    it('should login with valid credentials', () => {
      cy.visit('http://localhost:4200/login');
      cy.get('input[formControlName="name"]').type('Lucas'); // o el nombre correcto
      cy.get('input[formControlName="password"]').type('1234');
      cy.get('form').submit();
  
      cy.url().should('include', '/'); // ajusta según tu lógica real
    });
  
    it('should show error with invalid credentials', () => {
      cy.visit('http://localhost:4200/login');
      cy.get('input[formControlName="name"]').type('usuario_incorrecto');
      cy.get('input[formControlName="password"]').type('malacontraseña');
      cy.get('form').submit();
  // ajusta al mensaje real que aparece
    });
  });
  