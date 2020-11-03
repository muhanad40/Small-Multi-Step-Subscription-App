import React, { useReducer, createContext, useContext } from "react";

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
	selectedCategoryId: null,
};

const StoreContext = createContext<StoreContextType>({
	state: initState,
	dispatch: () => null,
});

const reducer = (state: State, { type, payload }: Action): State => {
	switch(type) {
		case ActionTypes.SET_CATEGORY:
			return {
				...state,
				selectedCategoryId: payload,
			};

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

export function StoreProvider(props: object) {
	const [state, dispatch] = useReducer(reducer, initState);

	return <StoreContext.Provider value={{state, dispatch}} {...props} />;
}

export function useStoreContext() {
	return useContext(StoreContext);
}