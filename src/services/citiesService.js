import api from '../api/index';
import cities from '../mock/cities';

export async function searchCities(
  query
) {
  if (
    !query ||
    query.length < 2
  ) {
    return [];
  }

  try {
    const response =
      await api.get(
        '/routes/cities',
        {
          params: {
            name: query,
          },

          timeout: 1500,
        }
      );

    if (
      response.data &&
      response.data.length
    ) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.warn(
      'API cities timeout → используем mock'
    );

    return cities.filter(
      (city) =>
        city.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );
  }
}