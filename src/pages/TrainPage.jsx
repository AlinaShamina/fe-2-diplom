import {
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import MainLayout
  from '../components/layout/MainLayout';

import SeatMapSwitcher
  from '../components/train/maps/SeatMapSwitcher';

import {
  getTrainSeats,
} from '../services/seatsService';

import {
  useOrder,
} from '../context/OrderContext';

import ProgressSteps
  from '../components/common/ProgressSteps';

/* =========================
   MOCK COACHES
========================= */

const mockCoaches = [
  {
    coach: {
      _id: 'coach1',
      class_type: 'second',
      avaliable_seats: 18,
      have_wifi: true,
      wifi_price: 250,
      linens_price: 180,
      bottom_price: 3200,
    },

    seats: Array.from(
      { length: 18 },
      (_, i) => {
        const seatNumber =
         i + 1;

        const isUpper =
         seatNumber % 2 === 0;

        return {

         index: seatNumber,

         available: true,

         price: isUpper
          ? 2200
          : 3200,
        };
      }
    ),
  },
  {
    coach: {
      _id: 'coach2',
      class_type: 'third',
      avaliable_seats: 36,
      have_wifi: true,
      wifi_price: 250,
      linens_price: 180,
      bottom_price: 2800,
    },

    seats: Array.from(
      { length: 36 },
      (_, i) => {
        const seatNumber =
         i + 1;

        const isUpper =
          seatNumber % 2 === 0;

        return {

          index: seatNumber,

          available: true,

          price: isUpper
           ? 1400
           : 2200,
        };
      }
    ),
  },
  {
    coach: {
      _id: 'coach3',
      class_type: 'first',
      avaliable_seats: 12,
      have_wifi: true,
      wifi_price: 350,
      linens_price: 0,
      bottom_price: 5400,
    },

    seats: Array.from(
      { length: 12 },
      (_, i) => ({
        index: i + 1,
        available: true,
        price: 5200,
      })
    ),
  },
  {
    coach: {
      _id: 'coach4',
      class_type: 'fourth',
      avaliable_seats: 50,
      have_wifi: true,
      wifi_price: 150,
      linens_price: 0,
      bottom_price: 1800,
    },

    seats: Array.from(
      { length: 50 },
      (_, i) => ({
        index: i + 1,
        available: true,

        price: 900,
      })
    ),
  },
];

function TrainPage() {

  const { id } =
    useParams();

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    setDepartureRoute,
    setDepartureSeats,

    setArrivalRoute,
    setArrivalSeats,
  } = useOrder();

  const train =
    location.state?.train;

  const searchData =
    location.state?.searchData;

  const passengersCount =
    (searchData?.adults || 1) +
    (searchData?.children || 0);

  /* =========================
     STATES
  ========================= */

  const [coaches, setCoaches] =
    useState([]);

  const [
    selectedCoach,
    setSelectedCoach,
  ] = useState(null);

  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([]);

  const [
    includeWifi,
    setIncludeWifi,
  ] = useState(false);

  const [
    includeLinens,
    setIncludeLinens,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     LOAD
  ========================= */

  useEffect(() => {

    async function loadSeats() {

      try {

        setLoading(true);

        const data =
          await getTrainSeats(id);

        const apiCoaches =
          data?.length
            ? data
            : [];

        const existingTypes =
          apiCoaches.map(
            (item) =>
              item.coach
                .class_type
          );

        const missingMockCoaches =
          mockCoaches.filter(
            (mockCoach) =>
              !existingTypes.includes(
                mockCoach.coach
                  .class_type
              )
          );

        const coachesData = [
          ...apiCoaches,
          ...missingMockCoaches,
        ];

        setCoaches(
          coachesData
        );

        setSelectedCoach(
          coachesData[0]
        );

      } catch {

        setCoaches(
          mockCoaches
        );

        setSelectedCoach(
          mockCoaches[0]
        );

      } finally {

        setLoading(false);

      }
    }

    loadSeats();

  }, [id]);

  if (!train) {
    return (

    <MainLayout>

      <main className="train-page">

        <div className="train-loader">

          <div className="train-loader__spinner" />

          <p>
            Загружаем вагон...
          </p>

        </div>

      </main>

    </MainLayout>
  );
  }

  const departure =
    train.departure;

  const coachData =
    selectedCoach?.coach;

  /* =========================
     HELPERS
  ========================= */

  function getCoachType(
    type
  ) {

    switch (type) {

      case 'first':
        return 'Люкс';

      case 'second':
        return 'Купе';

      case 'third':
        return 'Плацкарт';

      case 'fourth':
        return 'Сидячий';

      default:
        return 'Вагон';
    }
  }

  function getSeatMapType(
    type
  ) {

    switch (type) {

      case 'first':
        return 'lux';

      case 'second':
        return 'coupe';

      case 'third':
        return 'platzkart';

      case 'fourth':
        return 'seated';

      default:
        return 'coupe';
    }
  }

  function handleCoachChange(
    coach
  ) {

    setSelectedCoach(
      coach
    );

    setSelectedSeats([]);

  }

  /* =========================
     PRICE
  ========================= */

 
  const wifiPrice =
    includeWifi
      ? coachData?.wifi_price || 0
      : 0;

  const linensPrice =
    includeLinens
      ? coachData?.linens_price || 0
      : 0;

  const selectedSeatObjects =
    selectedCoach?.seats.filter(
     (seat) =>
       selectedSeats.includes(
        seat.index
      )
    ) || [];

  const seatsPrice =
    selectedSeatObjects.reduce(
    (sum, seat) => {

      // MOCK PRICE

      if (seat.price) {
        return sum + seat.price;
      }

      // API PRICE

      const isUpper =
        seat.index % 2 === 0;

      const seatPrice =
        isUpper
          ? coachData?.top_price
          : coachData?.bottom_price;

      return sum + (seatPrice || 0);

    },
    0
  );

  const extrasPrice =
  (
    wifiPrice +
    linensPrice
  ) * selectedSeats.length;

  const totalPrice =
    seatsPrice +
    extrasPrice;

  /* =========================
     NEXT
  ========================= */

  function handleNext() {

    const routeData = {

      train,

      coach: selectedCoach,

      services: {

       wifi:
         includeWifi,

       linens:
         includeLinens,
     },

      totalPrice,
   };

   // ЕСЛИ ОБРАТНЫЙ БИЛЕТ ЕЩЕ НЕ ВЫБРАН

   if (!location.state?.isReturnSelection) {

    setDepartureRoute(
      routeData
    );

    setDepartureSeats(
      selectedSeats
    );

    // ЕСТЬ ОБРАТНЫЙ БИЛЕТ?

    if (searchData?.isRoundTrip) {

      navigate(
        '/search',
        {
          state: {

            ...searchData,

            selectingReturn: true,

            departureRoute: routeData,
          },
        }
      );

      return;
    }
  }

  // ВЫБОР ОБРАТНОГО

  else {

    setArrivalRoute(
      routeData
    );

    setArrivalSeats(
      selectedSeats
    );
  }

  navigate(
    '/passengers',
    {
      state: {
        searchData,
      },
    }
  );
}

  return (

    <MainLayout>

      <ProgressSteps
       currentStep={1}
      />

      <main className="train-page">

        <section className="page-hero">

          <div className="container page-hero__content">

            <h1 className="page-hero__title">
              Выбор мест
            </h1>

            <p className="page-hero__subtitle">

              {
                departure?.from
                  ?.city?.name
              }

              {' → '}

              {
                departure?.to
                  ?.city?.name
              }

            </p>

          </div>

        </section>

        <section className="train-section">

          <div className="container">

            {/* PASSENGERS */}

            <div
              className="train-card__selected-passengers"
            >

              <span>
                {searchData?.adults || 1}
                {' '}
                взр.
              </span>

              {(searchData?.children || 0) > 0 && (
                <span>
                  {' • '}
                  {searchData.children}
                  {' '}
                  дет.
                </span>
              )}

            </div>

            {/* TYPES */}

            <div className="wagon-types">

              {[
                {
                  type: 'fourth',
                  label: 'Сидячий',
                  icon:
                    '/assets/seat.svg',
                },

                {
                  type: 'third',
                  label: 'Плацкарт',
                  icon:
                    '/assets/platzkart.svg',
                },

                {
                  type: 'second',
                  label: 'Купе',
                  icon:
                    '/assets/coupe.svg',
                },

                {
                  type: 'first',
                  label: 'Люкс',
                  icon:
                    '/assets/lux.svg',
                },
              ].map((item) => {

                const coach =
                  coaches.find(
                    (coachItem) =>
                      coachItem.coach
                        .class_type ===
                      item.type
                  );

                return (

                  <button
                    key={item.type}

                    className={`wagon-type ${
                      coachData?.class_type ===
                      item.type
                        ? 'active'
                        : ''
                    }`}

                    onClick={() => {

                      if (coach) {
                        handleCoachChange(
                          coach
                        );
                      }
                    }}
                  >

                    <img
                      src={item.icon}
                      alt=""
                    />

                    <span>
                      {item.label}
                    </span>

                  </button>
                );
              })}

            </div>

            {/* COACHES */}

            <div className="coach-list">

              {coaches.map(
                (item, index) => (

                  <button
                    key={
                      item.coach._id
                    }

                    className={
                      selectedCoach
                        ?.coach
                        ?._id ===
                      item.coach._id
                        ? 'coach-button active'
                        : 'coach-button'
                    }

                    onClick={() =>
                      handleCoachChange(
                        item
                      )
                    }
                  >

                    {String(
                      index + 1
                    ).padStart(
                      2,
                      '0'
                    )}

                  </button>
                )
              )}

            </div>

            {/* INFO */}

            {coachData && (

              <div className="coach-info">

                <div className="coach-info__header">

                  <div>

                    <h2>
                      Вагон
                      {' '}
                      {coachData._id}
                    </h2>

                    <p>
                      {
                        getCoachType(
                          coachData.class_type
                        )
                      }
                    </p>

                  </div>

                  <div>

                    Свободно:
                    {' '}

                    {
                      coachData.avaliable_seats
                    }

                  </div>

                </div>

                <div className="coach-info__body">

                  {/* SERVICES */}

                  <div className="coach-services">

                    <label>

                      <input
                        type="checkbox"

                        checked={
                          includeWifi
                        }

                        onChange={(e) =>
                          setIncludeWifi(
                            e.target.checked
                          )
                        }
                      />

                      <img
                        src="/assets/wifi.svg"
                        alt=""
                      />

                      <span>
                        Wi-Fi
                      </span>

                      <b>
                        +{
                          coachData?.wifi_price || 0
                        } ₽
                      </b>

                    </label>

                    <label>

                      <input
                        type="checkbox"

                        checked={
                          includeLinens
                        }

                        onChange={(e) =>
                          setIncludeLinens(
                            e.target.checked
                          )
                        }
                      />

                      <img
                        src="/assets/blanket.svg"
                        alt=""
                      />

                      <span>
                        Бельё
                      </span>

                      <b>
                        +{
                          coachData?.linens_price || 0
                        } ₽
                      </b>

                    </label>

                  </div>

                  {/* MAP */}

                  <div className="wagon-map">

                    <SeatMapSwitcher
                      type={getSeatMapType(
                        coachData.class_type
                      )}

                      seats={
                        selectedCoach.seats
                      }

                      selectedSeats={
                        selectedSeats
                      }

                      setSelectedSeats={
                        setSelectedSeats
                      }

                      maxSeats={
                        passengersCount
                      }
                    />

                  </div>

                  {/* SUMMARY */}

                  <div className="ticket-summary">

                    <h2>
                      Выбрано мест:
                      {' '}
                      {
                        selectedSeats.length
                      }
                      {' / '}
                      {passengersCount}
                    </h2>

                    <p>
                      Места:
                      {' '}

                      {selectedSeats.length
                        ? selectedSeats.join(
                            ', '
                          )
                        : '—'}
                    </p>

                    <h2>
                      Итого:
                      {' '}
                      {totalPrice}
                      {' '}
                      ₽
                    </h2>

                  </div>

                  {selectedSeats.length ===
                    passengersCount && (

                    <button
                      className="next-button"

                      onClick={
                        handleNext
                      }
                    >
                      Продолжить
                    </button>

                  )}

                </div>

              </div>
            )}

          </div>

        </section>

      </main>

    </MainLayout>
  );
}

export default TrainPage;
