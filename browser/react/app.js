'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import ReduxStore from './redux.js'

ReactDOM.render(
  <AppContainer />, 
  document.getElementById('app')
);