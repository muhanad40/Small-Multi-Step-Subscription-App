import React from 'react';

import { useStoreContext } from '../store';
import { ActionTypes } from '../store/types';

const InitialStep = () => {
	const { dispatch } = useStoreContext();

	return (
		<button className="button button--primary" onClick={() => {
			dispatch({
				type: ActionTypes.NEXT_STEP,
			});
		}}>Get Started</button>
	);
}

export default InitialStep;
