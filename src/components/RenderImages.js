import React from 'react'
import { Carousel } from 'react-bootstrap'

const RenderImage = ({ images, percent }) => {
  return (
    <Carousel pause='hover' variant='dark'>
      {images &&
        images.map((image, index) => (
          <Carousel.Item key={index}>
            {percent ? (
              <img
                className={`d-block w-${percent}`}
                src={image.urlImage}
                alt='loading'
              />
            ) : (
              <img
                className={`d-block w-100`}
                src={image.urlImage}
                alt='loading'
              />
            )}
          </Carousel.Item>
        ))}
    </Carousel>
  )
}
export default RenderImage
