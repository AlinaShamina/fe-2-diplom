import PropTypes from 'prop-types';

import {
  createContext,
  useContext,
  useState,
} from 'react';

const OrderContext =
  createContext();

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function OrderProvider({
  children,
}) {

  /* =========================
     SEARCH
  ========================= */

  const [
    searchData,
    setSearchData,
  ] = useState(null);

  /* =========================
     ТУДА
  ========================= */

  const [
    departureRoute,
    setDepartureRoute,
  ] = useState(null);

  const [
    departureSeats,
    setDepartureSeats,
  ] = useState([]);

  /* =========================
     ОБРАТНО
  ========================= */

  const [
    arrivalRoute,
    setArrivalRoute,
  ] = useState(null);

  const [
    arrivalSeats,
    setArrivalSeats,
  ] = useState([]);

  /* =========================
     ПАССАЖИРЫ
  ========================= */

  const [
    passengers,
    setPassengers,
  ] = useState([]);

  /* =========================
     USER
  ========================= */

  const [
    userData,
    setUserData,
  ] = useState({

    first_name: '',
    last_name: '',
    patronymic: '',

    phone: '',
    email: '',

    payment_method:
      'cash',
  });

  /* =========================
     PRICE
  ========================= */

  const [
    totalPrice,
    setTotalPrice,
  ] = useState(0);

  return (

    <OrderContext.Provider
      value={{

        /* SEARCH */

        searchData,
        setSearchData,

        /* DEPARTURE */

        departureRoute,
        setDepartureRoute,

        departureSeats,
        setDepartureSeats,

        /* ARRIVAL */

        arrivalRoute,
        setArrivalRoute,

        arrivalSeats,
        setArrivalSeats,

        /* PASSENGERS */

        passengers,
        setPassengers,

        /* USER */

        userData,
        setUserData,

        /* PRICE */

        totalPrice,
        setTotalPrice,
      }}
    >

      {children}

    </OrderContext.Provider>
  );
}

export function useOrder() {

  return useContext(
    OrderContext
  );
}
