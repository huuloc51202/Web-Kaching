import AboutUs from "../pages/AboutUs/AboutUs";
import CartPage from "../pages/Cartpage/CartPage";
import ClientService from "../pages/ClientService/ClientService";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductsPage from "../pages/TypeProductsPage/TypeProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeProductsPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/product-details',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/about-us',
        page: AboutUs,
        isShowHeader: true
    },
    {
        path: '/client-service',
        page: ClientService,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]