import React from 'react';

interface State {
  step: string;
}

export default React.createContext<State | {}>({});
