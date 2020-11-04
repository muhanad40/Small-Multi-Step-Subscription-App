interface PeriodMap {
	[key: string]: {
		singular: string;
		plural: string;
	};
}

export function parseFrequency(frequency: string): string {
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
