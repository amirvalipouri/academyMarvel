import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import "./index.scss";
export default function Landing() {
  return (
    <div className="Landing">
      <Header />
      <main className="py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
