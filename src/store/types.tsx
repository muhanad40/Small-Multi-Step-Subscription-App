export enum Steps {
	INITIAL = 'INITIAL',
	CATEGORY_SELECTION = 'CATEGORY_SELECTION',
	VARIANT_SELECTION = 'VARIANT_SELECTION',
	CONTACT_DETAILS_FORM = 'CONTACT_DETAILS_FORM',
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	THANK_YOU = 'THANK_YOU'
}

interface BaseResponseType {
	id: string;
	type: string;
	attributes: {
		name: string;
		alt_name: string;
		summary: string;
	};
	relationships: {};
}

export interface Category extends BaseResponseType {
	type: 'product_category';
	relationships: {
		products: {
			data: Product[];
		};
	};
}

export interface Product extends BaseResponseType {
	type: 'product';
	relationships: {
		product_variants: {
			data: ProductVariant[];
		};
	};
}

export interface ProductVariant extends BaseResponseType {
	type: 'product_variant';
	price: number;
	attributes: BaseResponseType['attributes'] & {
		price: number;
		variant: string;
		subscription_frequency: string;
	}
}

export interface State {
	currentStep: Steps;
	isLoading: boolean;
	selectedCategoryId: string;
	selectedProductId: string;
	selectedProductVariantId: string;
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
	NEXT_STEP = 'NEXT_STEP',
	PREVIOUS_STEP = 'PREVIOUS_STEP',
	SET_LOADING_STATUS = 'SET_LOADING_STATUS',
	STORE_CATEGORIES = 'STORE_CATEGORIES',
	STORE_PRODUCTS = 'STORE_PRODUCTS',
	STORE_PRODUCTS_VARIANTS = 'STORE_PRODUCTS_VARIANTS',
	SELECT_CATEGORY = 'SELECT_CATEGORY',
	SELECT_PRODUCT = 'SELECT_PRODUCT',
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