import React from "react";

import { Container } from "react-bootstrap";
import Dashboard from "../pages/Dashboard";
import UserListScreen from "../pages/UserListScreen";
import LoginScreen from "../pages/LoginScreen";
import ProductListScreen from "../pages/productListScreen";
import OrderListScreen from "../pages/OrderListScreen";
import OrderScreen from "../pages/OrderScreen";
import AddProductScreen from "../pages/AddProductScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/customers" component={UserListScreen} exact />
      <Route path="/products" component={ProductListScreen} exact />
      <Route path="/products/:pageNumber" component={ProductListScreen} exact />
      <Route path="/orders" component={OrderListScreen} exact />
      <Route path="/orders/:pageNumber" component={OrderListScreen} exact />
      <Route path="/order/:id" component={OrderScreen} exact />
      <Route path="/addproduct" component={AddProductScreen} />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} exact />
        </Container>
      </main>
    </Switch>
  );
};

export default Routes;
