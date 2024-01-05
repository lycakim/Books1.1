import React from "react";
import Login from "./components/Login";
import User from "./components/Layout/User";
import { Routes, Route } from "react-router-dom";
import { NoMatch } from "./components/NoMatch";
// import Dashboard from "./components/Dashboard";
// import { UploadBook } from "./components/Layout/UploadBook";
import { BookDetails } from "./components/BookDetails";
import { AuthProvider } from "./components/auth";
import { RequireAuth } from "./components/RequireAuth";
import { Navbar } from "./components/Navbar";
const LazyUploadBook = React.lazy(() => import('./components/Layout/UploadBook'))

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='user' element={<RequireAuth><Navbar /></RequireAuth>} >
          <Route index element={<Navbar />} />
          <Route path="dashboard" element={<User />} />
          <Route path="upload-book" element={<React.Suspense fallback='Loading...'><LazyUploadBook /></React.Suspense>} />
          <Route path="book-details/:bookID" element={<BookDetails />} />
        </Route>

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
    // createBrowserRouter([
    //   {
    //     path: "/",
    //     element: <Login />
    //   },
    //   {
    //     path: 'user',
    //     element: <User />,
    //     children: [
    //       {
    //         path: 'dashboard',
    //         element: <Dashboard />
    //       }
    //     ]
    //   }
    // ])

  );
}

export default App;
