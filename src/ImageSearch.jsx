import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSearch = ({className, random}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const searchTerm = random;
    const apiKey = 'cca64ccba7019df62dbc0a3fe313dfb7';
    const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&per_page=1&format=json&nojsoncallback=1`;

    axios.get(apiUrl)
      .then(response => {
        const photo = response.data.photos.photo[0];
        const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        setImageUrl(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, [random]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Flickr Image Result"  className="airport-image" />}
    </div>
  );
};

export default ImageSearch;