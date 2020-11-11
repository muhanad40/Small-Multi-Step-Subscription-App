import React, { useReducer } from 'react';
import { ReactNode, ReactElement } from 'react';
import { fireEvent, act } from '@testing-library/react';

import { State } from './store/types';
import { StoreContext, reducer } from './store';
import mockCategoriesData from './mock-data/categories.json';
import mockProductsData from './mock-data/products.json';
import mockProductVariantsData from './mock-data/product-variants.json';

interface ProviderProps {
	initState?: State;
	children: ReactNode;
}

const mockCategories: State['categories'] = mockCategoriesData;
const mockProducts: State['products'] = mockProductsData;
const mockProductVariants: State['productVariants'] = mockProductVariantsData;

export const mockState: State = {
	userId: '',
	currentStep: null,
	isLoading: true,
	categories: mockCategories,
	products: mockProducts,
	productVariants: mockProductVariants,
	selectedCategoryId: '',
	selectedProductId: '',
	selectedProductVariantId: '',
	isCurrentStepValid: true,
	contactDetails: {
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
	},
};

export function MockStoreProvider({ initState = mockState, children }: ProviderProps): ReactElement {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}

export async function click(element: HTMLElement) {
	fireEvent.click(element);
	// Fix for act() warning ¯\_(ツ)_/¯
	await act(() => {
		return Promise.resolve();
	});
}