import PropTypes from 'prop-types';

function SeatMapLux({
  seats,
  selectedSeats,
  onSeatClick,
}) {

  const groups = [];

  for (
    let i = 0;
    i < seats.length;
    i += 2
  ) {
    groups.push(
      seats.slice(i, i + 2)
    );
  }

  function renderSeat(
    seat
  ) {

    if (!seat) {
      return (
        <div className="lux-seat empty" />
      );
    }

    const isSelected =
      selectedSeats.includes(
        seat.index
      );

    const busy =
     [1].includes(
      seat.index
    );

    return (

      <button
        type="button"

        className={`
          lux-seat  
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

      <div className="lux-layout">

        <div className="lux-service-room">

          <img
            src={`${process.env.PUBLIC_URL}/assets/conductor.svg`}
            alt=""
          />

        </div>

        {groups.map(
          (
            group,
            index
          ) => (

            <div
              key={index}
              className="lux-room"
            >

              {renderSeat(
                group[0]
              )}

              {renderSeat(
                group[1]
              )}

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

      <div className="lux-passage" />

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

SeatMapLux.propTypes = {

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

export default SeatMapLux;