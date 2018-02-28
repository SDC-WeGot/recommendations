import React from 'react';

class PhotoCarousel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      photoIndex: 0,
    }
  }

  nextPhoto(){
    // console.log('next photo please');
    var numPhotos = this.props.photos.length;
    var newIndex = (this.state.photoIndex + 1) % numPhotos;
    this.setState({ photoIndex: newIndex })
                    // () => console.log(this.state.photoIndex) );
  }
  prevPhoto(){
    // console.log('prev photo please');
    var numPhotos = this.props.photos.length;
    var newIndex = (this.state.photoIndex - 1 + numPhotos) % numPhotos;
    this.setState({ photoIndex: newIndex })
                    // () => console.log(this.state.photoIndex) );
  }

  render(){
    return(
      <div className="photo-carousel">
        <img src={this.props.photos[this.state.photoIndex]} className="restaurant-photos"></img>
        <button className="arrow-left" onClick={this.prevPhoto.bind(this)}>&#10094;</button>
        <button className="arrow-right" onClick={this.nextPhoto.bind(this)}>&#10095;</button>
      </div>
    )
  }
}

export default PhotoCarousel;
