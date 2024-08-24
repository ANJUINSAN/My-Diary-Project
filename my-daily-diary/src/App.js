import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Login from './components/Login';
import Diary from './components/Diary';
import Register from './components/Register';
import EntryList from './components/EntryList';
import withPrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Nav />
        <Intro />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Nav />
        <Login />
      </>
    ),
  },
  {
    path: '/register',
    element: (
      <>
        <Nav />
        <Register />
      </>
    ),
  },
  {
    path: '/entries',
    // element: withPrivateRoute(() => (
    element:(
      <>
        <Nav />
        <EntryList />
      </>
    ),
  },
  {
    path: '/diary',
    // element: withPrivateRoute(() => (
    element:  (
      <>
        <Nav />
        <Diary />
      </>
    ),
  },
  {
    path: '/diary/:id',
    // element: withPrivateRoute(() => (
    element: (
      <>
        <Nav />
        <Diary />
      </>
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
