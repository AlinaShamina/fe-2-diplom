import {
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import MainLayout
  from '../components/layout/MainLayout';

import {
  useOrder,
} from '../context/OrderContext';

import ProgressSteps
  from '../components/common/ProgressSteps';

  import toast from 'react-hot-toast';

function PassengersPage() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    departureRoute,
    departureSeats,

    arrivalRoute,
    arrivalSeats,

    passengers,
    setPassengers,
  } = useOrder();

  const searchData =
    location.state?.searchData ||
    {};

  const adults =
    searchData.adults || 1;

  const children =
    searchData.children || 0;

  const totalPassengers =
    adults + children;

  /* =========================
     INIT
  ========================= */

  useEffect(() => {

    if (!passengers.length) {

      const initialPassengers =
        Array.from(
          { length: totalPassengers },
          (_, index) => ({

            id: index + 1,

            type:
              index < adults
                ? 'Взрослый'
                : 'Детский',

            firstName: '',
            lastName: '',
            middleName: '',

            gender: 'male',

            document:
              index < adults
                ? 'Паспорт РФ'
                : 'Свидетельство о рождении',
          })
        );

      setPassengers(
        initialPassengers
      );
    }

  }, []);

  function updatePassenger(
    id,
    field,
    value
  ) {

    setPassengers(
      passengers.map(
        (passenger) =>
          passenger.id === id
            ? {
                ...passenger,
                [field]: value,
              }
            : passenger
      )
    );
  }

  function handleNext() {

    const hasEmptyFields =
    passengers.some(
      (passenger) => (

        !passenger.firstName ||
        !passenger.lastName ||
        !passenger.middleName

      )
    );

  if (hasEmptyFields) {

    toast.error(
     'Заполните данные всех пассажиров'
    );

    return;
  }

  navigate(
    '/payment'
  );
}

  return (

    <MainLayout>

     <ProgressSteps
      currentStep={2}
    />

      <main className="passengers-page">

        <div className="container">

          <div className="passengers-layout">

            {/* LEFT */}

            <div className="passengers-forms">

              {passengers.map(
                (passenger) => (

                  <div
                    key={passenger.id}
                    className="passenger-card"
                  >

                    <div className="passenger-card__top">

                      <h2>
                        Пассажир {passenger.id}
                      </h2>

                    </div>

                    <select
                      className="passenger-select"
                      value={passenger.type}
                      onChange={(e) =>
                        updatePassenger(
                          passenger.id,
                          'type',
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Взрослый
                      </option>

                      <option>
                        Детский
                      </option>

                    </select>

                    <div className="passenger-grid">

                      <input
                        placeholder="Фамилия"
                        value={passenger.lastName}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            'lastName',
                            e.target.value
                          )
                        }
                      />

                      <input
                        placeholder="Имя"
                        value={passenger.firstName}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            'firstName',
                            e.target.value
                          )
                        }
                      />

                      <input
                        placeholder="Отчество"
                        value={passenger.middleName}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            'middleName',
                            e.target.value
                          )
                        }
                      />

                    </div>

                    <div className="passenger-gender">

                      <button
                        type="button"
                        className={
                          passenger.gender === 'male'
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          updatePassenger(
                            passenger.id,
                            'gender',
                            'male'
                          )
                        }
                      >
                        М
                      </button>

                      <button
                        type="button"
                        className={
                          passenger.gender === 'female'
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          updatePassenger(
                            passenger.id,
                            'gender',
                            'female'
                          )
                        }
                      >
                        Ж
                      </button>

                    </div>

                    <div className="passenger-docs">

                      <select
                        value={passenger.document}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            'document',
                            e.target.value
                          )
                        }
                      >

                        <option>
                          Паспорт РФ
                        </option>

                        <option>
                          Свидетельство о рождении
                        </option>

                      </select>

                      <input placeholder="Серия" />

                      <input placeholder="Номер" />

                    </div>

                  </div>
                )
              )}

              <button
                className="passengers-next"
                onClick={handleNext}
              >
                Далее
              </button>

            </div>

            {/* SIDEBAR */}

            <aside className="passengers-sidebar">

              <div className="sidebar-card">

                <h3>
                  Туда
                </h3>

                <p>

                  {
                    departureRoute?.train
                      ?.departure?.from?.city?.name
                  }

                  {' → '}

                  {
                    departureRoute?.train
                      ?.departure?.to?.city?.name
                  }

                </p>

                <p>
                  Места:
                  {' '}
                  {departureSeats.join(', ')}
                </p>

              </div>

              {arrivalRoute && (

                <div className="sidebar-card">

                  <h3>
                    Обратно
                  </h3>

                  <p>

                    {
                      arrivalRoute?.train
                        ?.departure?.from?.city?.name
                    }

                    {' → '}

                    {
                      arrivalRoute?.train
                        ?.departure?.to?.city?.name
                    }

                  </p>

                  <p>
                    Места:
                    {' '}
                    {arrivalSeats.join(', ')}
                  </p>

                </div>

              )}

              <div className="sidebar-card">

                <h3>
                  Пассажиры
                </h3>

                <p>
                  Взрослых: {adults}
                </p>

                <p>
                  Детских: {children}
                </p>

              </div>

              <div className="sidebar-card">

                <h3>
                  Итого
                </h3>

                <h2>

                  {
                    (departureRoute?.totalPrice || 0) +
                    (arrivalRoute?.totalPrice || 0)
                  }

                  ₽

                </h2>

              </div>

            </aside>

          </div>

        </div>

      </main>

    </MainLayout>
  );
}

export default PassengersPage;
