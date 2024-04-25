import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./UI/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
