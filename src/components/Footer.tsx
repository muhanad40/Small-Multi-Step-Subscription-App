import React from 'react';
import { useStoreContext } from '../store';
import { ActionTypes } from '../store/types';

const Footer = () => {
	const { dispatch } = useStoreContext();

	return (
		<>
			<button className="button button--primary" onClick={() => {
				dispatch({
					type: ActionTypes.NEXT_STEP,
				});
			}}>Next</button>
			<button className="button button--secondary" onClick={() => {
				dispatch({
					type: ActionTypes.PREVIOUS_STEP,
				});
			}}>Back</button>
		</>
	);
};

export default Footer;
