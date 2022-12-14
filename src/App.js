import React, { useState, useEffect, useCallback } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setImsetIsLoading] = useState(true);
  const [term, setTerm] = useState("");

 const fetchImages = useCallback(() => {
  fetch(
    `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
  )
    .then((res) => res.json())
    .then((data) => {
      setImages(data.hits);
      setImsetIsLoading(false);
    })
    .catch(err => console.log(err));
 }, [term]);
 
  useEffect(() => {
    fetchImages()
  }, [fetchImages]);

  return (
  <div className="container mx-auto">
  <ImageSearch searchText={(text) => setTerm(text)}/>

  {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-3">No Images Found</h1>}

    {isLoading ? <h1 className="text-6xl text-center mx-auto mt-3">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
      {images.map(image => (
        <ImageCard key={image.id} image={image}/>
      ))}
    </div>}
  </div>
  );
}

export default App;
