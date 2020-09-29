import Overview from "./../pages/Overview";
import ProductPage from "../pages/Product/index";
import PageNotFound from "../pages/Empty";
import Login from "../pages/Login/index";
import ForgotPassword from "../pages/ForgetPassword/index";
import ResetPassword from "../pages/ResetPassword/index";
import Signup from "../pages/Signup/index";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ContactUS from "../pages/ContactUS";
import AboutUs from "../pages/AboutUs";
import SearchResult from "../pages/Search";
import AdminPanel from "../pages/Admin";
import Cart from "../pages/Checkout/Cart/Cart";
import Services from "../pages/OurServices";
import categories from "../pages/categories";
import paymentSuccess from "../components/paymentSucess";
import paymentError from "../components/paymentError";

export const ProductPageEndPoint = "/";
export const CheckoutEndPoint = "/checkout";
export const ShopEndPoint = "/shop";

const Routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/payment-success",
    name: "paymentSuccess",
    exact: true,
    component: paymentSuccess,
  },
  {
    path: "/payment-error",
    name: "paymentError",
    exact: true,
    component: paymentError,
  },
  {
    path: "/Contact-us",
    name: "ContactUS",
    exact: true,
    component: ContactUS,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    exact: true,
    component: AboutUs,
  },
  {
    path: "/home",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/admin/account-details",
    name: "AccountDetails",
    exact: true,
    component: AdminPanel,
  },
  {
    path: "/admin/my-order",
    name: "MyOrders",
    exact: true,
    component: AdminPanel,
  },
  {
    path: "/admin/my-favorites",
    name: "MyFavorites",
    exact: true,
    component: AdminPanel,
  },
  {
    path: "/admin/my-cards",
    name: "MyCards",
    exact: true,
    component: AdminPanel,
  },
  {
    path: "/login",
    name: "login",
    exact: true,
    component: Login,
  },
  {
    path: "/ForgetPassword",
    name: "forgetPassword",
    exact: true,
    component: ForgotPassword,
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    exact: true,
    component: ResetPassword,
  },
  {
    path: "/admin",
    name: "admin",
    exact: true,
    component: AdminPanel,
  },
  {
    path: "/categories/:id",
    name: "Gardening-needs",
    exact: true,
    component: categories,
  },
  {
    path: "/categories/:id",
    name: "Accessoires",
    exact: true,
    component: categories,
  },
  {
    path: "/categories/:id",
    name: "outDoor",
    exact: true,
    component: categories,
  },
  {
    path: "/categories/:id",
    name: "indoor-plants",
    exact: true,
    component: categories,
  },
  {
    path: "/signup",
    name: "signup",
    exact: true,
    component: Signup,
  },
  {
    path: "/products/:id",
    name: "products",
    exact: true,
    component: Home,
  },
  {
    path: CheckoutEndPoint,
    name: "checkout",
    exact: true,
    component: Checkout,
  },
  {
    path: "/shops/:id",
    name: "shop",
    exact: true,
    component: Shop,
  },
  {
    path: "/our-services",
    name: "services",
    exact: true,
    component: Services,
  },
  {
    path: "/search",
    name: "search",
    exact: true,
    component: SearchResult,
  },
  {
    path: "/cart",
    name: "cart",
    exact: true,
    component: Cart,
  },
  {
    path: "/",
    name: "error",
    component: PageNotFound,
  },
];

export default Routes;
