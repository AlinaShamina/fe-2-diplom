import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage
  from '../pages/HomePage';

import SearchPage
  from '../pages/SearchPage';

import TrainPage
  from '../pages/TrainPage';

import PassengersPage
  from '../pages/PassengersPage';

import PaymentPage
  from '../pages/PaymentPage';

import SuccessPage
  from '../pages/SuccessPage';

function AppRouter() {

  return (

    <BrowserRouter
      basename="/fe-2-diplom"
    >

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/search"
          element={<SearchPage />}
        />

        <Route
          path="/train/:id"
          element={<TrainPage />}
        />

        <Route
          path="/passengers"
          element={<PassengersPage />}
        />

        <Route
          path="/payment"
          element={<PaymentPage />}
        />

        <Route
          path="/success"
          element={<SuccessPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;