import {
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
} from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';

import TrainCard
  from '../components/search/TrainCard';

import SearchFilters
  from '../components/search/SearchFilters';

import Pagination
  from '../components/search/Pagination';

import {
  searchCities,
} from '../services/citiesService';

import {
  searchRoutes,
} from '../services/routesService';

function SearchPage() {

  const location =
    useLocation();

  const {
    fromCity,
    toCity,

    departureDate,
    returnDate,

    isRoundTrip,

    selectingReturn,

    adults,
    children,
    babies,
  } = location.state || {};

  /* =========================
     STATES
  ========================= */

  const [
    departureTrains,
    setDepartureTrains,
  ] = useState([]);

  const [
    returnTrains,
    setReturnTrains,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [filters, setFilters] =
    useState({
      have_first_class:
        false,

      have_second_class:
        false,

      have_third_class:
        false,

      have_fourth_class:
        false,

      have_wifi: false,

      have_air_conditioning:
        false,

      have_express:
        false,

      sort: '',
    });

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const LIMIT = 5;

  /* =========================
     FETCH
  ========================= */

  useEffect(() => {

    async function fetchRoutes() {

      try {

        setLoading(true);
        setError('');

        const fromCities =
          await searchCities(
            fromCity
          );

        const toCities =
          await searchCities(
            toCity
          );

        const fromCityId =
          fromCities[0]?._id;

        const toCityId =
          toCities[0]?._id;

        if (
          !fromCityId ||
          !toCityId
        ) {
          setError(
            'Города не найдены'
          );

          return;
        }

        /* =========================
           PARAMS
        ========================= */

        const requestParams = {
          from_city_id:
            fromCityId,

          to_city_id:
            toCityId,

          limit: LIMIT,

          offset:
            (currentPage - 1) *
            LIMIT,
        };

        if (
          filters.have_wifi
        ) {
          requestParams.have_wifi =
            true;
        }

        if (
          filters.have_air_conditioning
        ) {
          requestParams.have_air_conditioning =
            true;
        }

        if (
          filters.have_express
        ) {
          requestParams.have_express =
            true;
        }

        if (
          filters.have_first_class
        ) {
          requestParams.have_first_class =
            true;
        }

        if (
          filters.have_second_class
        ) {
          requestParams.have_second_class =
            true;
        }

        if (
          filters.have_third_class
        ) {
          requestParams.have_third_class =
            true;
        }

        if (
          filters.have_fourth_class
        ) {
          requestParams.have_fourth_class =
            true;
        }

        if (
          filters.sort
        ) {
          requestParams.sort =
            filters.sort;
        }

        /* =========================
           ТУДА
        ========================= */

        const departureData =
          await searchRoutes(
            requestParams
          );

        setDepartureTrains(
          departureData.items ||
            []
        );

        /* =========================
           ОБРАТНО
        ========================= */

        if (
          isRoundTrip
        ) {

          const returnParams = {
            ...requestParams,

            from_city_id:
              toCityId,

            to_city_id:
              fromCityId,
          };

          const returnData =
            await searchRoutes(
              returnParams
            );

          /* FIX API */

          const preparedReturn =
            (
              returnData.items || []
            ).map(
              (item) => ({
                ...item,

                departure: {
                  ...item.departure,

                  from:
                    item.departure?.to,

                  to:
                    item.departure?.from,
                },
              })
            );

          setReturnTrains(
            preparedReturn
          );
        }

      } catch (err) {

        console.error(err);

        setError(
          'Ошибка поиска'
        );

      } finally {

        setLoading(false);

      }
    }

    if (
      fromCity &&
      toCity
    ) {
      fetchRoutes();
    }

  }, [
    fromCity,
    toCity,

    departureDate,
    returnDate,

    filters,
    currentPage,

    isRoundTrip,
  ]);

  /* =========================
     RENDER
  ========================= */

  return (
    <MainLayout>

      <main className="search-page">

        <section className="page-hero">

          <div className="container page-hero__content">

            <h1 className="page-hero__title">
             
              {selectingReturn
                ? 'Выбор обратного билета'
                : 'Найденные билеты'}

            </h1>

            <div className="page-hero__subtitle">

              <div>
                {fromCity}
                {' → '}
                {toCity}

                {isRoundTrip &&
                  ' • туда/обратно'}
              </div>

              <div>
                {adults || 1}
                {' '}
                взр.

                {(children || 0) >
                  0 && (
                  <>
                    {' • '}
                    {children}
                    {' '}
                    дет.
                  </>
                )}

                {(babies || 0) >
                  0 && (
                  <>
                    {' • '}
                    {babies}
                    {' '}
                    млад.
                  </>
                )}
              </div>

              <div>
                {departureDate}

                {returnDate && (
                  <>
                    {' - '}
                    {returnDate}
                  </>
                )}
              </div>

            </div>

          </div>

        </section>

        <section className="search-section">

          <div className="container">

            <div className="search-layout">

              <SearchFilters
                filters={
                  filters
                }
                setFilters={
                  setFilters
                }
              />

              <div className="search-content">

                {loading && (
                
                  <div className="search-loader">

                   <div className="search-loader__spinner" />

                   <p>
                    Ищем лучшие билеты...
                   </p>

                  </div>
                )}

                {error && (
                  <div className="search-empty">

                    <h2>
                     Ошибка поиска
                   </h2>

                    <p>
                     {error}
                   </p>

                  </div>
                )}

                {/* =========================
                    ТУДА
                ========================= */}

                {!loading && (
                  <>

                    <h2
                      style={{
                        marginBottom:
                          '30px',
                      }}
                    >
                      Билеты туда
                    </h2>

                    <div className="search-page__list">

                      {!departureTrains.length ? (

                       <div className="search-empty">

                        <h2>
                         Поезда не найдены
                        </h2>

                        <p>
                        Попробуйте изменить фильтры
                        или выбрать другую дату
                        </p>

                    </div>

                 ) : (

                   departureTrains.map(
                    (train) => (
                     <TrainCard
                       key={
                        train.departure?._id
                       }

                       train={train}

                       searchData={
                         location.state
                       }

                       isReturnSelection={
                         selectingReturn
                       }
                     />
                    )
                  )

                )}

              </div>

                  </>
                )}

                {/* =========================
                    ОБРАТНО
                ========================= */}

                {isRoundTrip &&
                  returnTrains.length >
                    0 && (
                    <>

                      <h2
                        style={{
                          margin:
                            '60px 0 30px',
                        }}
                      >
                        Билеты обратно
                      </h2>

                      <div className="search-page__list">

                        {returnTrains.map(
                          (
                            train
                          ) => (
                            <TrainCard
                              key={
                                train.departure?._id
                              }

                              train={train}

                              searchData={
                               location.state
                              }

                              isReturnSelection={
                                true
                              }
                            />
                          )
                        )}

                      </div>

                    </>
                  )}

                <Pagination
                  currentPage={
                    currentPage
                  }
                  totalPages={10}
                  onPageChange={
                    setCurrentPage
                  }
                />

              </div>

            </div>

          </div>

        </section>

      </main>

    </MainLayout>
  );
}

export default SearchPage;
