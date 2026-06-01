import { useState } from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  useOrder,
} from '../../context/OrderContext';

import CityAutocomplete
  from '../common/CityAutocomplete';

function SearchForm() {

  const navigate =
    useNavigate();

  const {
    setSearchData,
  } = useOrder();

  const [
    fromCity,
    setFromCity,
  ] = useState('');

  const [
    toCity,
    setToCity,
  ] = useState('');

  const [
    departureDate,
    setDepartureDate,
  ] = useState('');

  const [
    returnDate,
    setReturnDate,
  ] = useState('');

  const [
    isRoundTrip,
    setIsRoundTrip,
  ] = useState(false);

  const [adults, setAdults] =
    useState(1);

  const [
    children,
    setChildren,
  ] = useState(0);

  const [babies, setBabies] =
    useState(0);

  function handleSubmit(
    event
  ) {

    event.preventDefault();

    if (
      !fromCity.trim() ||
      !toCity.trim()
    ) {
      return;
    }

    const formData = {

      fromCity,
      toCity,

      departureDate,
      returnDate,

      isRoundTrip,

      adults,
      children,
      babies,
    };

    setSearchData(
      formData
    );

    navigate('/search', {
      state: formData,
    });
  }

  return (

    <form
      className="search-form"
      onSubmit={handleSubmit}
    >

      {/* ROUTE */}

      <div className="search-form__row">

        <div className="search-form__group">

          <label className="search-form__label">
            Откуда
          </label>

          <CityAutocomplete
            placeholder="Москва"
            value={fromCity}
            onChange={
              setFromCity
            }
          />

        </div>

        <div className="search-form__group">

          <label className="search-form__label">
            Куда
          </label>

          <CityAutocomplete
            placeholder="Санкт-Петербург"
            value={toCity}
            onChange={
              setToCity
            }
          />

        </div>

      </div>

      {/* DATES */}

      <div className="search-form__row">

        <div className="search-form__group">

          <label className="search-form__label">
            Дата поездки
          </label>

          <input
            type="date"
            className="search-form__input"
            value={departureDate}
            onChange={(e) =>
              setDepartureDate(
                e.target.value
              )
            }
          />

        </div>

        <div className="search-form__group">

          <label className="search-form__label">
            Дата возвращения
          </label>

          <input
            type="date"
            className="search-form__input"
            value={returnDate}
            disabled={!isRoundTrip}
            onChange={(e) =>
              setReturnDate(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* ROUND */}

      <label className="trip-switch">

        <input
          type="checkbox"
          checked={isRoundTrip}
          onChange={(e) =>
            setIsRoundTrip(
              e.target.checked
            )
          }
        />

        <span>
          Билет туда и обратно
        </span>

      </label>

      {/* PASSENGERS */}

      <div className="passengers-box">

        <div className="passenger-counter">

          <div className="passenger-counter__top">

            <img
              src="/assets/passenger.svg"
              alt=""
            />

            <span>
              Взрослые
            </span>

          </div>

          <input
            type="number"
            min="1"
            max="8"
            value={adults}
            onChange={(e) =>
              setAdults(
                Number(
                  e.target.value
                )
              )
            }
          />

        </div>

        <div className="passenger-counter">

          <div className="passenger-counter__top">

            <img
              src="/assets/passenger.svg"
              alt=""
            />

            <span>
              Детские
            </span>

          </div>

          <input
            type="number"
            min="0"
            max="8"
            value={children}
            onChange={(e) =>
              setChildren(
                Number(
                  e.target.value
                )
              )
            }
          />

        </div>

        <div className="passenger-counter">

          <div className="passenger-counter__top">

            <img
              src="/assets/passenger.svg"
              alt=""
            />

            <span>
              До 5 лет
            </span>

          </div>

          <input
            type="number"
            min="0"
            max="8"
            value={babies}
            onChange={(e) =>
              setBabies(
                Number(
                  e.target.value
                )
              )
            }
          />

        </div>

      </div>

      <button
        type="submit"
        className="search-form__button"
      >
        Найти билеты
      </button>

    </form>
  );
}

export default SearchForm;
