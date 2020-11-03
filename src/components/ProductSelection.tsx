import React, { useCallback, useState, useMemo } from 'react';
import { useStoreContext } from '../store';
import RadioInput from './RadioInput';
import { ActionTypes, Product, ProductVariant } from '../store/types';

const ProductSelection = () => {
	const { state, dispatch } = useStoreContext();
	const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
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
	const sortByTitleAsc = useCallback((products: Product[]) => {
		return products.sort((prodA, prodB) => {
			if (prodA.attributes.name[0] < prodB.attributes.name[0]) {
				return -1;
			} else {
				return 1
			}
		})
	}, []);
	const sortByPriceDesc = useCallback((products: ProductVariant[]) => {
		return products.sort(({ attributes: { price: priceA }}, { attributes: { price: priceB }}) => {
			if (priceA > priceB) {
				return -1;
			} else {
				return 1
			}
		})
	}, []);

	useMemo(() => {
		const sorted = categoryProducts
			.map(({ id }) => {
				const result = state.products[id];
				const variants = state.products[id].relationships.product_variants.data.map((productVariant) => {
						return {
							...productVariant,
							...state.productVariants[productVariant.id],
						}
					});
				const sortedVariants = sortByPriceDesc(variants);

				state.products[id].relationships.product_variants.data = sortedVariants;

				return result;
			});

		setSortedProducts(sortByTitleAsc(sorted));
	}, [state.products, categoryProducts, sortByPriceDesc, sortByTitleAsc, state.productVariants]);

	return (
		<>
			<h1>Select the product you want to subscribe to:</h1>
			<ul className="products">
				{sortedProducts.map(product => {
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
									} = productVariant;

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
