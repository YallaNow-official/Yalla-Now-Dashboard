import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: "/", element: <Home /> },
        { path: "/pendingRiders", element: <PendingRiders /> },
        { path: "/home", element: <Home /> },
        { path: "/riders", element: <Riders /> },
        { path: "/login", element: <Login /> },
        { path: "/ridesHistory", element:<RidesHistory/>  },
        { path: "/blockedRiders", element:<BlockedRiders/>  },
        { path: "/riderDetails/:id", element:<RiderDetails/>  },
        { path: "/userDetails", element:<UserDetails/>  },
        { path: "/users", element:<Users/>},
        { path: "/pendingPartners", element:<PendingPartners/>},
        { path: "/partners", element:<Partners/>},
        { path: "/trips", element:<TripsOthers/>},
        { path: "/booking", element:<Partners/>},
        { path: "/partnerDetails", element:<PartnerDetails/>},
        { path: "/blockedPartners", element:<PendingPartners/>},
        { path: "/dashboard", element:<Dashboard/>},
    ],
    },
  ]);
  return (
    <RouterProvider router={routers}>
    </RouterProvider>
  );
}

export default App;
