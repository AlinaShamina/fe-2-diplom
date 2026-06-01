import PropTypes from 'prop-types';

function SearchFilters({
  filters,
  setFilters,
}) {
  const handleCheckbox = (event) => {
    const { name, checked } =
      event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSort = (event) => {
    setFilters((prev) => ({
      ...prev,
      sort: event.target.value,
    }));
  };

  return (
    <aside className="search-filters">
      <h2 className="search-filters__title">
        Фильтры
      </h2>

      <div className="search-filters__section">
        <h3>Тип вагона</h3>

        <label>
          <input
            type="checkbox"
            name="have_first_class"
            checked={
              filters.have_first_class
            }
            onChange={handleCheckbox}
          />
          Люкс
        </label>

        <label>
          <input
            type="checkbox"
            name="have_second_class"
            checked={
              filters.have_second_class
            }
            onChange={handleCheckbox}
          />
          Купе
        </label>

        <label>
          <input
            type="checkbox"
            name="have_third_class"
            checked={
              filters.have_third_class
            }
            onChange={handleCheckbox}
          />
          Плацкарт
        </label>

        <label>
          <input
            type="checkbox"
            name="have_fourth_class"
            checked={
              filters.have_fourth_class
            }
            onChange={handleCheckbox}
          />
          Сидячий
        </label>
      </div>

      <div className="search-filters__section">
        <h3>Дополнительно</h3>

        <label>
          <input
            type="checkbox"
            name="have_wifi"
            checked={filters.have_wifi}
            onChange={handleCheckbox}
          />
          Wi-Fi
        </label>

        <label>
          <input
            type="checkbox"
            name="have_air_conditioning"
            checked={
              filters.have_air_conditioning
            }
            onChange={handleCheckbox}
          />
          Кондиционер
        </label>

        <label>
          <input
            type="checkbox"
            name="have_express"
            checked={
              filters.have_express
            }
            onChange={handleCheckbox}
          />
          Экспресс
        </label>
      </div>

      <div className="search-filters__section">
        <h3>Сортировка</h3>

        <select
          value={filters.sort}
          onChange={handleSort}
        >
          <option value="">
            Без сортировки
          </option>

          <option value="date">
            По дате
          </option>

          <option value="price">
            По цене
          </option>

          <option value="duration">
            По времени в пути
          </option>
        </select>
      </div>
    </aside>
  );
}
SearchFilters.propTypes = {
  filters: PropTypes.shape({
    have_first_class: PropTypes.bool,
    have_second_class: PropTypes.bool,
    have_third_class: PropTypes.bool,
    have_fourth_class: PropTypes.bool,
    have_wifi: PropTypes.bool,
    have_air_conditioning: PropTypes.bool,
    have_express: PropTypes.bool,
    sort: PropTypes.string,
  }).isRequired,

  setFilters: PropTypes.func.isRequired,
};

export default SearchFilters;