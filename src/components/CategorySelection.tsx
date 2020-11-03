import React, { useCallback } from 'react';
import classNames from 'classnames';

import { useStoreContext } from '../store';
import { Category, ActionTypes } from '../store/types';

const CategorySelection = () => {
	const { state, dispatch } = useStoreContext();
	const onCategoryClick = useCallback((categoryId: Category['id']) => {
		dispatch({
			type: ActionTypes.SELECT_CATEGORY,
			payload: categoryId,
		});
	}, [dispatch]);

	return (
		<>
			<h1>What do you need help with?</h1>
			<ul className="categories">
				{Object.keys(state.categories).map((catKey) => {
					const category = state.categories[catKey];
					const classes = classNames({
						card: true,
						categories__button: true,
						selected: state.selectedCategoryId === category.id,
					});

					return (
						<li key={category.id}>
							<button className={classes} onClick={() => onCategoryClick(category.id)}>
								{/* TODO: This is a placeholder. Use correct icons for each category */}
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
