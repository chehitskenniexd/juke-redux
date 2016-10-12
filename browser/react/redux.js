'use strict'
// Import Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import initialState from './initialState.js'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import AUDIO from './audio';

const RECEIVED_ALBUMS_FROM_SERVER = 'RECEIVED_ALBUMS_FROM_SERVER';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';

// Actions for Components
export const receivedAlbumsFromServer = albums => {
    return { type: RECEIVED_ALBUMS_FROM_SERVER, albums }
}
export const setCurrentAlbum = album => {
    return dispatch => {
        fetch(`api/albums/${album.id}`)
        .then(res => res.json())
        .then(album => dispatch({
            type: SET_CURRENT_ALBUM,
            album: album
        }))
    }
}

export const setCurrentSong = (currentSong, currentSongList) => ({
    type: SET_CURRENT_SONG,
    currentSong,
    currentSongList
})
export const startPlaying = () => {
    return { type: START_PLAYING }
}
export const stopPlaying = () => {
    return { type: STOP_PLAYING }
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

//song async functionality
export const playSong = () => dispatch => {
    AUDIO.play()
    dispatch(startPlaying());
}
export const pauseSong = () => dispatch => {
    AUDIO.pause()
    dispatch(stopPlaying());
}
export const load = () => (dispatch, getState) => {
    const { currentSong } = getState();
    AUDIO.src = `api/songs/${currentSong.id}/audio`;
    AUDIO.load();
    dispatch(playSong());
    //dispatch(setCurrentSong(currentSong, currentSongList));
}
export const toggle = () => (dispatch, getState) => {
    const {isPlaying} = getState();
    if (isPlaying) {
        dispatch(pauseSong());
    } else {
        dispatch(playSong());
    }
}
export const toggleOne = (selectedSong, selectedSongList) =>
    (dispatch, getState) => {
        const { currentSong } = getState();
        if (selectedSong.id !== currentSong.id) {
            dispatch(setCurrentSong(selectedSong, selectedSongList))
            dispatch(load());
        } else {
            dispatch(toggle());
        }
    }

export const selectAlbum = (selectedAlbum) => (dispatch, getState) => {
    //const album = getState().album
    const {album} = getState();
    if(album.id !== selectAlbum.id) {
        dispatch(setCurrentAlbum(selectAlbum))
    }
}

// Reducer function for Redux app
function albumReducer(prevState = {}, action) {
    switch (action.type) {
        case SET_CURRENT_ALBUM:
            {
                return action.album
            }
        default:
            return prevState;
    }
}

function albumsReducer(prevState = [], action) {
    switch (action.type) {
        case RECEIVED_ALBUMS_FROM_SERVER:
            {
                return [...prevState].concat(action.albums)
            }
        default:
            return prevState;
    }
}

function isPlayingReducer(prevState = false, action) {
    switch (action.type) {
        case START_PLAYING: return true
        case STOP_PLAYING: return false
        default: return prevState;
    }
}
function currentSongReducer(prevState = {}, action) {
    switch (action.type) {
        case SET_CURRENT_SONG: {
            return action.currentSong
        }
        default: return prevState;
    }
}
function currentSongListReducer(prevState = [], action) {
    switch (action.type) {
        case SET_CURRENT_SONG: {
            return action.currentSongList
        }
        default: return prevState;
    }
}

const rootReducer = combineReducers({
    album: albumReducer,
    albums: albumsReducer,
    isPlaying: isPlayingReducer,
    currentSong: currentSongReducer,
    currentSongList: currentSongListReducer
})



// Initialize the store
const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));
export default store;