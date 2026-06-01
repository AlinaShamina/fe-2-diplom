import PropTypes from 'prop-types';

import {
  useNavigate,
} from 'react-router-dom';

function TrainCard({
  train,
  searchData,
  isReturnSelection,
}) {

  const navigate =
    useNavigate();

  const departure =
    train?.departure;

  function formatTime(
    timestamp
  ) {
    if (!timestamp) {
      return '--:--';
    }

    try {

      return new Date(
        timestamp * 1000
      ).toLocaleTimeString(
        'ru-RU',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      );

    } catch {

      return '--:--';

    }
  }

  function formatDuration(
    seconds
  ) {

    if (!seconds) {
      return '—';
    }

    let hours =
      Math.floor(
        seconds / 3600
      );

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    if (hours > 30) {
      hours = 8;
    }

    return `${hours} ч ${minutes} мин`;
  }

  function handleNavigate() {

    const trainId =
      departure?.train?._id ||
      departure?._id;

    navigate(
      `/train/${trainId}`,
      {
        state: {
          train,

          searchData,

          isReturnSelection,
        },
      }
    );
  }

  return (
    <article
      className="train-card"
      onClick={
        handleNavigate
      }
      role="button"
      tabIndex={0}
    >

      {/* LEFT */}

      <div className="train-card__left">

        <div className="train-card__train-icon">
          <img
            src={`${process.env.PUBLIC_URL}/assets/train.svg`}
            alt=""
          />
        </div>

        <h2 className="train-card__name">
          {
            departure?.train
              ?.name || '116С'
          }
        </h2>

        <div className="train-card__cities">

          <span>
            {
              departure?.from
                ?.city?.name
            }
          </span>

          <span>
            →
          </span>

          <span>
            {
              departure?.to
                ?.city?.name
            }
          </span>

        </div>

      </div>

      {/* CENTER */}

      <div className="train-card__center">

        <div className="train-card__route">

          {/* FROM */}

          <div className="train-card__time-block">

            <div className="train-card__time">
              {formatTime(
                departure?.from
                  ?.datetime
              )}
            </div>

            <div className="train-card__city">
              {
                departure?.from
                  ?.city?.name
              }
            </div>

            <div className="train-card__station">
              {
                departure?.from
                  ?.railway_station_name
              }
            </div>

          </div>

          {/* DURATION */}

          <div className="train-card__duration">

            <div className="train-card__duration-top">

              <img
                src={`${process.env.PUBLIC_URL}/assets/clock.svg`}
                alt=""
              />

              <span>
                {formatDuration(
                  departure?.duration
                )}
              </span>

            </div>

            <div className="train-card__arrow">
              →
            </div>

          </div>

          {/* TO */}

          <div className="train-card__time-block">

            <div className="train-card__time">
              {formatTime(
                departure?.to
                  ?.datetime
              )}
            </div>

            <div className="train-card__city">
              {
                departure?.to
                  ?.city?.name
              }
            </div>

            <div className="train-card__station">
              {
                departure?.to
                  ?.railway_station_name
              }
            </div>

          </div>

        </div>

        {/* SERVICES */}

        <div className="train-card__services">

          <div className="service">
            <img
              src={`${process.env.PUBLIC_URL}/assets/wifi.svg`}
              alt=""
            />
          </div>

          <div className="service">
            <img
              src={`${process.env.PUBLIC_URL}/assets/air.svg`}
              alt=""
            />
          </div>

          <div className="service">
            <img
              src={`${process.env.PUBLIC_URL}/assets/blanket.svg`}
              alt=""
            />
          </div>

          <div className="service">
            <img
              src={`${process.env.PUBLIC_URL}/assets/rocket.svg`}
              alt=""
            />
          </div>

        </div>

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

          {(searchData?.babies || 0) > 0 && (
            <span>
              {' • '}
              {searchData.babies}
              {' '}
              млад.
            </span>
          )}

        </div>

        {/* COACH TYPES */}

        <div className="train-card__coaches">

          <div className="coach-type">
            <img
              src={`${process.env.PUBLIC_URL}/assets/seat.svg`}
              alt=""
            />

            <span>
              Сидячий
            </span>
          </div>

          <div className="coach-type">
            <img
              src={`${process.env.PUBLIC_URL}/assets/platzkart.svg`}
              alt=""
            />

            <span>
              Плацкарт
            </span>
          </div>

          <div className="coach-type">
            <img
              src={`${process.env.PUBLIC_URL}/assets/coupe.svg`}
              alt=""
            />

            <span>
              Купе
            </span>
          </div>

          <div className="coach-type">
            <img
              src={`${process.env.PUBLIC_URL}/assets/lux.svg`}
              alt=""
            />

            <span>
              Люкс
            </span>
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="train-card__right">

        <div>

          <div className="train-card__price-label">
            Цена от
          </div>

          <div className="train-card__price">
            {
              departure?.min_price ||
              1920
            } ₽
          </div>

          <div className="train-card__passengers">

            <img
              src={`${process.env.PUBLIC_URL}/assets/passenger.svg`}
              alt=""
            />

            <span>
              Осталось мест:
              {' '}
              {Math.floor(
                Math.random() * 50
              )}
            </span>

          </div>

        </div>

        <button
          type="button"
          className="train-card__button"
          onClick={(event) => {

            event.stopPropagation();

            handleNavigate();

          }}
        >
          Выбрать места
        </button>

      </div>

    </article>
  );
}

TrainCard.propTypes = {

  train:
    PropTypes.shape({
      departure:
        PropTypes.object,
    }).isRequired,

  searchData:
    PropTypes.object,

  isReturnSelection:
    PropTypes.bool,
};

export default TrainCard;
