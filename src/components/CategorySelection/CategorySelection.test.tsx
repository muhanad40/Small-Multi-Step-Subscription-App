import React from 'react';
import { render } from '@testing-library/react';

import CategorySelection from './';
import { MockStoreProvider, click, mockState } from '../../testUtils';

describe('CategorySelection component', () => {
	it('should render all categories in alphabetical order', async () => {
		const { findAllByTestId } = render(
			<MockStoreProvider>
				<CategorySelection />
			</MockStoreProvider>
		);

		const sortedCategories = Object.values(mockState.categories)
			.sort((catA, catB) => {
				if (catA.attributes.name[0] < catB.attributes.name[0]) {
					return -1;
				} else {
					return 1
				}
			})
			.map(cat => cat.attributes.name);

		const categoryCards = await findAllByTestId('category-card-li');

		expect(categoryCards.map(cat => cat.textContent)).toEqual(sortedCategories);
	});

	it('should highlight category when clicked', async () => {
		const { getByTestId } = render(
			<MockStoreProvider initState={mockState}>
				<CategorySelection />
			</MockStoreProvider>
		);

		const targetCategoryId = Object.keys(mockState.categories)[0];
		const targetCatCard = getByTestId(`category-card-${targetCategoryId}`);

		await click(targetCatCard);

		expect(targetCatCard.classList.contains('selected')).toBe(true);
	});
});
