export enum Steps {
	CATEGORY_SELECTION = 'CATEGORY_SELECTION',
	VARIANT_SELECTION = 'VARIANT_SELECTION',
	CONTACT_DETAILS_FORM = 'CONTACT_DETAILS_FORM',
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	THANK_YOU = 'THANK_YOU'
}

interface BaseObjectRef {
	id: string;
	type: string;
}

export interface Category extends BaseObjectRef {
	attributes: {
		name: string;
		slug: string,
		default_product_id: string,
		active: boolean,
		position: number,
	};
	relationships: {
		default_product: {
			data: BaseObjectRef;
		};
		products: {
			data: BaseObjectRef[];
		};
	};
}

export interface Product extends BaseObjectRef {
	attributes: {
		name: string;
		alt_name: string;
		summary: string;
	},
	relationships: {
		default_product_variant: {
			data: BaseObjectRef,
		},
		product_variants: {
			data: BaseObjectRef[];
		};
	};
}

export interface ProductVariant extends BaseObjectRef {
	attributes: {
		price: number;
		variant: string;
		subscription_frequency: string;
	},
}

export interface State {
	userId: string;
	currentStep: Steps | null;
	isLoading: boolean;
	selectedCategoryId: Category['id'];
	contactDetails: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
	};
	selectedProductId: Product['id'];
	selectedProductVariantId: ProductVariant['id'];
	isCurrentStepValid: boolean;
	categories: {
		[id: string]: Category;
	};
	products: {
		[id: string]: Product;
	};
	productVariants: {
		[id: string]: ProductVariant;
	};
}

export enum ActionTypes {
	NEXT_STEP,
	PREVIOUS_STEP,
	SELECT_CATEGORY,
	SELECT_PRODUCT_VARIANT,
	STORE_CONTACT_DETAILS,
	SET_STEP_VALIDITY,
}

export interface Action {
	type: ActionTypes;
	// TODO: Remove `any` and use specific types!
	payload?: any;
}

export interface StoreContextType {
	state: State;
	dispatch: React.Dispatch<Action>;
}