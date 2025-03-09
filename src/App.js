import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userRoutes } from './Routes/AllRoutes';
import NonAuthLayout from './Routes/middleware/NonAuthLayout';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonAuthLayout>
                  {route.component}
                </NonAuthLayout>
              }
              key={idx}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
