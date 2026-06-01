import PropTypes from 'prop-types';

function SeatMapSeated({ seats, selectedSeats, onSeatClick }) {
  function renderSeat(seat) {
    if (!seat) return <div className="empty" />;
    const isSelected = selectedSeats.includes(seat.index);

    const busy =
     [4, 9, 14].includes(
      seat.index
     );
    return (
      <button
        type="button"
        className={`
          seat-chair
          ${isSelected ? 'active' : ''}
          ${busy ? 'disabled' : ''}
         `}

         disabled={busy}

         onClick={() =>
          onSeatClick(seat.index)
          }
         >

         {seat.index}

      </button>
    );
  }

  // Формируем ряды по 4 места (2+2)
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push([seats[i], seats[i + 1], seats[i + 2], seats[i + 3]]);
  }

  return (
    <div className="wagon-map">
      <div className="seated-layout">
        <div className="seated-frame">

          {/* Верхние иконки */}
          <div className="seated-top">
            <div className="seated-service-room">
              <img src={`${process.env.PUBLIC_URL}/assets/conductor.svg`} alt="Проводник" />
            </div>
            <div className="wagon-end-icons">
              <img src={`${process.env.PUBLIC_URL}/assets/no-smoking.svg`} alt="Не курить" />
              <img src={`${process.env.PUBLIC_URL}/assets/trash.svg`} alt="Мусор" />
            </div>
          </div>

          {/* Схема вагон */}
          <div className="seated-grid">
            {/* Левая сторона */}
            <div className="seated-side">
              {rows.map((row, index) => (
                <div className="seated-pair" key={index}>
                  {renderSeat(row[0])}
                  {renderSeat(row[2])} {/* исправлено */}
                </div>
              ))}
            </div>

            {/* Центральный проход */}
            <div className="seated-center-passage" />

            {/* Правая сторона */}
            <div className="seated-side">
              {rows.map((row, index) => (
                <div className="seated-pair" key={index}>
                  {renderSeat(row[1])} {/* исправлено */}
                  {renderSeat(row[3])} {/* исправлено */}
                </div>
              ))}
            </div>
          </div>

          {/* Нижние иконки */}
          <div className="wagon-bottom-icons">
            <img src={`${process.env.PUBLIC_URL}/assets/boiling-water.svg`} alt="Вода" />
            <img src={`${process.env.PUBLIC_URL}/assets/toilet.svg`} alt="Туалет" />
          </div>

        </div>
      </div>
    </div>
  );
}

SeatMapSeated.propTypes = {
  seats: PropTypes.array.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  onSeatClick: PropTypes.func.isRequired,
};

export default SeatMapSeated;