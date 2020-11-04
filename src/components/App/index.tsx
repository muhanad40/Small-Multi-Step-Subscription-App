import React, { useEffect, useCallback } from 'react';

import Footer from '../Footer';
import CategorySelection from '../CategorySelection';
import ProductSelection from '../ProductSelection';
import ContactDetailsForm from '../ContactDetailsForm';
import Confirmation from '../Confirmation';
import ThankYou from '../ThankYou';
import { useStoreContext } from '../../store';
import {
  Steps,
  Category,
  Product,
  ProductVariant,
  ActionTypes,
  State,
} from '../../store/types';

type StepsMapType = {
  [key in Steps]: () => JSX.Element;
}

const stepsMap: StepsMapType = {
  [Steps.CATEGORY_SELECTION]: CategorySelection,
  [Steps.VARIANT_SELECTION]: ProductSelection,
  [Steps.CONTACT_DETAILS_FORM]: ContactDetailsForm,
  [Steps.ORDER_SUMMARY]: Confirmation,
  [Steps.THANK_YOU]: ThankYou,
}

interface FetchResponse {
	data: Category[];
	included: (Product | ProductVariant)[];
}

function App() {
  const { state: {
    currentStep,
    isLoading,
  }, dispatch } = useStoreContext();
  const StepComponent = currentStep && stepsMap[currentStep];
  const fetchData = useCallback(() => {
		return fetch('https://testapi.numan.com/v1/product_categories')
			.then(res => res.json());
  }, []);
  const generateRandomUserId = useCallback(() => {
    return Math.floor(Math.random() * Date.now());
  }, []);

  // Generate random user ID and store once
  useEffect(() => {
    dispatch({
      type: ActionTypes.STORE_USER_ID,
      payload: generateRandomUserId(),
    });
  }, [dispatch, generateRandomUserId]);

  // Fetch data on initial render
	useEffect(() => {
		fetchData()
			.then(({ data, included }: FetchResponse) => {
        const categories: State['categories'] = {};
				const products: State['products'] = {};
				const productsVariants: State['productVariants'] = {};

        // Prepare data
        data.forEach((category: Category) => {
          categories[category.id] = category;
        });

        included.forEach((item) => {
          if (item.type === 'product') {
            products[item.id] = item;
          } else if (item.type === 'product_variant') {
            productsVariants[item.id] = item;
          }
        });

				// Store categories
				dispatch({
					type: ActionTypes.STORE_CATEGORIES,
					payload: categories,
        });

				// Store products
				dispatch({
					type: ActionTypes.STORE_PRODUCTS,
					payload: products,
				});

				// Store products
				dispatch({
					type: ActionTypes.STORE_PRODUCTS_VARIANTS,
					payload: productsVariants,
				});

				// Set loading state to false
				dispatch({
					type: ActionTypes.SET_LOADING_STATUS,
					payload: false,
				});
			});
	}, [dispatch, fetchData]);

  return (
    <div className="container">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 105 20">
          <path d="M73.637 14.187a4.252 4.252 0 11-.022-8.504c2.349-.006 4.207 1.893 4.213 4.241.006 2.349-2.044 4.258-4.19 4.263zM83.651.542h-5.73a.336.336 0 00-.321.323l.002.614c0 .109-.122.16-.21.096C76.012.572 74.386.01 72.408.016 67.36.016 63.3 4.635 63.3 9.988c0 5.678 4.222 9.919 9.109 9.919 1.931 0 3.538-.512 4.98-1.58a.129.129 0 01.208.098v.602c0 .168.153.31.32.309h5.74c.168 0 .32-.155.32-.323V.863a.34.34 0 00-.326-.321zM11.658 12.594V8.11c0-1.347-1.186-2.438-2.642-2.438-1.455 0-2.653 1.091-2.653 2.438v10.9a.325.325 0 01-.32.323H.342c-.181 0-.342-.155-.341-.322V7.452C0 2.871 3.95.02 9.011.02l.011-.005C14.084.015 18 2.867 18 7.447v4.306c0 1.346 1.137 2.438 2.592 2.438s2.681-1.092 2.681-2.438V.89c0-.167.141-.348.322-.346h5.711c.181 0 .32.18.32.346v11.7c0 4.58-3.917 7.407-8.978 7.407l-.01.004c-5.063 0-8.98-2.827-8.98-7.406zM97.156.008c5.153 0 7.155 3.765 7.155 7.282v11.673c0 .168-.105.37-.273.37h-5.739c-.167 0-.35-.155-.351-.322V9.352c0-1.32-.133-2.14-.544-2.69-.537-.736-1.418-1.055-2.216-.99-2.348.196-2.508 2.312-2.508 3.722-.006.061 0 9.617 0 9.617 0 .168-.119.322-.287.322h-5.787a.336.336 0 01-.32-.322V.863a.33.33 0 01.317-.321h5.728a.33.33 0 01.317.32l.002.842c0 .12.145.158.218.085A6.03 6.03 0 0197.156.01zM48.288 2.647a.118.118 0 01-.193-.017C47.76 2.04 46.327 0 42.782 0c-1.816 0-3.404.751-4.317 1.81-.07.08-.21.043-.21-.093L38.252.89c0-.168-.153-.347-.32-.347H32.26c-.168 0-.323.18-.323.347v18.124a.334.334 0 00.322.32h5.719a.333.333 0 00.32-.32s-.005-9.57 0-9.63c.008-1.431.182-3.527 2.53-3.722.798-.066 1.679.254 2.216.989.41.551.544 1.371.544 2.69v9.672a.335.335 0 00.322.322h5.721a.333.333 0 00.32-.322V9.384c0-1.59.132-3.524 2.48-3.719.797-.066 1.678.254 2.215.989.411.551.544 1.371.544 2.69v9.68c0 .168.153.31.321.31h5.724a.336.336 0 00.32-.325V7.232c0-4.835-3.74-7.232-7.573-7.232-2.832 0-4.629 1.385-5.695 2.647z"></path>
        </svg>

        <div className="content">
          {isLoading
            ? (
              <h1 data-testid="loading-txt">Loading...</h1>
            )
            : (
              <>
                {StepComponent && <StepComponent />}
                <Footer />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
