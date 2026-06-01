import PropTypes from 'prop-types';

function SeatMapPlatzkart({
  seats,
  selectedSeats,
  onSeatClick,
}) {

  const coupeSeats =
    seats.slice(0, 32);

  const sideSeats =
    seats.slice(32);

  const coupeGroups = [];

  for (
    let i = 0;
    i < coupeSeats.length;
    i += 4
  ) {
    coupeGroups.push(
      coupeSeats.slice(i, i + 4)
    );
  }

  function renderSeat(
    seat,
    side = false
  ) {

    if (!seat) {
      return (
        <div className="platz-seat empty" />
      );
    }

    const isSelected =
      selectedSeats.includes(
        seat.index
      );

    const busy =
     [3, 7, 12].includes(
      seat.index
    );

    return (

      <button
        type="button"

        className={`
         platz-seat
         ${side ? 'side' : ''}
         ${isSelected ? 'active' : ''}
         ${busy ? 'disabled' : ''}
       `}

        disabled={busy}

        onClick={() =>
         onSeatClick(
          seat.index
         )
        }
       >

        {seat.index}

      </button>
    );
  }

  return (

    <div className="wagon-map">

      <div className="platz-main">

        <div className="platz-service-room">

          <img
           src={`${process.env.PUBLIC_URL}/assets/conductor.svg`}
            alt=""
          />

        </div>

        {coupeGroups.map(
          (
            group,
            index
          ) => (

            <div
              key={index}
              className="platz-coupe"
            >

              <div className="platz-left">

                {renderSeat(
                  group[0]
                )}

                {renderSeat(
                  group[1]
                )}

              </div>

              <div className="platz-right">

                {renderSeat(
                  group[2]
                )}

                {renderSeat(
                  group[3]
                )}

              </div>

            </div>
          )
        )}

        <div className="wagon-end-icons">

          <img
            src={`${process.env.PUBLIC_URL}/assets/no-smoking.svg`}
            alt=""
          />

          <img
            src={`${process.env.PUBLIC_URL}/assets/trash.svg`}
            alt=""
          />

        </div>

      </div>

      <div className="platz-passage" />

      <div className="platz-side">

        {sideSeats.map(
          (seat) => (

            <div
              key={seat.index}
              className="platz-side-item"
            >

              {renderSeat(
                seat,
                true
              )}

            </div>
          )
        )}

      </div>

      <div className="wagon-bottom-icons">

        <img
          src={`${process.env.PUBLIC_URL}/assets/boiling-water.svg`}
          alt=""
        />

        <img
          src={`${process.env.PUBLIC_URL}/assets/toilet.svg`}
          alt=""
        />

      </div>

    </div>
  );
}

SeatMapPlatzkart.propTypes = {

  seats:
    PropTypes.array
      .isRequired,

  selectedSeats:
    PropTypes.array
      .isRequired,

  onSeatClick:
    PropTypes.func
      .isRequired,
};

export default SeatMapPlatzkart;