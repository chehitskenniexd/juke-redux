'use strict'
import React, { Component } from 'react';

export default class Albums extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAlbums();
  }

  render() {
    return (
      <div>
        <h3>Albums</h3>
        <div className="row">
          {
            this.props.albums
              ? this.props.albums.map((album, index) =>
                <div className="col-xs-4" key={index}>
                  <a className="thumbnail" href="#">
                    <img src={`api/albums/${album.id}/image`} />
                    <div className="caption">
                      <h5>
                        <span>{album.name}</span>
                      </h5>
                      <small>{`${album.songs.length} songs`}</small>
                    </div>
                  </a>
                </div>)
              : null
          }
        </div>
      </div>
    )
  }
}