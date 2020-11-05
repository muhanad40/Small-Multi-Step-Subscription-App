import React, { useReducer } from 'react';
import { ReactNode, ReactElement } from 'react';
import { fireEvent, act } from '@testing-library/react';

import mockData from './mockData.json';
import { State, Category, Product, ProductVariant } from './store/types';
import { StoreContext, reducer } from './store';

interface ProviderProps {
	initState?: State;
	children: ReactNode;
}

const mockCategories: State['categories'] = {};
const mockProducts: State['products'] = {};
const mockProductVariants: State['productVariants'] = {};

(mockData.data as object as Category[]).forEach((cat) => {
	mockCategories[cat.id] = cat;
});

(mockData.included as object as (Product[] | ProductVariant[])).forEach((item: Product | ProductVariant) => {
	if (item.type === 'product') {
		mockProducts[item.id] = item;
	} else {
		mockProductVariants[item.id] = item;
	}
});

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