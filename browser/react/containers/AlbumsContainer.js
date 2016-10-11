import React from 'react';
import initialState from '../initialState';
import { connect } from 'react-redux';
import Albums from '../components/Albums';

const mapStateToProps = (state = initalState, ownProps) => ({
  albums: state.albums
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadAlbums(albums) {
      dispatch({ type: 'RECEIVED_ALBUMS_FROM_SERVER', albums: albums })
    }
  }
}

const AlbumsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);

export default AlbumsContainer;


