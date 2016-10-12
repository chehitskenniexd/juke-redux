import React from 'react';
import initialState from '../initialState';
import { connect } from 'react-redux';
import Albums from '../components/Albums';
import { fetchAlbumsFromServer, setCurrentAlbum } from '../redux';

const mapStateToProps = (state = initalState, ownProps) => ({
  album: state.album,
  albums: state.albums
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadAlbums: () => dispatch(fetchAlbumsFromServer()),
    setCurrentAlbum: album => dispatch(setCurrentAlbum(album))
  }
}

const AlbumsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);

export default AlbumsContainer;


