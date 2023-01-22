import { Navigate } from "react-router";
import Courses from "../pages/AdminPanel/Courses";
import Course from "../pages/AdminPanel/Course";
import Sessions from "../pages/AdminPanel/Sessions";
import Session from "../pages/AdminPanel/Session";
import Users from "../pages/AdminPanel/Users";
import User from "../pages/AdminPanel/User";
import Exams from "../pages/AdminPanel/Exams";
import Exam from "../pages/AdminPanel/Exam";
import Intervals from "../pages/AdminPanel/Intervals";
import Interval from "../pages/AdminPanel/Interval";
import Blogs from "../pages/AdminPanel/Blogs";
import Blog from "../pages/AdminPanel/Blog";
import FreeTutorials from "../pages/AdminPanel/FreeTutorials";
import FreeTutorial from "../pages/AdminPanel/FreeTutorial";
import Categories from "../pages/AdminPanel/Categories";
import Category from "../pages/AdminPanel/Category";
import Notifications from "../pages/AdminPanel/Notifications";
import Notification from "../pages/AdminPanel/Notification";
import Products from "../pages/AdminPanel/Products";
import Product from "../pages/AdminPanel/Product";
import SenderInfo from "../pages/AdminPanel/SenderInfo";
import Wallet from "../pages/AdminPanel/Wallet";
import Vouchers from "../pages/AdminPanel/Vouchers";
import Voucher from "../pages/AdminPanel/Voucher";
import Purchases from "../pages/AdminPanel/Purchases";
import Purchase from "../pages/AdminPanel/Purchase";
import ShippingInfo from "../pages/AdminPanel/ShippingInfo";
import RefillProduct from "../pages/AdminPanel/RefillProduct";
const adminRoutes = [
  { path: "", element: <Navigate to="courses" replace /> },
  { path: "courses", element: <Courses /> },
  { path: "courses/:courseId", element: <Course /> },
  { path: "sessions", element: <Sessions /> },
  { path: "sessions/:sessionId", element: <Session /> },
  { path: "exams", element: <Exams /> },
  { path: "exams/:examId", element: <Exam /> },
  { path: "intervals", element: <Intervals /> },
  { path: "intervals/:intervalId", element: <Interval /> },
  { path: "blogs", element: <Blogs /> },
  { path: "categories", element: <Categories /> },
  { path: "categories/:id", element: <Category /> },
  { path: "free-tutorials", element: <FreeTutorials /> },
  { path: "free-tutorials/:id", element: <FreeTutorial /> },
  { path: "blogs/:blogId", element: <Blog /> },
  { path: "users", element: <Users /> },
  { path: "users/:userId", element: <User /> },
  { path: "notifications", element: <Notifications /> },
  { path: "notifications/:id", element: <Notification /> },
  { path: "products", element: <Products /> },
  { path: "products/:id", element: <Product /> },
  { path: "products/:id/refill", element: <RefillProduct /> },
  { path: "sender-info", element: <SenderInfo /> },
  { path: "wallet", element: <Wallet /> },
  { path: "vouchers", element: <Vouchers /> },
  { path: "vouchers/:id", element: <Voucher /> },
  { path: "purchases", element: <Purchases /> },
  { path: "purchases/:id", element: <Purchase /> },
  { path: "shipping-info", element: <ShippingInfo /> },
];
export default adminRoutes;
