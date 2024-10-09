describe('order is placed', function () {
	beforeEach(function () {
		cy.intercept('GET', 'ingredients', {
			fixture: 'ingredients',
		}).as('getIngredients');
		cy.visit('http://localhost:8080');

		cy.get('[data-testid=bun]').first().as('bun');
		cy.get('[data-testid=main]').first().as('main_ingredient');
		cy.get('[data-testid=sauce]').first().as('sauce');
		cy.get('[data-testid=place_order_button]').first().as('place_order_button');
		cy.get('[data-testid=top-bun-place]').first().as('bun-place');
		cy.get('[data-testid=filling_place]').first().as('filling_place');
	});

	it('should not place an order without any buns and sauce', function () {
		cy.get('@place_order_button').click();

		cy.get('[data-testid=modal]').should('not.exist');
	});

	it('should not place an order without sauce', function () {
		cy.get('@bun').trigger('dragstart');
		cy.get('@bun-place').trigger('drop');

		cy.get('@place_order_button').click();

		cy.get('[data-testid=modal]').should('not.exist');
	});

	it('should not place an order without buns', function () {
		cy.get('@sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@place_order_button').click();

		cy.get('[data-testid=modal]').should('not.exist');
	});

	it('should not place an order without being logged in', function () {
		cy.get('@bun').trigger('dragstart');
		cy.get('@bun-place').trigger('drop');
		cy.get('@sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@place_order_button').click();

		cy.url().should('include', '/login');
	});

	it('should place an order with ingredients and logging in', function () {
		cy.get('@bun').trigger('dragstart');
		cy.get('@bun-place').trigger('drop');
		cy.get('@sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('testAccessToken')
		);

		cy.intercept('POST', 'orders', {
			fixture: 'order',
		}).as('postOrder');

		cy.get('@place_order_button').click();

		cy.get('[data-testid=modal]')
			.should('be.visible')
			.should('contain.text', '55827')
			.and('contain.text', 'идентификатор заказа')
			.and('contain.text', 'Ваш заказ начали готовить')
			.and('contain.text', 'Дождитесь готовности на орбитальной станции');
	});
});
