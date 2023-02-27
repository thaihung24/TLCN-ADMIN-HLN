import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ThemeReducer from './reducers/ThemeReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userTrashListReducer,
  userDeleteReducer,
  userRestoreReducer,
  userForceReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  countProductReducers,
  productListReducer,
  productDetailReducer,
  productUpdateReducer,
  productDeleteReducer,
  productCreateReducer,
  productRestoreReducer,
  productTrashListReducer,
  productForceReducer,
  productReviewDeleteReducer,
  productReviewsReducer,
} from './reducers/productReducers'
import {
  orderListReducer,
  orderDetailReducer,
  orderPayReducer,
  confirmOrderReducer,
  updateStatusOrderReducer,
} from './reducers/orderReducer'
import {
  cardsReducer,
  topOrderReducer,
  lastOrderReducer,
} from './reducers/dashboardReducers'
// Event reducer
import {
  eventCreateReducer,
  eventGetReducer,
  eventsGetReducer,
  eventUpdateReducer,
  eventDeleteReducer,
  eventClearReducer,
} from './reducers/eventReducers'
//
import { categoryListReducer } from './reducers/categoryReducers'
import { manufacturerListReducer } from './reducers/manufacturerReducers'
import { subCategoriesReducer } from './reducers/subCategoryReducers'
import { optionReducer } from './reducers/optionReducers'
import { chatgptReducer } from './reducers/chatgptReducers'
const reducer = combineReducers({
  ThemeReducer: ThemeReducer,
  productListReducer: productListReducer,
  productUpdate: productUpdateReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  option: optionReducer,
  productRestore: productRestoreReducer,
  productTrashList: productTrashListReducer,
  productForce: productForceReducer,
  productReviewDelete: productReviewDeleteReducer,
  productReviews: productReviewsReducer,
  categoryList: categoryListReducer,
  manufacturerList: manufacturerListReducer,
  subCategoryList: subCategoriesReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userTrashList: userTrashListReducer,
  userDelete: userDeleteReducer,
  userForce: userForceReducer,
  userRestore: userRestoreReducer,
  userUpdate: userUpdateReducer,
  countProduct: countProductReducers,
  cardsReducer: cardsReducer,
  topOrder: topOrderReducer,
  lastOrder: lastOrderReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDetail: orderDetailReducer,
  confirmOrder: confirmOrderReducer,
  updateStatusOrder: updateStatusOrderReducer,
  createEvent: eventCreateReducer,
  eventList: eventsGetReducer,
  eventDetail: eventGetReducer,
  eventUpdate: eventUpdateReducer,
  // SOFT DELETE
  eventDelete: eventDeleteReducer,
  // HARD DELETE
  eventClear: eventClearReducer,
  chatGPT: chatgptReducer,
})
const optionItemsFromStorage = localStorage.getItem('optionItems')
  ? JSON.parse(localStorage.getItem('optionItems'))
  : []
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : []
const initialState = {
  option: {
    optionItems: optionItemsFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
