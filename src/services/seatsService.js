import api from '../api';

const mockSeats = [
  {
    coach: {
      _id: 'coach1',

      class_type: 'second',

      avaliable_seats: 18,

      top_price: 2600,
      bottom_price: 3200,

      have_wifi: true,
      wifi_price: 250,

      linens_price: 180,
      is_linens_included:
        false,
    },

    seats: Array.from(
      { length: 36 },
      (_, i) => ({
        index: i + 1,
        available:
          Math.random() > 0.3,
      })
    ),
  },

  {
    coach: {
      _id: 'coach2',

      class_type: 'third',

      avaliable_seats: 26,

      top_price: 1800,
      bottom_price: 2500,

      have_wifi: false,

      linens_price: 150,
      is_linens_included:
        true,
    },

    seats: Array.from(
      { length: 54 },
      (_, i) => ({
        index: i + 1,
        available:
          Math.random() > 0.25,
      })
    ),
  },
];

export async function getTrainSeats(
  id
) {
  try {
    const response =
      await api.get(
        `/routes/${id}/seats`,
        {
          timeout: 7000,
        }
      );

    return response.data;
  } catch (error) {
    console.error(
      'API seats timeout → используем mock'
    );

    return mockSeats;
  }
}