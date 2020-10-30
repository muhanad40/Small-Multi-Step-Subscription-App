import React from 'react';

const ProductSelection = () => {
	return (
		<>
			<h1>Select the product you want to subscribe to:</h1>
			<ul className="products">
				<li>
					<div className="card products__card">
						<div className="products__card-header">
							<div className="products__header-img"></div>

							<span className="products__header-title">Erectile dysfunction</span>
						</div>

						<div className="products__description">
							Finasteride is the generic version of a medicine called Propecia. It has been clinically proven to be an effective treatment for male-pattern hair loss in 9 out of 10 men.
						</div>

						<label htmlFor="check1" className="radio-input products__variant">
							<input id="check1" type="radio" name="variant-selection" />
							<div className="radio-input__control"></div>
							<div className="radio-input__label">
								1mg 28 tablets - <span className="radio-input__price">£25.00</span>
								<div className="radio-input__sub-label">Every month</div>
							</div>
						</label>

						<label htmlFor="check2" className="radio-input products__variant">
							<input id="check2" type="radio" name="variant-selection" />
							<div className="radio-input__control"></div>
							<div className="radio-input__label">
								1mg 28 tablets - <span className="radio-input__price">£25.00</span>
								<div className="radio-input__sub-label">Every month</div>
							</div>
						</label>
					</div>
				</li>
				<li>
					<div className="card products__card">
						<div className="products__card-header">
							<div className="products__header-img"></div>

							<span className="products__header-title">Erectile dysfunction</span>
						</div>

						<div className="products__description">
							Finasteride is the generic version of a medicine called Propecia. It has been clinically proven to be an effective treatment for male-pattern hair loss in 9 out of 10 men.
						</div>

						<label htmlFor="check3" className="radio-input products__variant">
							<input id="check3" type="radio" name="variant-selection" />
							<div className="radio-input__control"></div>
							<div className="radio-input__label">
								1mg 28 tablets - <span className="radio-input__price">£25.00</span>
								<div className="radio-input__sub-label">Every month</div>
							</div>
						</label>

						<label htmlFor="check4" className="radio-input products__variant">
							<input id="check4" type="radio" name="variant-selection" />
							<div className="radio-input__control"></div>
							<div className="radio-input__label">
								1mg 28 tablets - <span className="radio-input__price">£25.00</span>
								<div className="radio-input__sub-label">Every month</div>
							</div>
						</label>
					</div>
				</li>
			</ul>
		</>
	);
}

export default ProductSelection;
