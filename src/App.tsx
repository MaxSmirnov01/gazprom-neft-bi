import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import Main from './components/Main';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <Main />
    </Theme>
  );
};

export default App;
