import React, { useCallback, ChangeEvent, useEffect } from 'react';

import { useStoreContext } from '../store';
import { ActionTypes } from '../store/types';


const ContactDetailsForm = () => {
	const { state, dispatch } = useStoreContext();
	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionTypes.STORE_CONTACT_DETAILS,
			payload: {
				[e.target.name]: e.target.value,
			},
		});
	}, [dispatch]);

	useEffect(() => {
		const { firstName, lastName, phoneNumber, email } = state.contactDetails;
		const stepIsValid = !!firstName && !!lastName && !!phoneNumber && !!email;

		dispatch({
			type: ActionTypes.SET_STEP_VALIDITY,
			payload: stepIsValid,
		});

	}, [state.contactDetails, dispatch]);

	return (
		<>
			<h1>Please enter your contact details:</h1>
			<div className="card">
				<form className="form">
					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">First name</div>
							<input
								type="text"
								name="firstName"
								className="form__field-input"
								value={state.contactDetails.firstName}
								onChange={onChange}
							/>
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Last name</div>
							<input
								type="text"
								name="lastName"
								className="form__field-input"
								value={state.contactDetails.lastName}
								onChange={onChange}
							/>
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Phone number</div>
							<input
								type="number"
								name="phoneNumber"
								className="form__field-input"
								value={state.contactDetails.phoneNumber}
								onChange={onChange}
							/>
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Email address</div>
							<input
								type="email"
								name="email"
								className="form__field-input"
								value={state.contactDetails.email}
								onChange={onChange}
							/>
						</label>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactDetailsForm;
