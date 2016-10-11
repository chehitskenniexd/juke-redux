'use strict'
// Import Redux
import { createStore } from 'redux';
import initialState from './initialState.js'

const RECEIVED_ALBUMS_FROM_SERVER = 'RECEIVED_ALBUMS_FROM_SERVER';

// Reducer function for Redux app
function reducer(prevState = initialState, action) {
    switch (action.type) {
        case RECEIVED_ALBUMS_FROM_SERVER:
            {
                return Object.assign({}, prevState, { albums: action.albums })
            }
        default:
            return prevState;
    }
}

// Initialize the store
const store = createStore(reducer, initialState);
export default store;