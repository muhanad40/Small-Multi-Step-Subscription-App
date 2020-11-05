import React, { useCallback, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';

import { useStoreContext } from '../../store';
import { Category, ActionTypes } from '../../store/types';

const CategorySelection = () => {
	const { state, dispatch } = useStoreContext();
	const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
	const onCategoryClick = useCallback((categoryId: Category['id']) => {
		dispatch({
			type: ActionTypes.SELECT_CATEGORY,
			payload: categoryId,
		});
	}, [dispatch]);

	useMemo(() => {
		const sorted = Object.values(state.categories).sort((catA, catB) => {
			if (catA.attributes.name[0] < catB.attributes.name[0]) {
				return -1;
			} else {
				return 1
			}
		});
		setSortedCategories(sorted);
	}, [state.categories]);

	useEffect(() => {
		dispatch({
			type: ActionTypes.SET_STEP_VALIDITY,
			payload: !!state.selectedCategoryId,
		});

	}, [state.selectedCategoryId, dispatch]);

	return (
		<>
			<h1>What do you need help with?</h1>
			<ul className="categories">
				{sortedCategories.map((category) => {
					const classes = classNames({
						card: true,
						categories__button: true,
						selected: state.selectedCategoryId === category.id,
					});

					return (
						<li key={category.id} data-testid="category-card-li">
							<button data-testid={`category-card-${category.id}`} className={classes} onClick={() => onCategoryClick(category.id)}>
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
