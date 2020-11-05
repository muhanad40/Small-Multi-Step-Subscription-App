import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ContactDetailsForm from './';
import { MockStoreProvider } from '../../testUtils';

describe('ContactDetailsForm component', () => {
	it('should be able to fill in the form', () => {
		const firstName = 'John';
		const lastName = 'Doe';
		const phoneNumber = '09384729432';
		const emailAddress = 'john.doe@email.com';
		const { getByTestId } = render(
			<MockStoreProvider>
				<ContactDetailsForm />
			</MockStoreProvider>
		);

		const firstNameInput = getByTestId('first-name-input');
		const lastNameInput = getByTestId('last-name-input');
		const phoneNumberInput = getByTestId('phone-number-input');
		const emailAddressInput = getByTestId('email-address-input');

		fireEvent.change(firstNameInput, { target: { value: firstName } });
		fireEvent.change(lastNameInput, { target: { value: lastName } });
		fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
		fireEvent.change(emailAddressInput, { target: { value: emailAddress } });

		expect(firstNameInput.getAttribute('value')).toEqual(firstName);
		expect(lastNameInput.getAttribute('value')).toEqual(lastName);
		expect(phoneNumberInput.getAttribute('value')).toEqual(phoneNumber);
		expect(emailAddressInput.getAttribute('value')).toEqual(emailAddress);
	});
});
