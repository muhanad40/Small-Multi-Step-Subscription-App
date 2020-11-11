import React from 'react';

import Footer from '../Footer';
import CategorySelection from '../CategorySelection';
import ProductSelection from '../ProductSelection';
import ContactDetailsForm from '../ContactDetailsForm';
import Confirmation from '../Confirmation';
import ThankYou from '../ThankYou';
import { useStoreContext } from '../../store';
import { Steps } from '../../store/types';

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

function App() {
  const { state: { currentStep } } = useStoreContext();
  const StepComponent = currentStep && stepsMap[currentStep];

  return (
    <div className="container">
      <div className="content">
        {StepComponent && <StepComponent />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
