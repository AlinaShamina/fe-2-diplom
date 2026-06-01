import PropTypes from 'prop-types';

import SeatMapCoupe
  from './SeatMapCoupe';

import SeatMapLux
  from './SeatMapLux';

import SeatMapPlatzkart
  from './SeatMapPlatzkart';

import SeatMapSeated
  from './SeatMapSeated';

function SeatMapSwitcher({
  type,
  seats,

  selectedSeats,
  setSelectedSeats,

  maxSeats,
}) {

  function handleSeatClick(
    seatIndex
  ) {

    const isSelected =
      selectedSeats.includes(
        seatIndex
      );

    /* REMOVE */

    if (isSelected) {

      setSelectedSeats(
        selectedSeats.filter(
          (seat) =>
            seat !== seatIndex
        )
      );

      return;
    }

    /* LIMIT */

    if (
      selectedSeats.length >=
      maxSeats
    ) {
      return;
    }

    /* ADD */

    setSelectedSeats([
      ...selectedSeats,
      seatIndex,
    ]);
  }

  const mapProps = {

    seats,

    selectedSeats,

    onSeatClick:
      handleSeatClick,
  };

  switch (type) {

    /* =========================
       LUX
    ========================= */

    case 'lux':

      return (
        <SeatMapLux
          {...mapProps}
        />
      );

    /* =========================
       PLATZKART
    ========================= */

    case 'platzkart':

      return (
        <SeatMapPlatzkart
          {...mapProps}
        />
      );

    /* =========================
       SEATED
    ========================= */

    case 'seated':

      return (
        <SeatMapSeated
          {...mapProps}
        />
      );

    /* =========================
       COUPE
    ========================= */

    case 'coupe':
    default:

      return (
        <SeatMapCoupe
          {...mapProps}
        />
      );
  }
}

SeatMapSwitcher.propTypes = {

  type:
    PropTypes.string
      .isRequired,

  seats:
    PropTypes.array
      .isRequired,

  selectedSeats:
    PropTypes.array
      .isRequired,

  setSelectedSeats:
    PropTypes.func
      .isRequired,

  maxSeats:
    PropTypes.number
      .isRequired,
};

export default SeatMapSwitcher;