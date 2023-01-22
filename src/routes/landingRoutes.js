import Home from "../pages/Landing/Home";
import Blog from "../pages/Landing/Blog";
import BlogDetail from "../pages/Landing/BlogDetail";
import FreeTutorials from "../pages/Landing/FreeTutorials";
import FreeTutorialsVideos from "../pages/Landing/FreeTutorials/Videos";
import FreeTutorial from "../pages/Landing/FreeTutorial";
import Products from "../pages/UsersPanel/Products";
import Product from "../pages/UsersPanel/Product";
import Cart from "../pages/UsersPanel/Cart";
import { Container } from "react-bootstrap";
const landingRoutes = (isLogged = false) =>
  [
    { path: "", element: <Home /> },
    { path: "blog", element: <Blog /> },
    { path: "blog/:id", element: <BlogDetail /> },
    { path: "free-tutorials", element: <FreeTutorials /> },
    { path: "free-tutorials/:categoryId", element: <FreeTutorialsVideos /> },
    { path: "free-tutorials/:categoryId/:id", element: <FreeTutorial /> },
    !isLogged && {
      path: "products",
      element: (
        <Container>
          <Products />
        </Container>
      ),
    },
    !isLogged && {
      path: "products/:id",
      element: (
        <Container>
          <Product />
        </Container>
      ),
    },
    !isLogged && {
      path: "cart",
      element: (
        <Container>
          <Cart />
        </Container>
      ),
    },
  ].filter(Boolean);
export default landingRoutes;
