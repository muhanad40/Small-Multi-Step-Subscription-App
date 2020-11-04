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
	categories: {},
	products: {},
	productVariants: {},
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
				selectedProductId: '',
				selectedProductVariantId: '',
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

		case ActionTypes.SET_LOADING_STATUS:
			return {
				...state,
				isLoading: payload as boolean,
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

		case ActionTypes.STORE_USER_ID:
			return {
				...state,
				userId: payload,
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
