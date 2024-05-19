import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./UI/Layout";
import AllUploads from "./Pages/AllUploads";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/uploads" element={<AllUploads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
