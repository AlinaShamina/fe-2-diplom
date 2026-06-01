import PropTypes from 'prop-types';

function SeatMapCoupe({
  seats,
  selectedSeats,
  onSeatClick,
}) {

  const coupeGroups = [];

  for (
    let i = 0;
    i < seats.length;
    i += 4
  ) {
    coupeGroups.push(
      seats.slice(i, i + 4)
    );
  }

  function renderSeat(
    seat
  ) {

    if (!seat) {
      return (
        <div className="coupe-seat empty" />
      );
    }

    const isSelected =
      selectedSeats.includes(
        seat.index
      );

    const busy =
     [2, 5, 8].includes(
      seat.index
     );

    return (

      <button
        type="button"

        className={`
          coupe-seat
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

      <div className="coupe-layout">

        <div className="coupe-service-room">

          <img
            src="/assets/conductor.svg"
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
              className="coupe-box"
            >

              <div className="coupe-left">

                {renderSeat(
                  group[0]
                )}

                {renderSeat(
                  group[1]
                )}

              </div>

              <div className="coupe-right">

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
            src="/assets/no-smoking.svg"
            alt=""
          />

          <img
            src="/assets/trash.svg"
            alt=""
          />

        </div>

      </div>

      <div className="coupe-passage" />

      <div className="wagon-bottom-icons">

        <img
          src="/assets/boiling-water.svg"
          alt=""
        />

        <img
          src="/assets/toilet.svg"
          alt=""
        />

      </div>

    </div>
  );
}

SeatMapCoupe.propTypes = {

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

export default SeatMapCoupe;