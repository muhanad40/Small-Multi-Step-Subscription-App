import React, { useCallback } from 'react';
import { useStoreContext } from '../store';
import RadioInput from './RadioInput';
import { ActionTypes } from '../store/types';

const ProductSelection = () => {
	const { state, dispatch } = useStoreContext();
	const selectedCategory = state.categories[state.selectedCategoryId];
	const categoryProducts = selectedCategory.relationships.products.data;
	const selectProduct = useCallback((productId, variantId) => {
		dispatch({
			type: ActionTypes.SELECT_PRODUCT,
			payload: {
				productId, variantId,
			},
		});
	}, [dispatch]);

	return (
		<>
			<h1>Select the product you want to subscribe to:</h1>
			<ul className="products">
				{categoryProducts.map(product => {
					const {
						id: productId,
						attributes: {
							name,
							alt_name,
							summary
						},
						relationships: {
							product_variants: {
								data: productVariants,
							},
						}
					} = state.products[product.id];

					return (
						<li key={productId}>
							<div className="card products__card">
								<div className="products__card-header">
									<div className="products__header-img"></div>

									<span className="products__header-title">{name} {alt_name && `(${alt_name})`}</span>
								</div>

								<div className="products__description">
									{summary}
								</div>

								{productVariants.map(productVariant => {
									const {
										id: variantId,
										attributes: {
											variant,
											price,
											subscription_frequency,
										}
									} = state.productVariants[productVariant.id];;

									return (
										<RadioInput
											key={variantId}
											id={variantId}
											name={variant}
											price={price}
											selected={state.selectedProductVariantId === variantId}
											frequency={subscription_frequency}
											onChange={(e) => {
												if (e.target.checked) {
													selectProduct(productId, variantId);
												}
											}}
										/>
									);
								})}
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default ProductSelection;
