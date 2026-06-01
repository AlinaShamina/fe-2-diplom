import PropTypes from 'prop-types';

import {
  useEffect,
  useState,
} from 'react';

import {
  searchCities,
} from '../../services/citiesService';

function CityAutocomplete({
  placeholder,
  value,
  onChange,
}) {
  const [cities, setCities] =
    useState([]);

  const [
    showDropdown,
    setShowDropdown,
  ] = useState(false);

  useEffect(() => {
    async function loadCities() {
      if (
        !value ||
        value.length < 2
      ) {
        setCities([]);
        setShowDropdown(
          false
        );

        return;
      }

      const data =
        await searchCities(
          value
        );

      console.log(
        'Cities found:',
        data
      );

      setCities(data);

      setShowDropdown(
        data.length > 0
      );
    }

    const timeout =
      setTimeout(
        loadCities,
        250
      );

    return () =>
      clearTimeout(
        timeout
      );
  }, [value]);

  function handleSelectCity(
    city
  ) {
    onChange(
      city.name
    );

    setShowDropdown(
      false
    );
  }

  return (
    <div className="city-autocomplete">
      <input
        type="text"
        placeholder={
          placeholder
        }
        className="search-form__input"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        onFocus={() =>
          setShowDropdown(
            cities.length > 0
          )
        }
        onBlur={() =>
          setTimeout(
            () =>
              setShowDropdown(
                false
              ),
            150
          )
        }
      />

      {showDropdown && (
        <ul className="city-autocomplete__dropdown">
          {cities.map(
            (city) => (
              <li
                key={
                  city._id
                }
                className="city-autocomplete__item"
                onMouseDown={() =>
                  handleSelectCity(
                    city
                  )
                }
              >
                {city.name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

CityAutocomplete.propTypes =
  {
    placeholder:
      PropTypes.string,

    value:
      PropTypes.string
        .isRequired,

    onChange:
      PropTypes.func
        .isRequired,
  };

export default CityAutocomplete;