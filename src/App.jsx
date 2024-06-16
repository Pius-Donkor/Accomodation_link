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
import User from "./Pages/User";
import MyListings from "./Pages/MyListings";
import EditUser from "./Pages/EditUser";
import DisplayOptionsBarProvider from "./contexts/DisplayOptionsContext";
import { Toaster } from "react-hot-toast";
import VerifyRoute from "./UI/VerifyRoute";
import ForgotPassword from "./Pages/ForgotPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <DisplayOptionsBarProvider>
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
              <Route
                path="/user"
                element={
                  <VerifyRoute>
                    <User />
                  </VerifyRoute>
                }
              >
                <Route index element={<MyListings />} />
                <Route path="mylistings" element={<MyListings />} />
                <Route path="edituser" element={<EditUser />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/uploads" element={<AllUploads />} />
              <Route path="*" element={<p>page not found</p>} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
                boxShadow: "0px 5px 5px 10px #0000009c ",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </FilterStateProvider>
    </DisplayOptionsBarProvider>
  );
}

export default App;
