import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import { Login } from '@mui/icons-material';
import PendingRiders from './Components/PendingRiders/PendingRiders';
import Riders from './Components/Riders/Riders';
import RidesHistory from './Components/RidesHistory/RidesHistory';
import Users from './Components/Users/Users';
import BlockedRiders from './Components/BlockedRides/BlockedRides';
import Dashboard from './Components/Dashboard/Dashboard';
import RiderDetails from './Components/RiderDetails/RiderDetails';
import UserDetails from './Components/Users/UserDetails';
import PendingPartners from './Components/Partners/PendingPartners';
import Partners from './Components/Partners/Partners';
import PartnerDetails from './Components/Partners/PartnerDetails';
import TripsOthers from './Components/Trips&others/Trips&others';
import Guard from './Components/Guard/Guard';
import { Provider } from 'react-redux';
import { globalStore } from "./Redux/store";
import BlockedPartners from './Components/Partners/BlockedPartners';
import Offers from './Components/Offers/Offers';
import AddOffer from './Components/Offers/AddOffer';
import AddTrip from './Components/Trips&others/AddTrip';

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: "/", element: <Home /> },
        { path: "/pendingRiders", element: <Guard><PendingRiders /></Guard> },
        { path: "/home", element: <Guard><Home /></Guard> },
        { path: "/riders", element: <Guard><Riders /></Guard> },
        { path: "/login", element: <Login /> },
        { path: "/ridesHistory", element: <Guard><RidesHistory /></Guard> },
        { path: "/blockedRiders", element: <Guard><BlockedRiders /></Guard> },
        { path: "/riderDetails/:id", element: <Guard><RiderDetails /></Guard> },
        { path: "/userDetails", element: <Guard><UserDetails /></Guard> },
        { path: "/users", element: <Guard><Users /></Guard> },
        { path: "/pendingPartners", element: <Guard><PendingPartners /></Guard> },
        { path: "/partners", element: <Guard><Partners /></Guard> },
        { path: "/trips", element: <Guard><TripsOthers /></Guard> },
        { path: "/booking", element: <Guard><Partners /></Guard> },
        { path: "/offers", element: <Offers /> },
        { path: "/addOffer", element: <AddOffer /> },
        { path: "/addTrip", element: <AddTrip /> },
        { path: "/partnerDetails/:id", element: <Guard><PartnerDetails /></Guard> },
        { path: "/blockedPartners", element: <Guard><BlockedPartners /></Guard> },
        { path: "/dashboard", element: <Guard><Dashboard /></Guard> },
      ],
    },
  ]);

  return (
    <Provider store={globalStore}>
      <RouterProvider router={routers} />
      <ToastContainer
        position="top-center" // Center the toast at the top
        autoClose={5000} // Duration before auto-close
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Append newest toast on top
        closeOnClick // Close on click
        rtl={false} // Right-to-left support
        pauseOnFocusLoss // Pause on focus loss
        draggable // Allow dragging
        pauseOnHover // Pause on hover
        theme="light" // Light or dark theme
      />
    </Provider>
  );
}

export default App;
