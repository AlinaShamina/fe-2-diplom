import api from '../api/index';

const mockRoutes = {
  total_count: 2,

  items: [
    {
      departure: {
        _id: '1',

        duration: 14400, // 4 часа

        train: {
          name: '032А',
        },

        from: {
          datetime: 1717153200,

          city: {
            name: 'Москва',
          },

          railway_station_name:
            'Ленинградский вокзал',
        },

        to: {
          datetime: 1717167600,

          city: {
            name:
              'Санкт-Петербург',
          },

          railway_station_name:
            'Московский вокзал',
        },

        min_price: 3200,
      },
    },

    {
      departure: {
        _id: '2',

        duration: 21600, // 6 часов

        train: {
          name: '018А',
        },

        from: {
          datetime: 1717156800,

          city: {
            name: 'Москва',
          },

          railway_station_name:
            'Ленинградский вокзал',
        },

        to: {
          datetime: 1717178400,

          city: {
            name:
              'Санкт-Петербург',
          },

          railway_station_name:
            'Московский вокзал',
        },

        min_price: 4100,
      },
    },
  ],
};

export async function searchRoutes(
  params
) {
  try {
    console.log(
      'SEARCH PARAMS:',
      params
    );

    const response =
      await api.get(
        '/routes',
        {
          params,
          timeout: 7000,
        }
      );

    return (
      response.data || {
        items: [],
        total_count: 0,
      }
    );
  } catch (error) {
    console.error(
      'API routes timeout → используем mock'
    );

    return mockRoutes;
  }
}