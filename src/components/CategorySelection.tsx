import React from 'react';

const CategorySelection = () => {
	return (
		<>
			<h1>What do you need help with?</h1>
			<ul className="categories">
				<li>
					<a href="#" className="card categories__card">
						<svg className="categories__icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
							<path fillRule="evenodd" clip-rule="evenodd" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20zm5-29c0 7.732-6.268 14-14 14v4c9.941 0 18-8.059 18-18h-4z" fill="currentColor"/>
						</svg>

						<span className="categories__label">Erectile dysfunction</span>
					</a>
				</li>
				<li>
					<a href="#" className="card categories__card selected">
						<svg className="categories__icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
							<path fillRule="evenodd" clip-rule="evenodd" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20zm5-29c0 7.732-6.268 14-14 14v4c9.941 0 18-8.059 18-18h-4z" fill="currentColor"/>
						</svg>

						<span className="categories__label">Erectile dysfunction</span>
					</a>
				</li>
				<li>
					<a href="#" className="card categories__card">
						<svg className="categories__icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
							<path fillRule="evenodd" clip-rule="evenodd" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20zm5-29c0 7.732-6.268 14-14 14v4c9.941 0 18-8.059 18-18h-4z" fill="currentColor"/>
						</svg>

						<span className="categories__label">Erectile dysfunction</span>
					</a>
				</li>
			</ul>
		</>
	);
};

export default CategorySelection;
