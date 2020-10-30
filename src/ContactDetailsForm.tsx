import React from 'react';

const ContactDetailsForm = () => {
	return (
		<>
			<h1>Please enter your contact details:</h1>
			<div className="card">
				<form className="form">
					<div className="form__error-msg">
						Please make sure you fill out all the fields
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">First name</div>
							<input type="text" className="form__field-input" />
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Last name</div>
							<input type="text" className="form__field-input" />
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Phone number</div>
							<input type="number" className="form__field-input" />
						</label>
					</div>

					<div className="form__field">
						<label htmlFor="first-name">
							<div className="form__field-label">Email address</div>
							<input type="email" className="form__field-input" />
						</label>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactDetailsForm;
