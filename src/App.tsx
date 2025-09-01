import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import "@/styles/index.css";
import Header from "@/core/Templates/Header";
import Footer from "@/core/Templates/Footer/index";
import ScrollToTop from "@/core/utils/ScrollToTop";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div className="flex flex-col min-h-screen bg-lightning-yellow">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">{routing}</main>
      <Footer />
    </div>
  );
};

export default App;
