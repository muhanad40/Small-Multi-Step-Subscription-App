import React from 'react';
import { render } from '@testing-library/react';

import Confirmation from './';
import { MockStoreProvider, mockState } from '../../testUtils';
import { State } from '../../store/types';
import { parseFrequency } from '../../utils';

describe('Confirmation component', () => {
	it('should render the correct user selections with contact details', () => {
		const selectedCatId = Object.keys(mockState.categories)[1];
		const category = mockState.categories[selectedCatId];
		const productId = mockState.categories[selectedCatId].relationships.default_product.data.id;
		const product = mockState.products[productId];
		const productVariant = mockState.productVariants[product.relationships.default_product_variant.data.id];
		const mockedState: State = {
			...mockState,
			selectedCategoryId: selectedCatId,
			selectedProductId: product.id,
			selectedProductVariantId: productVariant.id,
			contactDetails: {
				firstName: 'John',
				lastName: 'Doe',
				phoneNumber: '019382922',
				email: 'jon.doe@email.com',
			}
		};
		const { getByTestId } = render(
			<MockStoreProvider initState={mockedState}>
				<Confirmation />
			</MockStoreProvider>
		);

		// Check user selections
		expect(getByTestId('category').textContent).toEqual(`Category: ${category.attributes.name}`);
		expect(getByTestId('product').textContent).toEqual(`Product: ${product.attributes.name}${product.attributes.alt_name && ` (${product.attributes.alt_name})`}`);
		expect(getByTestId('variant').textContent).toEqual(`Variant: ${productVariant.attributes.variant}`);
		expect(getByTestId('price').textContent).toEqual(`Price: £${(productVariant.attributes.price/100).toFixed(2)}`);
		expect(getByTestId('frequency').textContent).toEqual(`Frequency: ${parseFrequency(productVariant.attributes.subscription_frequency)}`);

		// Check user contact details
		expect(getByTestId('first-name').textContent).toEqual(`First name: ${mockedState.contactDetails.firstName}`);
		expect(getByTestId('last-name').textContent).toEqual(`Last name: ${mockedState.contactDetails.lastName}`);
		expect(getByTestId('phone-number').textContent).toEqual(`Telephone number: ${mockedState.contactDetails.phoneNumber}`);
		expect(getByTestId('email-address').textContent).toEqual(`Email address: ${mockedState.contactDetails.email}`);
	});
});
