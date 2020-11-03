import React from 'react';

import { useStoreContext } from '../store';

const CategorySelection = () => {
	const { state, dispatch } = useStoreContext();

	return (
		<>
			<h1>What do you need help with?</h1>
			<ul className="categories">
			{Object.keys(state.categories).map((catKey) => {
				const category = state.categories[catKey];

				return (
					<li>
						<button className="card categories__button">
							<svg className="categories__icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
								<path fillRule="evenodd" clipRule="evenodd" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20zm5-29c0 7.732-6.268 14-14 14v4c9.941 0 18-8.059 18-18h-4z" fill="currentColor"/>
							</svg>

							<span className="categories__label">{category.attributes.name}</span>
						</button>
					</li>
				);
			})}
			</ul>
		</>
	);
};

export default CategorySelection;
