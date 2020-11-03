export enum Steps {
	INITIAL = 'INITIAL',
	CATEGORY_SELECTION = 'CATEGORY_SELECTION',
	VARIANT_SELECTION = 'VARIANT_SELECTION',
	CONTACT_DETAILS_FORM = 'CONTACT_DETAILS_FORM',
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	THANK_YOU = 'THANK_YOU'
}

export interface Category {
	id: string;
	type: 'product_category';
	attributes: {
		name: string;
	};
}

export interface Product {
	id: string;
	type: 'product';
}

export interface ProductVariant {
	id: string;
	type: 'product_variant';
}

export interface State {
	currentStep: Steps;
	isLoading: boolean;
	selectedCategoryId: string | null;
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
	NEXT_STEP = 'NEXT_STEP',
	SET_LOADING_STATUS = 'SET_LOADING_STATUS',
	STORE_CATEGORIES = 'STORE_CATEGORIES',
	STORE_PRODUCTS = 'STORE_PRODUCTS',
	STORE_PRODUCTS_VARIANTS = 'STORE_PRODUCTS_VARIANTS',
	SET_CATEGORY = 'SET_CATEGORY',
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