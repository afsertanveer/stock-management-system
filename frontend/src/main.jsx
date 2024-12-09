import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.jsx";
import AddCustomer from "./component/AddCustomer.jsx";
import DistributeToCustomer from "./component/DistributeToCustomer.jsx";
import PackageListReaderForm from "./component/PackageListReaderForm";
import ShowCustomer from "./component/ShowCustomer.jsx";
import ShowPackages from "./component/ShowPackages.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      {/* <Menu /> */}
      <BrowserRouter>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/add-pckg" element={<PackageListReaderForm />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/distribute" element={<DistributeToCustomer />} />
            <Route path="/show-customer" element={<ShowCustomer />} />
            <Route path="/show-pckgs" element={<ShowPackages />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </StrictMode>
);
