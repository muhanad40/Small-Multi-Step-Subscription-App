export enum Steps {
	INITIAL = 'INITIAL',
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

interface BaseObject extends BaseObjectRef {
	attributes: {
		name: string;
		alt_name: string;
		summary: string;
	};
	relationships: {};
}

export interface Category extends BaseObject {
	type: 'product_category';
	relationships: {
		products: {
			data: Product[];
		};
	};
}

export interface Product extends BaseObject {
	type: 'product';
	relationships: {
		default_product_variant: {
			data: BaseObjectRef,
		},
		product_variants: {
			data: ProductVariant[];
		};
	};
}

export interface ProductVariant extends BaseObject {
	type: 'product_variant';
	price: number;
	attributes: BaseObject['attributes'] & {
		price: number;
		variant: string;
		subscription_frequency: string;
	},
}

export interface State {
	currentStep: Steps;
	isLoading: boolean;
	selectedCategoryId: string;
	contactDetails: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
	};
	selectedProductVariants: {
		[key: string]: ProductVariant['id'];
	};
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
	SET_LOADING_STATUS,
	STORE_CATEGORIES,
	STORE_PRODUCTS,
	STORE_PRODUCTS_VARIANTS,
	SELECT_CATEGORY,
	PRESELECT_PRODUCT_VARIANTS,
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