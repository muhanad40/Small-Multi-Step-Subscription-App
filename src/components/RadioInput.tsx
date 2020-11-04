import React, { ReactElement, ChangeEvent } from 'react';

interface Props {
	id: string;
	label: string;
	price: number;
	selected: boolean;
	frequency: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

interface PeriodMap {
	[key: string]: {
		singular: string;
		plural: string;
	};
}

function parseFrequency(frequency: string): string {
	const match = frequency.match(/([0-9])([a-z])/);
	const periodMap: PeriodMap = {
		m: {
			singular: 'month',
			plural: 'months'
		},
		d: {
			singular: 'day',
			plural: 'days',
		},
		y: {
			singular: 'year',
			plural: 'years',
		},
	}

	if (!match) {
		return '';
	}

	const length = parseInt(match[1]);
	const period: string = match[2];
	const { singular, plural } = periodMap[period];
	const periodStr = length > 1 ? plural : singular;
	const sentence = ['Every', (length > 1) && length, periodStr]
		.filter(segment => !!segment);

	return sentence.join(' ');
}

const RadioInput = ({ id, price, selected, onChange, frequency, label }: Props): ReactElement => (
	<label htmlFor={id} className="radio-input products__variant">
		<input
			id={id}
			type="radio"
			value={id}
			checked={selected}
			onChange={onChange}
		/>
		<div className="radio-input__control"></div>
		<div className="radio-input__label">
			{label} - <span className="radio-input__price">£{(price/100).toFixed(2)}</span>
			<div className="radio-input__sub-label">{parseFrequency(frequency)}</div>
		</div>
	</label>
);

export default RadioInput;