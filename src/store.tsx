import React, { useReducer, createContext, useContext } from "react";

export enum StepTypes {
	INITIAL = 'INITIAL',
	CATEGORY_SELECTION = 'CATEGORY_SELECTION',
	VARIANT_SELECTION = 'VARIANT_SELECTION',
	CONTACT_DETAILS_FORM = 'CONTACT_DETAILS_FORM',
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	THANK_YOU = 'THANK_YOU'
}

export const orderedSteps = [
	StepTypes.INITIAL,
	StepTypes.CATEGORY_SELECTION,
	StepTypes.VARIANT_SELECTION,
	StepTypes.CONTACT_DETAILS_FORM,
	StepTypes.ORDER_SUMMARY,
	StepTypes.THANK_YOU,
];

interface State {
	currentStep: StepTypes;
}

export enum ActionTypes {
	NEXT_STEP = 'NEXT_STEP',
}

interface Action {
	type: ActionTypes;
	payload?: StepTypes,
}

interface StoreContextType {
	state: State;
	dispatch: React.Dispatch<Action>;
}

const reducer = (state: State, { type }: Action): State => {
	switch(type) {
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
		default:
			return state;
	}
};

const initState: State = {
	currentStep: StepTypes.INITIAL,
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
