import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import AuthPage from "./shop/auth/AuthPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./shop/auth/fetchApi";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Auth - entry point */}
        <Route exact path="/auth" component={AuthPage} />

        {/* Redirect root to /auth if not logged in */}
        <Route exact path="/" render={() =>
          isAuthenticate() ? <Home /> : <Redirect to="/auth" />
        } />

        {/* Shop & Public Routes */}
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products/category/:catId" component={ProductByCategory} />
        <CartProtectedRoute exact={true} path="/checkout" component={CheckoutPage} />

        {/* Admin Routes */}
        <AdminProtectedRoute exact={true} path="/admin/dashboard" component={DashboardAdmin} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/categories" component={Categories} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/products" component={Products} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/orders" component={Orders} />

        {/* User Dashboard */}
        <ProtectedRoute exact={true} path="/user/profile" component={UserProfile} />
        <ProtectedRoute exact={true} path="/user/orders" component={UserOrders} />
        <ProtectedRoute exact={true} path="/user/setting" component={SettingUser} />

        {/* 404 */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
