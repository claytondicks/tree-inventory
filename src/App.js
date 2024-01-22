import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { Inventory } from "./pages/inventory/index";
import { PrivateRoutesLayout } from "./layouts/PrivateRoutesLayout";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" exact element={<Auth />} />


          {/* private routes */}
          <Route element={<PrivateRoutesLayout />}>
            <Route path="/inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;