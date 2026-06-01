import MainLayout
  from '../components/layout/MainLayout';

import {
  useOrder,
} from '../context/OrderContext';

import ProgressSteps
  from '../components/common/ProgressSteps';

function SuccessPage() {

  const {

    passengers,

    departureRoute,
    departureSeats,

    arrivalRoute,
    arrivalSeats,

  } = useOrder();

  const totalPrice =
    (departureRoute?.totalPrice || 0) +
    (arrivalRoute?.totalPrice || 0);

  return (

    <MainLayout>

      <ProgressSteps
        currentStep={4}
      />

      <main className="success-page">

        <div className="container">

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Заказ успешно оформлен
            </h1>

            <p>
              Билеты отправлены на вашу почту
            </p>

            <div className="success-info">

              <div>

                <span>
                  Пассажиров
                </span>

                <b>
                  {
                    passengers.length
                  }
                </b>

              </div>

              <div>

                <span>
                  Места туда
                </span>

                <b>
                  {
                    departureSeats.join(', ')
                  }
                </b>

              </div>

              {arrivalRoute && (

                <div>

                  <span>
                    Места обратно
                  </span>

                  <b>
                    {
                      arrivalSeats.join(', ')
                    }
                  </b>

                </div>

              )}

              <div>

                <span>
                  Сумма
                </span>

                <b>
                  {totalPrice}
                  {' '}
                  ₽
                </b>

              </div>

            </div>

          </div>

        </div>

      </main>

    </MainLayout>
  );
}

export default SuccessPage;