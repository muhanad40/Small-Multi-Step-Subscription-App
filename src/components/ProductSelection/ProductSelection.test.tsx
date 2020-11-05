import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ProductSelection from './';
import { MockStoreProvider, mockState } from '../../testUtils';

describe('ProductSelection component', () => {
	it('should render all products in alphabetical order', () => {
		const selectedCatId = Object.keys(mockState.categories)[1];
		const mockedState = {
			...mockState,
			selectedCategoryId: selectedCatId,
		};
		const { getAllByTestId } = render(
			<MockStoreProvider initState={mockedState}>
				<ProductSelection />
			</MockStoreProvider>
		);
		const sortedProductTitles = mockState.categories[selectedCatId].relationships.products.data
			.map(product => mockState.products[product.id])
			.sort((prodA, prodB) => {
				if (prodA.attributes.name[0] < prodB.attributes.name[0]) {
					return -1;
				} else {
					return 1
				}
			})
			.map(({ attributes: { name, alt_name }}) => {
				let title = name;

				if (alt_name) {
					title += ` (${alt_name})`;
				}

				return title;
			});
		const productTitles = getAllByTestId('product-title').map(product => product.textContent);

		expect(sortedProductTitles).toEqual(productTitles);
	});

	// TODO: Verify a variant is selected by default
	it('should render product variants for each product and pre-select one by default', () => {
		const selectedCatId = Object.keys(mockState.categories)[1];
		const mockedState = {
			...mockState,
			selectedCategoryId: selectedCatId,
		};
		const { getAllByTestId, debug } = render(
			<MockStoreProvider initState={mockedState}>
				<ProductSelection />
			</MockStoreProvider>
		);
		const sortedVariants: string[] = [];

		mockState.categories[selectedCatId].relationships.products.data.forEach(product => {
			mockState.products[product.id].relationships.product_variants.data.map(prodVariant => {
					return mockState.productVariants[prodVariant.id];
				})
				.sort((prodA, prodB) => {
					if (prodA.attributes.price > prodB.attributes.price) {
						return -1;
					} else {
						return 1
					}
				})
				.forEach((productVariant) => {
					sortedVariants.push(`${productVariant.attributes.variant} - £${(productVariant.attributes.price/100).toFixed(2)}`);
				});
			})

		const productTitles = getAllByTestId('radio-input-label').map(productEl => productEl.textContent);

		expect(productTitles).toEqual(sortedVariants);
	});

	it('should let a user select only one variant', () => {
		const selectedCatId = Object.keys(mockState.categories)[1];
		const mockedState = {
			...mockState,
			selectedCategoryId: selectedCatId,
		};
		const { getAllByTestId, debug, container } = render(
			<MockStoreProvider initState={mockedState}>
				<ProductSelection />
			</MockStoreProvider>
		);

		const radioInputs = getAllByTestId('radio-input');

		fireEvent.click(radioInputs[0]);
		fireEvent.click(radioInputs[1]); // <- Select another variant

		const checkedRadioInput = container.querySelectorAll('input:checked');

		expect(checkedRadioInput).toHaveLength(1);
	});
});
