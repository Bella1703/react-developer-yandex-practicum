describe('modal works', function () {
	beforeEach(function () {
		cy.intercept('GET', 'ingredients', {
			fixture: 'ingredients',
		}).as('getIngredients');
		cy.visit('http://localhost:8080');

		cy.get('[data-testid=bun]').first().as('ingredient');
		cy.get('@ingredient').click();
	});

	it('should open the modal', function () {
		cy.get('[data-testid=modal]').should('be.visible');
	});

	it('should close the modal by Esc', function () {
		cy.get('body').type('{esc}');

		cy.get('[data-testid=modal]').should('not.exist');
	});

	it('should close the modal by close icon', function () {
		cy.get('[data-testid=modal]').find('[data-testid=close_icon]').click();

		cy.get('[data-testid=modal]').should('not.exist');
	});

	it('should close the modal by click on modal overlay', function () {
		cy.get('[data-testid=modal_overlay]').then(($overlay) => {
			const rect = $overlay[0].getBoundingClientRect();
			const x = rect.left + 1; // 1px справа от левого края
			const y = rect.top + 1; // 1px сверху от верхнего края
			cy.get('body').click(x, y);
		});

		cy.get('[data-testid=modal]').should('not.exist');
	});
});
