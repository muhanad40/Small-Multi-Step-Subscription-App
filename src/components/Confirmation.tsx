import React from 'react';

import { useStoreContext } from '../store';
import { parseFrequency } from '../utils';

const Confirmation = () => {
	const { state } = useStoreContext();
	const selectedCategory = state.categories[state.selectedCategoryId];
	const {
		firstName, lastName, phoneNumber, email,
	} = state.contactDetails;

	return (
		<>
			<h1>Order Summary</h1>
			<div className="card summary-card">
				<p><strong>Category:</strong> {selectedCategory.attributes.name}</p>
				<p><strong>Products:</strong></p>
				<ul>
					{Object.keys(state.selectedProductVariants).map((productId) => {
						const variantId = state.selectedProductVariants[productId];
						const product = state.products[productId];
						const variant = state.productVariants[variantId];
						const {
							attributes: {
								variant: variantName,
								price,
								subscription_frequency,
							},
						} = variant;
						const { attributes: { name, alt_name } } = product;

						return (
							<li key={variant.id}>
								{product.attributes.name} {name} {alt_name && `(${alt_name})`}<br />
								{variantName} (<strong>£{(price/100).toFixed(2)}</strong>)<br />
								{parseFrequency(subscription_frequency)}
								<hr/>
							</li>
						);
					})}
				</ul>
			</div>

			<h1>Contact Details</h1>
			<div className="card summary-card">
				<p><strong>First name:</strong> {firstName}</p>
				<p><strong>Last name:</strong> {lastName}</p>
				<p><strong>Telephone number:</strong> {phoneNumber}</p>
				<p><strong>Email address:</strong> {email}</p>
			</div>
		</>
	);
};

export default Confirmation;
