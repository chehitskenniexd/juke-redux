'use strict'
// Import Redux
import { createStore, applyMiddleware } from 'redux';
import initialState from './initialState.js'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const RECEIVED_ALBUMS_FROM_SERVER = 'RECEIVED_ALBUMS_FROM_SERVER';

// Actions for Components
export const receivedAlbumsFromServer = albums => {
    return {type: RECEIVED_ALBUMS_FROM_SERVER, albums}
}

// Use thunkMiddleware to handle async calls 
export const fetchAlbumsFromServer = () => {
    return dispatch => {
        fetch('api/albums')
        .then(res => res.json())
        // this uses the thunkMiddleware's dispatch
        .then(albums => dispatch(receivedAlbumsFromServer(albums)))
    }
}

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
const store = createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));
export default store;