import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./UI/Layout";
import AllUploads from "./Pages/AllUploads";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FilterStateProvider } from "./hooks/FilterState";
import PropertyDetails from "./Pages/PropertyDetails";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <FilterStateProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="/propertyDetails/:id"
                element={<PropertyDetails />}
              />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/uploads" element={<AllUploads />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </FilterStateProvider>
  );
}

export default App;
