import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useStoreContext } from '../store';

import { ActionTypes, Product, ProductVariant } from '../store/types';
import ProductCard from './ProductCard';

const ProductSelection = () => {
	const { state, dispatch } = useStoreContext();
	const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
	const selectedCategory = state.categories[state.selectedCategoryId];
	const categoryProducts = selectedCategory.relationships.products.data;
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

	useEffect(() => {
		dispatch({
			type: ActionTypes.SET_STEP_VALIDITY,
			payload: !!state.selectedProductVariantId,
		});

	}, [state.selectedProductVariantId, dispatch]);

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
			<h1>Select the products you want to subscribe to:</h1>
			<ul className="products">
				{sortedProducts.map(({ id }) =>(
					<li key={id}>
						<ProductCard {...state.products[id]} />
					</li>
				))}
			</ul>
		</>
	);
}

export default ProductSelection;
