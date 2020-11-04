import React, { ReactElement, ChangeEvent } from 'react';

import { parseFrequency } from '../utils';

interface Props {
	id: string;
	label: string;
	price: number;
	selected: boolean;
	frequency: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
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