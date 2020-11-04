import React from 'react';
import { useStoreContext } from '../store';
import { ActionTypes, Steps } from '../store/types';


const Footer = () => {
	const { state, dispatch } = useStoreContext();

	return (
		<>
			<button
				className="button button--primary"
				disabled={!state.isCurrentStepValid}
				onClick={() => {
					dispatch({
						type: ActionTypes.NEXT_STEP,
					});
				}}
			>
				{state.currentStep === Steps.ORDER_SUMMARY ? 'Pay Now' : 'Next'}
			</button>

			{state.currentStep !== Steps.CATEGORY_SELECTION
				&& (
					<button className="button button--secondary" onClick={() => {
						dispatch({
							type: ActionTypes.PREVIOUS_STEP,
						});
					}}>Back</button>
				)
			}
		</>
	);
};

export default Footer;
