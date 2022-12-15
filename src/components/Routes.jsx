
import React from 'react'
import { Container } from 'react-bootstrap'
import Dashboard from '../pages/Dashboard'
import UserListScreen from '../pages/UserListScreen'
import LoginScreen from "../pages/LoginScreen"
import ProductListScreen from '../pages/productListScreen'
import OrderListScreen from '../pages/OrderListScreen'
import OrderScreen from '../pages/OrderScreen'
import ProductTrashScreen from '../pages/ProductTrashScreen'
import UserEditScreen from "../pages/UserEditScreen"
import UserTrashScreen from '../pages/UserTrashScreen'
import AnalyticsScreen from '../pages/AnalyticsScreen'
import AddProductScreens from "../pages/AddProductScreens"
import ProductEditScreen from '../pages/ProductEditScreen'
import {  Route ,Switch} from 'react-router-dom'
const Routes = () => {
    return (
        <Switch>
          <Route path='/'  component={Dashboard} exact/>
          <Route path='/analytics' component={AnalyticsScreen} exact/>
          <Route path='/customersTrash' component={UserTrashScreen} exact/>
          <Route
            path='/customersTrash/:pageNumber'
            component={UserTrashScreen}
            exact
          />
          <Route path='/customers' component={UserListScreen} exact/>
          <Route
            path='/customers/:pageNumber'
            component={UserListScreen}
            exact
          />
          <Route path='/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact />
          <Route path='/productsTrash' component={ProductTrashScreen} exact/>
          <Route
            path='/productsTrash/:pageNumber'
            component={ProductTrashScreen}
            exact
          />
           <Route path='/addproduct' component={AddProductScreens} exact/>
          <Route path='/products' component={ProductListScreen} exact/>
          <Route
            path='/products/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/orders' component={OrderListScreen} exact/>
          <Route
            path='/orders/:pageNumber'
            component={OrderListScreen}
            exact
          />

            <Route
            path='/order/:id'
            component={OrderScreen}
            exact
          />
            <main className='py-3'>
            <Container>
            <Route path='/login' component={LoginScreen} exact />
            </Container>
            </main>
        </Switch>
    )
}


export default Routes;
