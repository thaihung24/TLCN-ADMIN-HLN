import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, ListGroup, Button, Form, Alert, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import formatVNDC from '../components/formatVNDC'
import RenderImage from '../components/RenderImages'
import {
  PRODUCT_UPDATE_RESET,
  DELETE_REVIEW_RESET,
} from '../constants/productConstant'
import {
  productDetail,
  deleteReview,
  updateProduct,
  clearErrors,
} from '../actions/productActions'
import { color } from '@mui/system'

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id
  const [optionIndex, setToggleOptionIndex] = useState(0)
  const [colorIndex, setToggleColorIndex] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState('')
  const [productOptions, setProductOptions] = useState({})
  const [oldImages, setOldImages] = useState([])
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const dispatch = useDispatch()
  const { loading, error, product, reviews } = useSelector(
    (state) => state.productDetail
  )
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    product: productUpdate,
  } = useSelector((state) => state.productUpdate)
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.productReviewDelete
  )
  const AlertMessage = (status, message) => {
    return (
      <>
        <Alert key={status} variant={status}>
          {message}
        </Alert>
      </>
    )
  }
  useEffect(() => {
    if (errorUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch(productDetail(productId))
    } else {
      if (
        !product.name ||
        product._id !== productId ||
        isDeleted ||
        deleteError
      ) {
        dispatch({ type: DELETE_REVIEW_RESET })
        dispatch(clearErrors())
        dispatch(productDetail(productId))
      } else {
        setStock(product.productOptions[0].colors[0].quantity)
        setPrice(product.productOptions[0].price)
        setDescription(product.description)
        setOldImages(product.productOptions[0].colors[0].images)
        setProductOptions(JSON.parse(JSON.stringify(product.productOptions)))
        setImagesPreview(product.productOptions[0].colors[0].images)
      }
    }
  }, [
    dispatch,
    productId,
    product,
    successUpdate,
    errorUpdate,
    history,
    isDeleted,
    deleteError,
  ])
  const toggleOptionHandler = (index) => {
    setToggleOptionIndex(index)
    setToggleColorIndex(0)
    setStock(productOptions[index].colors[0].quantity)
    setPrice(productOptions[index].price)
    setImagesPreview(productOptions[index].colors[0].images)
    setOldImages(product.productOptions[index].colors[0].images)
  }
  const toggleColorHandler = (index) => {
    setToggleColorIndex(index)
    setImagesPreview(productOptions[optionIndex].colors[index].images)
    setStock(productOptions[optionIndex].colors[index].quantity)
    setOldImages(product.productOptions[optionIndex].colors[index].images)
  }
  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImagesPreview([])
    // setImages([])
    productOptions[optionIndex].colors[colorIndex].images = []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [
            ...oldArray,
            { urlImage: reader.result },
          ])
          productOptions[optionIndex].colors[colorIndex].images.push({
            urlImage: reader.result,
          })
          if (!productOptions[optionIndex].colors[colorIndex].onChange) {
            productOptions[optionIndex].colors[colorIndex].onChange = true
          }

          // setImages((oldArray) => [...oldArray, { urlImage: reader.result }])
        }
      }

      reader.readAsDataURL(file)
    })
  }
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId))
  }
  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className='btn btn-danger py-1 px-2 ml-2'
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className='fa fa-trash'></i>
          </button>
        ),
      })
    })

    return data
  }
  const setStockHandler = (value) => {
    setStock(value)
    productOptions[optionIndex].colors[colorIndex].quantity = value
  }
  const setPriceHandler = (value) => {
    setPrice(value)
    productOptions[optionIndex].price = value
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new Object()
    formData.name = product.name
    formData.description = description
    formData.productOptions = productOptions
    dispatch(updateProduct(product._id, formData))
  }
  return (
    <>
      <LinkContainer className='my-3' to='/products'>
        <Button className='btn rounded' variant='cyan'>
          Go Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : loadingUpdate ? (
        <Loader />
      ) : errorUpdate ? (
        <Message variant='danger'> {errorUpdate}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row>
            {' '}
            <Col md={8}>
              {imagesPreview && (
                <RenderImage images={imagesPreview && imagesPreview} />
              )}
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className='align-items-center'>
                    {product.productOptions &&
                      product.productOptions.map((option, index) => (
                        <>
                          <Col
                            key={index}
                            className={
                              optionIndex === index
                                ? 'list-group-item active rounded'
                                : 'list-group-item-action'
                            }
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => toggleOptionHandler(index)}
                          >
                            <b>{option.productOptionName}</b>
                          </Col>
                          {/* {optionIndex === index ? (
                            <Col>
                              <i
                                className='fa-solid fa-plus list-group-item-action'
                                style={{
                                  cursor: 'pointer',
                                }}
                              ></i>
                            </Col>
                          ) : null} */}
                        </>
                      ))}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {product.productOptions &&
                      product.productOptions[optionIndex].colors.map(
                        (color, index) => (
                          <Col
                            key={index}
                            className={
                              colorIndex === index
                                ? 'list-group-item active rounded'
                                : 'list-group-item-action'
                            }
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => toggleColorHandler(index)}
                          >
                            <h6>{color.color}</h6>
                          </Col>
                        )
                      )}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <b htmlFor='stock_field'>Stock</b>
                    </Col>
                    <Col>
                      <input
                        type='number'
                        className='form-control count d-inline'
                        value={stock}
                        onChange={(e) => setStockHandler(e.target.value)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Price : </b>
                  <input
                    type='text'
                    className='form-control count d-inline'
                    value={price}
                    onChange={(e) => setPriceHandler(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} review`}
                    color="'#f8e825'"
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5> Description :</h5>

                  <textarea
                    className='form-control'
                    id='description_field'
                    rows='4'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {/* Description : <input/> {product.description} */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <ListGroup>
              <Col md={12}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <label>Images</label>
                      </Col>
                      <Col>
                        <div className='custom-file'>
                          <input
                            type='file'
                            name='product_images'
                            className='input-group mb-3'
                            id='customFile'
                            onChange={onChange}
                            multiple
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <label
                          className='custom-file-label'
                          htmlFor='customFile'
                        >
                          Chọn ảnh thay thế
                        </label>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </ListGroup>
            {imagesPreview.length > 0 && (
              <ListGroup>
                <Col md={12}>
                  <Row>
                    {imagesPreview.map((img, index) => (
                      <img
                        src={img.urlImage}
                        key={index}
                        alt='Images Preview'
                        className='d-block w-25'
                      />
                    ))}
                    {/* <RenderImage images={imagesPreview} percent={50} /> */}
                    {/* <Carousel pause='hover'>
                {imagesPreview &&
                  imagesPreview.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className='d-block w-100'
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel> */}
                  </Row>
                </Col>
              </ListGroup>
            )}
            {/* <ListGroup>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </ListGroup> */}
            <ListGroup>
              <Col md={12}>
                <ListGroup.Item>
                  {reviews && reviews.length > 0 ? (
                    <MDBDataTable
                      data={setReviews()}
                      className='px-3'
                      bordered
                      striped
                      hover
                    />
                  ) : (
                    <p className='mt-5 text-center'>No Reviews.</p>
                  )}
                </ListGroup.Item>
              </Col>
            </ListGroup>
          </Row>
          <Row>
            <ListGroup>
              <Col md={12}>
                <ListGroup.Item className='d-grid'>
                  <Button type='submit' variant='cyan' className='btn rounded'>
                    UPDATE
                  </Button>
                </ListGroup.Item>
              </Col>
            </ListGroup>
          </Row>
        </Form>
      )}
    </>
  )
}

export default ProductEditScreen
