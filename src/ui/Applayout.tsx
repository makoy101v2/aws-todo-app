import { Outlet } from "react-router-dom";
import "./AppLayout/AppLayout.css"; // Create this for custom styles

import Header from "./Header";
import MenuBar from "./Menu-Bar";

function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <main className="main-content">
          <div className="container">
            <MenuBar />
            <Outlet />
          </div>
        </main>
      </div>
      <footer className="app-footer">
        <span>© {new Date().getFullYear()} TodoApp</span>
      </footer>
    </div>
  );
}

export default AppLayout;
