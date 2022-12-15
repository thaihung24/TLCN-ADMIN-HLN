import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'

import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import formatVNDC from '../components/formatVNDC'
import RenderImage from '../components/RenderImages'
import { getCategories } from '../actions/categoryActions'
import { getManufactures } from '../actions/manufacturerActions'
import { getSubByIdCategories } from '../actions/subCategoryActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
import { OPTION_ADD_ITEM_RESET } from '../constants/optionsConstants'
import { addToOption } from '../actions/optionActions'
import { createProduct } from '../actions/productActions'
import { color } from '@mui/system'

const AddProductScreens = ({ history, match, location }) => {
  const [optionIndex, setOptionIndex] = useState(0)
  const [toggleOption, setToggleOption] = useState(false)
  const [option, setOption] = useState('')

  const [colorIndex, setColorIndex] = useState(0)
  const [toggleColor, setToggleColor] = useState(false)
  const [color, setColor] = useState('')
  const [promotion, setPromotion] = useState(0)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(1)
  const [stock, setStock] = useState(1)
  const [description, setDescription] = useState('')
  const [oldImages, setOldImages] = useState([])
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [manufactureId, setManufactureId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const { optionItems } = useSelector((state) => state.option)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = useSelector((state) => state.productCreate)
  const { categories, loading, error } = useSelector(
    (state) => state.categoryList
  )
  const {
    manufacturers,
    loading: loadingManufacturer,
    error: errorManufacturer,
  } = useSelector((state) => state.manufacturerList)
  const {
    subCategories,
    loading: loadingSub,
    error: errorSub,
  } = useSelector((state) => state.subCategoryList)

  const dispatch = useDispatch()

  useEffect(() => {
    if (errorCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
    dispatch(getSubByIdCategories(categoryId))
    if (categories.length === 0) {
      dispatch(getCategories())
    }
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      dispatch({ type: OPTION_ADD_ITEM_RESET })
      history.push('/products')
    }
    if (manufacturers.length === 0) {
      dispatch(getManufactures())
    }
  }, [dispatch, success, errorCreate, categoryId])
  const toggleOptionHandler = (index) => {
    setOptionIndex(index)
    setColorIndex(0)
    if (optionItems[index] && optionItems[index].colors.length > 0) {
      setStock(optionItems[index].colors[0].quantity)
      setImagesPreview(optionItems[index].colors[0].images)
    } else {
      setStock(1)
      setImagesPreview([])
    }
    setPrice(optionItems[index] ? optionItems[index].price : 1)
  }
  const toggleColorHandler = (index) => {
    setColorIndex(index)
    setImagesPreview(
      optionItems[optionIndex].colors[index]
        ? optionItems[optionIndex].colors[index].images
        : []
    )
    setStock(
      optionItems[optionIndex].colors[index]
        ? optionItems[optionIndex].colors[index].quantity
        : 1
    )
  }
  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImagesPreview([])
    setImages([])
    if (optionItems[optionIndex].colors[colorIndex].images) {
      optionItems[optionIndex].colors[colorIndex].images = []

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((oldArray) => [
              ...oldArray,
              { urlImage: reader.result },
            ])
            optionItems[optionIndex].colors[colorIndex].images.push({
              urlImage: reader.result,
            })

            setImages((oldArray) => [...oldArray, { urlImage: reader.result }])
          }
        }
        dispatch(addToOption(optionItems))
        reader.readAsDataURL(file)
      })
    }
    // productOptions[optionIndex].colors[colorIndex].images = []
  }
  const optionClickHandler = () => {
    optionItems.push({
      productOptionName: option,
      price: price,
      promotion: promotion,
      colors: [],
    })
    dispatch(addToOption(optionItems))
    setToggleOption(false)
  }
  const deleteOptionHandler = (index) => {
    if (optionItems.length === 1) {
      setToggleColor(false)
      setColor('')
    }
    optionItems.splice(index, 1)
    dispatch(addToOption(optionItems))
  }
  const colorClickHandler = () => {
    optionItems[optionIndex].colors.push({
      color: color,
      quantity: stock,
      images: [],
    })
    dispatch(addToOption(optionItems))
    setToggleColor(false)
  }
  const deleteColorHandler = () => {
    optionItems[optionIndex].colors.splice(colorIndex, 1)

    dispatch(addToOption(optionItems))
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new Object()
    formData.name = name
    formData.manufacturer = manufactureId
    formData.subCategory = subCategoryId
    formData.description = description
    formData.productOptions = optionItems
    dispatch(createProduct(formData))
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
      ) : loadingManufacturer ? (
        <Loader />
      ) : errorManufacturer ? (
        <Message variant='danger'>{errorManufacturer}</Message>
      ) : loadingCreate ? (
        <Loader />
      ) : errorCreate ? (
        <Message variant='danger'>{errorCreate}</Message>
      ) : (
        <>
          <Form onSubmit={submitHandler}>
            <ListGroup>
              <Row className='align-items-center'>
                <Col>
                  <ListGroup.Item>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      required
                      onChange={(e) => setManufactureId(e.target.value)}
                    >
                      <option>menu Manufacturer</option>
                      {manufacturers &&
                        manufacturers.map((manufacturers, index) => (
                          <option
                            key={index}
                            name='manufacturerId'
                            value={manufacturers._id}
                          >
                            {manufacturers.name}
                          </option>
                        ))}
                    </select>
                  </ListGroup.Item>
                </Col>
                <Col>
                  {' '}
                  <ListGroup.Item>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option> menu Category</option>
                      {categories &&
                        categories.map((categories, index) => (
                          <option key={index} value={categories._id}>
                            {categories.name}
                          </option>
                        ))}
                    </select>
                  </ListGroup.Item>
                </Col>
                {loadingSub ? (
                  <Loader />
                ) : errorSub ? (
                  <Message variant='danger'>{errorSub}</Message>
                ) : (
                  <Col>
                    <ListGroup.Item>
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => setSubCategoryId(e.target.value)}
                      >
                        <option> menu SubCategory</option>
                        {subCategories &&
                          subCategories.map((subCategory, index) => (
                            <option key={index} value={subCategory._id}>
                              {subCategory.name}
                            </option>
                          ))}
                      </select>
                    </ListGroup.Item>
                  </Col>
                )}
              </Row>
            </ListGroup>
            <ListGroup>
              <Row className='align-items-center'>
                <Col md={8}>
                  {imagesPreview && (
                    <RenderImage images={imagesPreview && imagesPreview} />
                  )}
                </Col>
                <Col md={4}>
                  <ListGroup.Item>
                    <b htmlFor='name_field'>Name:</b>
                    <textarea
                      type='text'
                      className='form-control count d-inline h3'
                      placeholder='Edit here'
                      style={{
                        fontSize: 'alc(1.275rem + .3vw)',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></textarea>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className='align-items-center'>
                      <Col md={4}>
                        {' '}
                        <b>Options:</b>
                      </Col>
                      {toggleOption ? (
                        <>
                          {' '}
                          <Col>
                            <input
                              type='text'
                              className='form-control count d-inline'
                              placeholder='Edit here'
                              value={option}
                              onChange={(e) => setOption(e.target.value)}
                            />
                          </Col>
                          <Col md={2}>
                            <i
                              className='fa-solid fa-check list-group-item-action rounded-4'
                              style={{ cursor: 'pointer' }}
                              onClick={() => optionClickHandler()}
                            ></i>
                          </Col>
                        </>
                      ) : null}
                    </Row>

                    <Row className='align-items-center'>
                      {optionItems &&
                        optionItems.map((option, index) => (
                          <>
                            <Col
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
                            {optionIndex === index ? (
                              <Col
                                md={1}
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => deleteOptionHandler(optionIndex)}
                              >
                                <i className='fa-solid fa-xmark '></i>
                              </Col>
                            ) : null}
                          </>
                        ))}
                      <Col md={2}>
                        <i
                          className='fa-solid fa-plus list-group-item-action rounded-4'
                          style={{ cursor: 'pointer' }}
                          onClick={() => setToggleOption(!toggleOption)}
                        ></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        {' '}
                        <b>Colors:</b>
                      </Col>
                      {toggleColor === true ? (
                        <>
                          {' '}
                          <Col>
                            <input
                              type='text'
                              className='form-control count d-inline'
                              placeholder='Edit here'
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                            />
                          </Col>
                          <Col md={2}>
                            <i
                              className='fa-solid fa-check list-group-item-action rounded-4'
                              style={{ cursor: 'pointer' }}
                              onClick={() => colorClickHandler()}
                            ></i>
                          </Col>
                        </>
                      ) : null}
                    </Row>

                    <Row className='align-items-center'>
                      {optionItems[optionIndex] &&
                        optionItems[optionIndex].colors.map((color, index) => (
                          <>
                            <Col
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
                              <b>{color.color}</b>
                            </Col>
                            {colorIndex === index ? (
                              <Col
                                md={1}
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => deleteColorHandler()}
                              >
                                <i className='fa-solid fa-xmark '></i>
                              </Col>
                            ) : null}
                          </>
                        ))}
                      {optionItems.length > 0 ? (
                        <Col md={2}>
                          <i
                            className='fa-solid fa-plus list-group-item-action rounded-4'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setToggleColor(!toggleColor)}
                          ></i>
                        </Col>
                      ) : null}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className='align-items-center'>
                      <Col md={4}>
                        <b htmlFor='stock_field'>Stock</b>
                      </Col>
                      <Col>
                        <input
                          type='number'
                          className='form-control count d-inline'
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className='align-items-center'>
                      <Col md={4}>
                        <b htmlFor='price_field'>Price:</b>
                      </Col>
                      <Col>
                        <input
                          type='number'
                          className='form-control count d-inline'
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h5> Description :</h5>
                    <textarea
                      className='form-control'
                      id='description_field'
                      placeholder='Edit here'
                      rows='4'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {/* Description : <input/> {product.description} */}
                  </ListGroup.Item>
                </Col>
              </Row>
            </ListGroup>
            <ListGroup>
              <Row>
                <Col md={12}>
                  <ListGroup>
                    <ListGroup.Item>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <b>Images</b>
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
                          <b className='custom-file-label' htmlFor='customFile'>
                            Chọn ảnh thay thế
                          </b>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </ListGroup>
            {imagesPreview.length > 0 && (
              <ListGroup>
                <Col md={12}>
                  <Row className='align-items-center'>
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
            <Row>
              <ListGroup>
                <Col md={12}>
                  <ListGroup.Item className='d-grid'>
                    <Button
                      type='submit'
                      variant='cyan'
                      className='btn rounded'
                    >
                      Add Product
                    </Button>
                  </ListGroup.Item>
                </Col>
              </ListGroup>
            </Row>
          </Form>
        </>
      )}
    </>
  )
}

export default AddProductScreens
