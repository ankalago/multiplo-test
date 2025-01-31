describe('template spec', () => {
	beforeEach(() => {
		cy.viewport('iphone-8')
		cy.visit('http://localhost:4000')
	})

	it('user view item', () => {
		cy.get('[data-testid="item-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]').as('item1')
		cy.get('@item1').children().as('image')
		cy.get('@image')
			.children()
			.children('[data-testid="icon-unlike-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]')
			.should('have.class', 'text-white')
	})

	it('user click like and unlike', () => {
		// like
		cy.get('[data-testid="item-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]').as('item1')
		cy.get('@item1').children().as('image')
		cy.get('@image')
			.children()
			.children('[data-testid="icon-unlike-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]')
			.as('icon-unlike')
		cy.get('@icon-unlike').click().should('have.class', 'text-rose-600')
		cy.wait(2000)
		// unlike
		cy.get('@image')
			.children()
			.children('[data-testid="icon-like-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]')
			.as('icon-like')
		cy.get('@icon-like').click().should('have.class', 'text-white')
		cy.wait(2000)
	})

	it('user click post', () => {
		// like
		cy.get('[data-testid="item-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]').as('item1')
		cy.get('@item1').children('[data-testid="item-image-e2edb17a-5f60-4572-989d-35aa6c3cd1ef"]').as('image')
		cy.get('@image').click()
		cy.url().should('include', '/detail/e2edb17a-5f60-4572-989d-35aa6c3cd1ef')
	})
})
