import React from 'react';
import mockData from '../../mockData.json';
import { render, waitForElementToBeRemoved, fireEvent, act } from '@testing-library/react';

import App from './';
import { StoreProvider } from '../../store';

function renderApp() {
	fetchMock.mockResponseOnce(JSON.stringify(mockData));

	return render(
		<StoreProvider>
			<App />
		</StoreProvider>
	);
}

async function click(element: HTMLElement) {
	fireEvent.click(element);
	// Fix for act() warning ¯\_(ツ)_/¯
	await act(() => {
		return Promise.resolve();
	});
}

describe('App component', () => {
	// Have to do this due to this issue: https://github.com/jefflau/jest-fetch-mock/issues/184
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should switch between different steps (via Footer) correctly and POST event', async () => {
		const { getByTestId, getByText } = renderApp();

		await waitForElementToBeRemoved(() => getByTestId('loading-txt'));

		const nextBtn = getByText('Get Started');

		await click(nextBtn);

		expect(() => {
			getByText('What do you need help with?');
		}).not.toThrow();

		expect(fetchMock.mock.calls[1][0]).toEqual('https://testapi.numan.com/v1/events')
	});

	it('should go back a step when Back button is clicked', async () => {
		const { getByTestId, getByText, debug } = renderApp();

		await waitForElementToBeRemoved(() => getByTestId('loading-txt'));

		const nextBtn = getByText('Get Started');

		await click(nextBtn);

		const backBtn = getByText('Back');

		await click(backBtn);

		expect(() => {
			getByText('Get Started');
		}).not.toThrow();
	});
});
