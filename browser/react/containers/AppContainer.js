'use strict';

import React, { Component } from 'react';

import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Album from '../components/Album';
import Player from '../components/Player';
import AlbumsContainer from './AlbumsContainer';
import { connect } from 'react-redux';
import { toggle, toggleOne } from '../redux'

const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

const convertAlbum = album => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

const mod = (num, m) =>((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (album) {
    this.setState({ album });
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  seek (decimal) {
    AUDIO.currentTime = AUDIO.duration * decimal;
    this.setProgress(AUDIO.currentTime / AUDIO.duration);
  }

  setProgress (progress) {
    this.setState({ progress });
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar />
        </div>
        <div className="col-xs-10">
          <AlbumsContainer />
          <Album
            album={this.props.album}
            currentSong={this.props.currentSong}
            isPlaying={this.props.isPlaying}
            toggle={this.props.toggleOne}
          />
        </div>
        <Player
          currentSong={this.props.currentSong}
          currentSongList={this.props.currentSongList}
          isPlaying={this.props.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.props.toggle}
          scrub={evt => this.seek(evt.nativeEvent.offsetX / evt.target.clientWidth)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state = initialState) => ({
    album: state.album,
    currentSong: state.currentSong,
    currentSongList: state.currentSongList,
    isPlaying: state.isPlaying
})

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => dispatch(toggle()),
        toggleOne: (song, list) => dispatch(toggleOne(song,list))
    }
}

const newAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

export default newAppContainer;