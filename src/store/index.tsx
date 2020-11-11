import
	React,
	{
		useReducer,
		createContext,
		useContext,
		ReactElement,
	}
from "react";

import categories from '../mock-data/categories.json'
import products from '../mock-data/products.json'
import productVariants from '../mock-data/product-variants.json'
import {
	State,
	Action,
	ActionTypes,
	Steps,
	StoreContextType,
	Category,
} from './types';

export const orderedSteps = [
	// Steps.INITIAL,
	Steps.CATEGORY_SELECTION,
	Steps.VARIANT_SELECTION,
	Steps.CONTACT_DETAILS_FORM,
	Steps.ORDER_SUMMARY,
	Steps.THANK_YOU,
];

const initState: State = {
	userId: '',
	currentStep: null,
	isLoading: true,
	categories,
	products,
	productVariants,
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

export const StoreContext = createContext<StoreContextType>({
	state: initState,
	dispatch: () => null,
});

export const reducer = (state: State, { type, payload }: Action): State => {
	switch(type) {
		case ActionTypes.SELECT_CATEGORY:
			const defaultProductId = state.categories[payload as Category['id']].relationships.default_product.data.id;
			const defaultProduct = state.products[defaultProductId];
			const defaultVariantId = defaultProduct.relationships.default_product_variant.data.id;

			return {
				...state,
				selectedCategoryId: payload,
				selectedProductId: defaultProduct.id,
				selectedProductVariantId: defaultVariantId,
			};

		case ActionTypes.SELECT_PRODUCT_VARIANT: {
			return {
				...state,
				selectedProductId: payload.productId,
				selectedProductVariantId: payload.variantId,
			};
		}

		case ActionTypes.STORE_CONTACT_DETAILS: {
			const newState: State = {
				...state,
				contactDetails: {
					...state.contactDetails,
					...payload,
				},
			};

			return newState;
		}

		case ActionTypes.SET_STEP_VALIDITY:
			return {
				...state,
				isCurrentStepValid: payload,
			};

		case ActionTypes.NEXT_STEP: {
			let nextStepIndex;

			if (state.currentStep) {
				nextStepIndex = orderedSteps.indexOf(state.currentStep) + 1;
			} else {
				nextStepIndex = 0;
			}

			return {
				...state,
				currentStep: orderedSteps[nextStepIndex],
			};
		}

		case ActionTypes.PREVIOUS_STEP: {
			if (!state.currentStep) return state;

			const currentStepIndex = orderedSteps.indexOf(state.currentStep);

			return {
				...state,
				currentStep: orderedSteps[currentStepIndex - 1],
			};
		}

		default:
			return state;
	}
};

export function StoreProvider({ children }: { children: React.ReactNode }): ReactElement {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<StoreContext.Provider value={{state, dispatch}}>
			{children}
		</StoreContext.Provider>
	);
}

export function useStoreContext() {
	return useContext(StoreContext);
}
