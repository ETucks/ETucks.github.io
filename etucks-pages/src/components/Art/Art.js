import React, { useState } from 'react';

const artSets = [
  {
    title: "Chicago Fog",
    images: [
      "/art_images/chicago_fog/cf_1.jpg",
      "/art_images/chicago_fog/cf_2.jpg",
      "/art_images/chicago_fog/cf_3.jpg",
      "/art_images/chicago_fog/cf_4.jpg",
      "/art_images/chicago_fog/cf_5.jpg",
    ]
  }
  // More sets
];

function Art() {
  const [selectedSet, setSelectedSet] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleSetClick = (set) => {
    setSelectedSet(set);
  };

  const handleImageClick = (img) => {
    console.log("Image clicked:", img);
    setEnlargedImage(img);
  };

  return (
    <div>
      <h2>Photos</h2>
      {selectedSet ? (
        <div>
          <h3>{selectedSet.title}</h3>
          <div className="image-gallery">
            {selectedSet.images.map((img, index) => (
                <img key={index} src={img} alt={`art ${index}`} onClick={() => handleImageClick(img)} />
            ))}
          </div>
          <button onClick={() => setSelectedSet(null)}>Back to Gallery</button>
        </div>
      ) : (
        <div className="set-preview-container">
          {artSets.map((set, index) => (
            <div key={index} className="set-preview" onClick={() => handleSetClick(set)}>
              <img src={set.images[0]} alt={`preview of ${set.title}`} />
              <div className="set-title-overlay">{set.title}</div>
            </div>
          ))}
        </div>
      )}

      {enlargedImage && (
        <div className="enlarged-image-modal">
          <img src={enlargedImage} alt="Enlarged art" />
          <button className="close-modal" onClick={() => setEnlargedImage(null)}>X</button>
        </div>
      )}
    </div>
  );
}

export default Art;
