import React, { useReducer, createContext, useContext } from "react";

export enum Steps {
	INITIAL = 'INITIAL',
	CATEGORY_SELECTION = 'CATEGORY_SELECTION',
	VARIANT_SELECTION = 'VARIANT_SELECTION',
	CONTACT_DETAILS_FORM = 'CONTACT_DETAILS_FORM',
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	THANK_YOU = 'THANK_YOU'
}

export interface Category {
	id: string;
	type: 'product_category';
}

export interface Product {
	id: string;
	type: 'product';
}

export interface ProductVariant {
	id: string;
	type: 'product_variant';
}

export const orderedSteps = [
	Steps.INITIAL,
	Steps.CATEGORY_SELECTION,
	Steps.VARIANT_SELECTION,
	Steps.CONTACT_DETAILS_FORM,
	Steps.ORDER_SUMMARY,
	Steps.THANK_YOU,
];

interface State {
	currentStep: Steps;
	isLoading: boolean;
	categories: {
		[id: string]: Category;
	};
	products: {
		[id: string]: Product;
	};
	variants: {
		[id: string]: ProductVariant;
	};
}

export enum ActionTypes {
	NEXT_STEP = 'NEXT_STEP',
	SET_LOADING_STATUS = 'SET_LOADING_STATUS',
	STORE_CATEGORIES = 'STORE_CATEGORIES',
	STORE_PRODUCTS = 'STORE_PRODUCTS',
	STORE_PRODUCTS_VARIANTS = 'STORE_PRODUCTS_VARIANTS',
}

interface Action {
	type: ActionTypes;
	payload?: Steps | boolean | object;
}

interface StoreContextType {
	state: State;
	dispatch: React.Dispatch<Action>;
}

const reducer = (state: State, { type, payload }: Action): State => {
	switch(type) {
		case ActionTypes.SET_LOADING_STATUS:
			return {
				...state,
				isLoading: payload as boolean,
			};

		case ActionTypes.NEXT_STEP:
			// Work out which step is next
			const currentStepIndex = orderedSteps.indexOf(state.currentStep);

			// Did we reach the last step?
			if (currentStepIndex === orderedSteps.length - 1) {
				return state;
			}

			return {
				...state,
				currentStep: orderedSteps[currentStepIndex+1],
			};

		case ActionTypes.STORE_CATEGORIES:
			return {
				...state,
				categories: payload as State['categories'],
			}

		default:
			return state;
	}
};

const initState: State = {
	currentStep: Steps.INITIAL,
	isLoading: true,
	categories: {},
	products: {},
	variants: {},
};

const StoreContext = createContext<StoreContextType>({
	state: initState,
	dispatch: () => null,
});

export function StoreProvider(props: object) {
	const [state, dispatch] = useReducer(reducer, initState);

	return <StoreContext.Provider value={{state, dispatch}} {...props} />;
}

export function useStoreContext() {
	return useContext(StoreContext);
}
