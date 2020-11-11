import React, { useCallback, useState, useEffect } from 'react';
import { useStoreContext } from '../store';
import { ActionTypes, Steps } from '../store/types';

const Footer = () => {
	const [nextButtonLabel, setNextButtonLabel] = useState<string>('Get Started');
	const { state, dispatch } = useStoreContext();
	const onNextClick = useCallback(() => {
		dispatch({
			type: ActionTypes.NEXT_STEP,
		});
	}, [dispatch]);
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
						disabled={(state.currentStep && !state.isCurrentStepValid) || false}
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
