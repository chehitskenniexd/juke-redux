import React from 'react';
import initialState from '../initialState';
import { connect } from 'react-redux';
import Albums from '../components/Albums';
import { fetchAlbumsFromServer } from '../redux';

const mapStateToProps = (state = initalState, ownProps) => ({
  albums: state.albums
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadAlbums: () => dispatch(fetchAlbumsFromServer())
  }
}

const AlbumsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);

export default AlbumsContainer;


