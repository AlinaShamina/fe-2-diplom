import {
  useState,
} from 'react';

function PassengerForm({
  index,
}) {

  const [
    form,
    setForm,
  ] = useState({

    first_name: '',
    last_name: '',
    patronymic: '',

    gender: true,

    birthday: '',

    document_type:
      'passport',

    document_data: '',
  });

  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (

    <div className="passenger-card">

      <h2>
        Пассажир {index + 1}
      </h2>

      <div className="passenger-grid">

        <input
          name="last_name"
          placeholder="Фамилия"
          value={form.last_name}
          onChange={handleChange}
        />

        <input
          name="first_name"
          placeholder="Имя"
          value={form.first_name}
          onChange={handleChange}
        />

        <input
          name="patronymic"
          placeholder="Отчество"
          value={form.patronymic}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
        />

      </div>

    </div>
  );
}

export default PassengerForm;