import React from 'react';
import mockData from '../../mockData.json';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import App from './';
import { StoreProvider } from '../../store';

import { click } from '../../testUtils';

function renderApp() {
	fetchMock.mockResponseOnce(JSON.stringify(mockData));

	return render(
		<StoreProvider>
			<App />
		</StoreProvider>
	);
}

describe('App component', () => {
	// Have to do this due to this issue: https://github.com/jefflau/jest-fetch-mock/issues/184
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should switch between different steps (via Footer) correctly and POST event', async () => {
		const { getByText } = renderApp();
		const nextBtn = getByText('Get Started');

		await click(nextBtn);

		expect(() => {
			getByText('What do you need help with?');
		}).not.toThrow();
	});

	it('should go back a step when Back button is clicked', async () => {
		const { getByText } = renderApp();
		const nextBtn = getByText('Get Started');

		await click(nextBtn);

		const backBtn = getByText('Back');

		await click(backBtn);

		expect(() => {
			getByText('Get Started');
		}).not.toThrow();
	});
});
