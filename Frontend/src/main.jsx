import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/Home/Login.jsx'
import Register from './pages/Home/Register.jsx'
import JudgeRegister from './pages/Home/JudgeRegister.jsx'

// User 
import User_Home from './pages/User/User_Home.jsx'


//Admin
import Admin_Home from './pages/Admin/Admin_Home.jsx'
import AddEvent from './pages/Admin/AddEvent.jsx'

import { Provider } from 'react-redux';
import store from './redux/index.js';
import AllEvents from './pages/Admin/AllEvents.jsx'
import EventDetails from './pages/Admin/EventDetails.jsx'



import Judge_Home from './pages/Judge/Judge_Home.jsx'
import Judge_AllEvents from './pages/Judge/Judge_AllEvents.jsx'
import Judge_EventDetails from './pages/Judge/Judge_EventDetails.jsx'
import User_Events from './pages/User/User_Events.jsx'
import User_EventDetails from './pages/User/User_EventDetails.jsx'
import User_MyEvents from './pages/User/User_MyEvents.jsx'
import User_LeaderBoard from './pages/User/User_LeaderBoard.jsx'
import Judge_LeaderBoard from './pages/Judge/Judge_LeaderBoard.jsx'
import Admin_Registration from './pages/Admin/Admin_Registration.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Home',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user',
    element: <User_Home />,
  },
  {
    path: '/Judge-Register',
    element: <JudgeRegister />,
  },
  {
    path: '/admin',
    element: <Admin_Home />,
  },
  {
    path: '/admin/addevents',
    element: <AddEvent />,
  },
  {
    path: '/admin/allevents',
    element: <AllEvents />,
  },
  {
    path: '/admin/eventdetails/:id',
    element: <EventDetails />,
  },

  {
    path: '/admin/registrations',
    element: <Admin_Registration />,
  },


  {
    path: '/judge',
    element: <Judge_Home />,
  },
  {
    path: '/judge/allevents',
    element: <Judge_AllEvents />,
  },
  {
    path: '/judge/eventdetails/:id',
    element: <Judge_EventDetails />,
  },
  {
    path: '/judge/leaderboard/',
    element: < Judge_LeaderBoard/>,
  },
  {
    path: '/user/events',
    element: <User_Events />,
  },
  {
    path: '/user/eventdetails/:id',
    element: < User_EventDetails/>,
  },
  

  {
    path: '/user/myevents',
    element: < User_MyEvents/>,
  },
  {
    path: '/user/leaderboard',
    element: < User_LeaderBoard/>,
  },

  
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} /> {/* Wrap the app with RouterProvider */}
  </Provider>
)