/// <reference types="cypress" /> 
      describe('Formulario de añadir producto', () => {
        beforeEach(() => {
            cy.visit('http://localhost:4200/admin'); 
        });
      
        it('debería añadir un producto correctamente', () => {
          cy.get('#reference').type('123');
          cy.get('#name').type('Zapatillas Deportivas');
          cy.get('#price').type('99.99');
          cy.get('#description').type('Zapatillas para correr muy cómodas');
          cy.get('#onSale').check();
          cy.get('#type').select('Calzado');
          cy.get('#image').selectFile('cypress/fixtures/test-image.jpg', { force: true });
      
          cy.get('form').submit();
      
          // Aquí podrías verificar si ha redirigido o aparece un mensaje de éxito
          cy.url().should('include', '/productos'); // ajusta según tu lógica de navegación
        });
      });
      