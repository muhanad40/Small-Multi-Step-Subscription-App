import React, { useCallback, useEffect } from 'react';

import {
	ActionTypes,
	useStoreContext,
	Category,
	ProductVariant,
	Product,
} from '../store';

interface FetchResponse {
	data: Category[];
	included: [Product | ProductVariant]
}

const InitialStep = () => {
	const { state, dispatch } = useStoreContext();

	const fetchData = useCallback(() => {
		return fetch('https://testapi.numan.com/v1/product_categories')
			.then(res => res.json());
	}, []);

	// Fetch data on initial render
	useEffect(() => {
		fetchData()
			.then(({ data, included }: FetchResponse) => {
				const products: {[key: string]: Product} = {};
				const productsVariants: {[key: string]: ProductVariant} = {};

				// Store categories
				dispatch({
					type: ActionTypes.STORE_CATEGORIES,
					payload: data,
				});

				included.forEach((item : ProductVariant | Product) => {
					if (item.type === 'product') {
						products[item.id] = item;
					} else if (item.type === 'product_variant') {
						productsVariants[item.id] = item;
					}
				});

				// Store products
				dispatch({
					type: ActionTypes.STORE_PRODUCTS_VARIANTS,
					payload: products,
				});

				// Store products
				dispatch({
					type: ActionTypes.STORE_PRODUCTS_VARIANTS,
					payload: productsVariants,
				});

				// Set loading state to false
				dispatch({
					type: ActionTypes.SET_LOADING_STATUS,
					payload: false,
				});
			});
	}, [dispatch, fetchData]);

	return state.isLoading
		? (
			<span>Loading...</span>
		)
		: (
			<button className="button button--primary" onClick={() => {
				dispatch({
					type: ActionTypes.NEXT_STEP,
				});
			}}>Get Started</button>
		)
}

export default InitialStep;
