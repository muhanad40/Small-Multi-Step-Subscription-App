import React, { useCallback, ChangeEvent } from 'react';

import RadioInput from './RadioInput';
import { useStoreContext } from '../store';
import { Product, ActionTypes, ProductVariant } from '../store/types';

const ProductCard = (props: Product) => {
	const { dispatch } = useStoreContext();
	const {
		id: productId,
		attributes: {
			name,
			alt_name,
			summary
		},
		relationships: {
			product_variants: {
				data: productVariants,
			},
		}
	} = props;
	const selectProduct = useCallback((productId, variantId) => {
		dispatch({
			type: ActionTypes.SELECT_PRODUCT_VARIANT,
			payload: {
				productId, variantId,
			},
		});
	}, [dispatch]);
	const onRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>, productId: Product['id'], variantId: ProductVariant['id']) => {
		if (e.target.checked) {
			selectProduct(productId, variantId);
		}
	}, [selectProduct]);
	const { state } = useStoreContext();

	return (
		<div className="card products__card">
			<div className="products__card-header">
				<div className="products__header-img"></div>

				<span className="products__header-title" data-testid="product-title">
					{name} {alt_name && `(${alt_name})`}
				</span>
			</div>

			<div className="products__description">
				{summary}
			</div>

			{productVariants.map(({ id }) => {
				const variantData = state.productVariants[id];
				const {
					id: variantId,
					attributes: {
						variant,
						price,
						subscription_frequency,
					}
				} = variantData;

				return (
					<RadioInput
						key={variantId}
						id={variantId}
						label={variant}
						price={price}
						selected={state.selectedProductVariantId === variantId}
						frequency={subscription_frequency}
						onChange={(e) => onRadioChange(e, productId, variantId)}
					/>
				);
			})}
		</div>
	);
}

export default ProductCard;
