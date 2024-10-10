describe('ingredients are dragged', function () {
	beforeEach(function () {
		cy.intercept('GET', 'ingredients', {
			fixture: 'ingredients',
		}).as('getIngredients');
		cy.visit('/');

		cy.get('[data-testid=bun]').first().as('first_bun');
		cy.get('[data-testid=bun]').last().as('second_bun');
		cy.get('[data-testid=top-bun-place]').first().as('top-bun-place');
		cy.get('[data-testid=bottom_bun_place]').first().as('bottom_bun_place');
		cy.get('[data-testid=filling_place]').first().as('filling_place');
	});

	it('should drag a bun to the top bun place', function () {
		cy.get('@first_bun').trigger('dragstart');
		cy.get('@top-bun-place').trigger('drop');

		cy.get('@top-bun-place').find('[data-testid=bun_in_burger]');
		cy.get('@bottom_bun_place').find('[data-testid=bun_in_burger]');
	});

	it('should drag a bun to the bottom bun place', function () {
		cy.get('@first_bun').trigger('dragstart');
		cy.get('@bottom_bun_place').trigger('drop');

		cy.get('@top-bun-place').find('[data-testid=bun_in_burger]');
		cy.get('@bottom_bun_place').find('[data-testid=bun_in_burger]');
	});

	it('should drag a bun to the top bun place over previous bun', function () {
		cy.get('@first_bun').trigger('dragstart');
		cy.get('@top-bun-place').trigger('drop');
		cy.get('@second_bun').trigger('dragstart');
		cy.get('@top-bun-place').trigger('drop');

		cy.get('@top-bun-place')
			.find('[data-testid=bun_in_burger]')
			.should('contain.text', 'Флюоресцентная булка R2-D3');
		cy.get('@bottom_bun_place')
			.find('[data-testid=bun_in_burger]')
			.should('contain.text', 'Флюоресцентная булка R2-D3');
	});

	it('should drag a bun to the bottom bun place over previous bun', function () {
		cy.get('@first_bun').trigger('dragstart');
		cy.get('@bottom_bun_place').trigger('drop');
		cy.get('@second_bun').trigger('dragstart');
		cy.get('@bottom_bun_place').trigger('drop');

		cy.get('@top-bun-place')
			.find('[data-testid=bun_in_burger]')
			.should('contain.text', 'Флюоресцентная булка R2-D3');
		cy.get('@bottom_bun_place')
			.find('[data-testid=bun_in_burger]')
			.should('contain.text', 'Флюоресцентная булка R2-D3');
	});

	it('should drag a main ingredient', function () {
		cy.get('[data-testid=main]').first().as('main');

		cy.get('@main').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@filling_place')
			.find('[data-testid=filling_in_burger]')
			.should('contain.text', 'Биокотлета из марсианской Магнолии');
	});

	it('should drag two main ingredients', function () {
		cy.get('[data-testid=main]').first().as('first_main');
		cy.get('[data-testid=main]').last().as('last_main');

		cy.get('@first_main').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');
		cy.get('@last_main').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@filling_place')
			.find('[data-testid=filling_in_burger]')
			.should('contain.text', 'Биокотлета из марсианской Магнолии')
			.and('contain.text', 'Сыр с астероидной плесенью');
	});

	it('should drag a sauce', function () {
		cy.get('[data-testid=sauce]').first().as('sauce');

		cy.get('@sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@filling_place')
			.find('[data-testid=filling_in_burger]')
			.should('contain.text', 'Соус Spicy-X');
	});

	it('should drag two sauces', function () {
		cy.get('[data-testid=sauce]').first().as('first_sauce');
		cy.get('[data-testid=sauce]').last().as('last_sauce');

		cy.get('@first_sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');
		cy.get('@last_sauce').trigger('dragstart');
		cy.get('@filling_place').trigger('drop');

		cy.get('@filling_place')
			.find('[data-testid=filling_in_burger]')
			.should('contain.text', 'Соус Spicy-X')
			.and('contain.text', 'Соус с шипами Антарианского плоскоходца');
	});
});
