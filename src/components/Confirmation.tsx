import React from 'react';

import { useStoreContext } from '../store';
import { parseFrequency } from '../utils';

const Confirmation = () => {
	const { state } = useStoreContext();
	const { attributes: { name: categoryName } } = state.categories[state.selectedCategoryId];
	const { attributes: { name: productName, alt_name }} = state.products[state.selectedProductId];
	const { attributes: { variant: variantName, price, subscription_frequency }} = state.productVariants[state.selectedProductVariantId];
	const {
		firstName, lastName, phoneNumber, email,
	} = state.contactDetails;

	return (
		<>
			<h1>Order Summary</h1>
			<div className="card summary-card">
				<p><strong>Category:</strong> {categoryName}</p>
				<p><strong>Products:</strong> {productName} {alt_name && `(${alt_name})`}</p>
				<p><strong>Variant:</strong> {variantName}</p>
				<p><strong>Price:</strong> £{(price/100).toFixed(2)}</p>
				<p><strong>Frequency:</strong> {parseFrequency(subscription_frequency)}</p>
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
