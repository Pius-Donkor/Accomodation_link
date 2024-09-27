import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./UI/Layout";
import AllUploads from "./Pages/AllUploads";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FilterStateProvider } from "./hooks/FilterState";
import PropertyDetails from "./Pages/PropertyDetails";
import SignUp from "./Pages/SignUp";
import User from "./Pages/User";
import MyListings from "./Pages/MyListings";
import EditUser from "./Pages/EditUser";
import DisplayOptionsBarProvider from "./contexts/DisplayOptionsContext";
import { Toaster } from "react-hot-toast";
import VerifyRoute from "./UI/VerifyRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import Chat from "./Pages/Chat";
import SignIn from "./Pages/SignIn";
import AdminDashboard from "./Pages/AdminDashboard";
import Dashboard from "./Features/Dashboard/Dashboard";
import Users from "./Features/Dashboard/Users";
import Properties from "./Features/Dashboard/Properties";
import Prediction from "./Pages/Prediction";
import { RentRequestProvider } from "./contexts/RentRequestContext";
import useGetUser from "./Features/User/useGetUser";
import UserPageRoutes from "./UI/UserPageRoutes";
import AllUserRequests from "./Pages/AllUserRequests";

function App() {
  const { userData } = useGetUser();
  return (
    <RentRequestProvider>
      <DisplayOptionsBarProvider>
        <FilterStateProvider>
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
                {userData?.role.includes("property_owner") ||
                userData?.role.includes("admin") ? (
                  <>
                    <Route index element={<MyListings />} />
                    <Route path="mylistings" element={<MyListings />} />
                    <Route path="edituser" element={<EditUser />} />
                    <Route path="allrequests" element={<AllUserRequests />} />
                  </>
                ) : (
                  <>
                    <Route index element={<EditUser />} />
                    <Route path="edituser" element={<EditUser />} />
                    <Route path="allrequests" element={<AllUserRequests />} />
                  </>
                )}
              </Route>
              <Route path="/chats" element={<Chat />} />
              <Route path="/prediction/:id" element={<Prediction />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/admindashboard" element={<AdminDashboard />}>
                <Route index element={<Dashboard />} />
                <Route path="overview" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="allproperties" element={<Properties />} />
              </Route>
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
        </FilterStateProvider>
      </DisplayOptionsBarProvider>
    </RentRequestProvider>
  );
}

export default App;
