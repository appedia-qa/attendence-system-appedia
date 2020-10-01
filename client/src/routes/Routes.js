
import PageNotFound from "../pages/Empty";
import Login from "../pages/Login/index";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAddProduct from "../pages/AddEditProduct";

export const ProductPageEndPoint = "/";
export const CheckoutEndPoint = "/checkout";
export const ShopEndPoint = "/shop";

const Routes = [
  {
    path: "/login",
    name: "home",
    exact: true,
    component: Login,
  },
  {
    path: "/",
    name: "AdminDashboard",
    exact: true,
    component: AdminDashboard,
  },
  {
    path: "/product",
    name: "AdminDashboard",
    exact: true,
    component: AdminAddProduct,
  },
  {
    path: "/",
    name: "error",
    component: PageNotFound,
  },
  
];

export default Routes;
