import
	React,
	{
		useReducer,
		createContext,
		useContext,
		ReactElement,
	}
from "react";

import {
	State,
	Action,
	ActionTypes,
	Steps,
	StoreContextType,
} from './types';

export const orderedSteps = [
	Steps.INITIAL,
	Steps.CATEGORY_SELECTION,
	Steps.VARIANT_SELECTION,
	Steps.CONTACT_DETAILS_FORM,
	Steps.ORDER_SUMMARY,
	Steps.THANK_YOU,
];

const initState: State = {
	currentStep: Steps.INITIAL,
	isLoading: true,
	categories: {},
	products: {},
	productVariants: {},
	selectedCategoryId: '',
	selectedProductVariants: {},
	isCurrentStepValid: false,
};

const StoreContext = createContext<StoreContextType>({
	state: initState,
	dispatch: () => null,
});

const reducer = (state: State, { type, payload }: Action): State => {
	switch(type) {
		case ActionTypes.SELECT_CATEGORY:
			return {
				...state,
				selectedCategoryId: payload,
				isCurrentStepValid: true,
			};

		case ActionTypes.PRESELECT_PRODUCT_VARIANTS: {
			return {
				...state,
				selectedProductVariants: payload,
				isCurrentStepValid: true,
			};
		}

		case ActionTypes.SELECT_PRODUCT_VARIANT: {
			return {
				...state,
				selectedProductVariants: {
					...state.selectedProductVariants,
					[payload.productId]: payload.variantId,
				},
				isCurrentStepValid: true,
			};
		}

		case ActionTypes.SET_LOADING_STATUS:
			return {
				...state,
				isLoading: payload as boolean,
			};

		case ActionTypes.NEXT_STEP: {
			const currentStepIndex = orderedSteps.indexOf(state.currentStep);

			return {
				...state,
				currentStep: orderedSteps[currentStepIndex + 1],
				isCurrentStepValid: false,
			};
		}

		case ActionTypes.PREVIOUS_STEP: {
			const currentStepIndex = orderedSteps.indexOf(state.currentStep);

			return {
				...state,
				currentStep: orderedSteps[currentStepIndex - 1],
				isCurrentStepValid: true,
			};
		}

		case ActionTypes.STORE_CATEGORIES:
			return {
				...state,
				categories: payload,
			}

		case ActionTypes.STORE_PRODUCTS:
			return {
				...state,
				products: payload,
			}

		case ActionTypes.STORE_PRODUCTS_VARIANTS:
			return {
				...state,
				productVariants: payload,
			}

		default:
			return state;
	}
};

export function StoreProvider(props: object): ReactElement {
	const [state, dispatch] = useReducer(reducer, initState);

	return <StoreContext.Provider value={{state, dispatch}} {...props} />;
}

export function useStoreContext() {
	return useContext(StoreContext);
}
