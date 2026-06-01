import {
  useState,
} from 'react';

import {
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

function PaymentPage() {

  const navigate =
    useNavigate();

  const {

    passengers,

    departureRoute,
    departureSeats,

    arrivalRoute,
    arrivalSeats,

    userData,
    setUserData,

  } = useOrder();

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState('online');

  function handleChange(
    field,
    value
  ) {

    setUserData({

      ...userData,

      [field]: value,
    });
  }

  function handleNext() {

    if (
    !userData.first_name ||
    !userData.last_name ||
    !userData.phone ||
    !userData.email
  ) {

    toast.error(
      'Заполните все поля'
    );

    return;
  }

  const emailValid =
    /\S+@\S+\.\S+/.test(
      userData.email
    );

  if (!emailValid) {

    toast.error(
      'Введите корректный email'
    );

    return;
  }

  setUserData({

    ...userData,

    payment_method:
      paymentMethod,
  });

  navigate(
    '/success'
  );
}

  const totalPrice =
    (departureRoute?.totalPrice || 0) +
    (arrivalRoute?.totalPrice || 0);

  return (

    <MainLayout>

     <ProgressSteps
      currentStep={3}
    />

      <main className="payment-page">

        <div className="container">

          <div className="payment-layout">

            {/* LEFT */}

            <div className="payment-main">

              {/* CONTACTS */}

              <div className="payment-card">

                <h1>
                  Персональные данные
                </h1>

                <div className="payment-grid">

                  <input
                    placeholder="Фамилия"

                    value={
                      userData.last_name
                    }

                    onChange={(e) =>
                      handleChange(
                        'last_name',
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="Имя"

                    value={
                      userData.first_name
                    }

                    onChange={(e) =>
                      handleChange(
                        'first_name',
                        e.target.value
                      )
                    }
                  />

                </div>

                <input
                  placeholder="Телефон"

                  value={
                    userData.phone
                  }

                  onChange={(e) =>
                    handleChange(
                      'phone',
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="E-mail"

                  value={
                    userData.email
                  }

                  onChange={(e) =>
                    handleChange(
                      'email',
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PAYMENT */}

              <div className="payment-card">

                <h2>
                  Способ оплаты
                </h2>

                <label>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      'online'
                    }

                    onChange={() =>
                      setPaymentMethod(
                        'online'
                      )
                    }
                  />

                  Онлайн
                </label>

                <label>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      'cash'
                    }

                    onChange={() =>
                      setPaymentMethod(
                        'cash'
                      )
                    }
                  />

                  Наличными
                </label>

              </div>

              <button
                className="payment-next"

                onClick={
                  handleNext
                }
              >
                Купить билеты
              </button>

            </div>

            {/* SIDEBAR */}

            <aside className="payment-sidebar">

              {/* ТУДА */}

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
                  {
                    departureSeats.join(', ')
                  }
                </p>

              </div>

              {/* ОБРАТНО */}

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
                    {
                      arrivalSeats.join(', ')
                    }
                  </p>

                </div>

              )}

              {/* ПАССАЖИРЫ */}

              <div className="sidebar-card">

                <h3>
                  Пассажиры
                </h3>

                <p>
                  {
                    passengers.length
                  }
                  {' '}
                  чел.
                </p>

              </div>

              {/* PRICE */}

              <div className="sidebar-card">

                <h3>
                  Итого
                </h3>

                <h2>
                  {totalPrice}
                  {' '}
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

export default PaymentPage;
