import React from 'react';

import { ActionTypes, useStoreContext } from '../store';

const InitialStep = () => {
	const { dispatch } = useStoreContext();

	return (
		<button className="button button--primary" onClick={() => {
			dispatch({
				type: ActionTypes.NEXT_STEP,
			});
		}}>Get Started</button>
	)
}

export default InitialStep;
