import React, { useCallback, useState, useEffect } from 'react';
import { useStoreContext } from '../store';
import { ActionTypes, Steps, Product, ProductVariant, Category } from '../store/types';

enum EventTypes {
	USER_STARTED_FLOW = 'user-started-flow',
	USER_SELECTED_CATEGORY = 'user-selected-category',
	USER_SELECTED_PRODUCT = 'user-selected-product',
	USER_ENTERED_CONTACT_DATA = 'user-entered-contact-data',
	USER_SUBMITTED_ORDER = 'user-submitted-order',
}

type StepToEventType = {
	[key in Steps]?: EventTypes;
}

const stepToEventMap: StepToEventType = {
	[Steps.CATEGORY_SELECTION]: EventTypes.USER_SELECTED_CATEGORY,
	[Steps.VARIANT_SELECTION]: EventTypes.USER_SELECTED_PRODUCT,
	[Steps.CONTACT_DETAILS_FORM]: EventTypes.USER_ENTERED_CONTACT_DATA,
	[Steps.ORDER_SUMMARY]: EventTypes.USER_SUBMITTED_ORDER,
}

interface StepDataResult {
	foo?: 'bar',
	selectedCategory?: Category;
	selectedProduct?: Product;
	selectedProductVariant?: ProductVariant;
	contactDetails?: {},
}

const Footer = () => {
	const [nextButtonLabel, setNextButtonLabel] = useState<string>('Get Started');
	const { state, dispatch } = useStoreContext();
	const [collectedUserData, setCollectedUserData] = useState<StepDataResult>({});
	const getStepData = useCallback((step: Steps | null) => {
		let result: StepDataResult = {};

		setCollectedUserData((collectedUserData) => ({
			...collectedUserData,
			...result,
		}));

		if (!step) {
			result.foo = 'bar';
		} else if (step === Steps.CATEGORY_SELECTION) {
			result.selectedCategory = state.categories[state.selectedCategoryId];
		} else if (step === Steps.VARIANT_SELECTION) {
			result.selectedProduct =state.products[state.selectedProductId];
			result.selectedProductVariant =state.productVariants[state.selectedProductVariantId];
		} else if (step === Steps.CONTACT_DETAILS_FORM) {
			result.contactDetails = state.contactDetails;
		} else if (step === Steps.ORDER_SUMMARY) {
			result = collectedUserData;
		}

		return result;
	}, [state, collectedUserData, setCollectedUserData]);
	const onNextClick = useCallback(() => {
		fetch('https://testapi.numan.com/v1/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				type: !state.currentStep ? EventTypes.USER_STARTED_FLOW : stepToEventMap[state.currentStep],
				user_id: state.userId,
				data: getStepData(state.currentStep),
			}),
		}).then(() => {
			dispatch({
				type: ActionTypes.NEXT_STEP,
			});
		});
	}, [state, dispatch, getStepData]);
	const onPreviousClick = useCallback(() => {
		dispatch({
			type: ActionTypes.PREVIOUS_STEP,
		});
	}, [dispatch]);

	useEffect(() => {
		switch(state.currentStep) {
			case null:
			case undefined:
				setNextButtonLabel('Get Started');
				break;

			case Steps.ORDER_SUMMARY:
				setNextButtonLabel('Pay Now');
				break;

			default:
				setNextButtonLabel('Next');
		}
	}, [state.currentStep]);

	return (
		<>
			{state.currentStep !== Steps.THANK_YOU &&
				(
					<button
						className="button button--primary"
						disabled={state.currentStep && !state.isCurrentStepValid || false}
						onClick={onNextClick}
						data-testid="next-btn"
					>
						{nextButtonLabel}
					</button>
				)
			}

			{state.currentStep && state.currentStep !== Steps.THANK_YOU
				&& (
					<button className="button button--secondary" onClick={onPreviousClick}>Back</button>
				)
			}
		</>
	);
};

export default Footer;
