import React from 'react';

const Confirmation = () => {
	return (
		<>
			<h1>Order Summary</h1>
			<div className="card summary-card">
				<p><strong>Category:</strong> Erectile dysfunction</p>
				<p><strong>Product:</strong> Finasteride (Generic Propecia)</p>
				<p><strong>Treatment:</strong> 1mg 28 tablets every month</p>
			</div>

			<h1>Contact Details</h1>
			<div className="card summary-card">
				<p><strong>First name:</strong> John</p>
				<p><strong>Last name:</strong> Doe</p>
				<p><strong>Telephone number:</strong> 07983473612</p>
				<p><strong>Email address:</strong> john@gmail.com</p>
			</div>
		</>
	);
};

export default Confirmation;
