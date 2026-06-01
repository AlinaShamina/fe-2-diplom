import PropTypes from 'prop-types';

function ProgressSteps({
  currentStep,
}) {

  const steps = [

    'Билеты',

    'Пассажиры',

    'Оплата',

    'Проверка',
  ];

  return (

    <div className="progress-steps">

      <div className="container">

        <div className="progress-steps__row">

          {steps.map(
            (
              step,
              index
            ) => {

              const stepNumber =
                index + 1;

              const isActive =
                currentStep >=
                stepNumber;

              return (

                <div
                  key={step}

                  className={`progress-step ${
                    isActive
                      ? 'active'
                      : ''
                  }`}
                >

                  <div className="progress-step__number">

                    {stepNumber}

                  </div>

                  <div className="progress-step__label">

                    {step}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

ProgressSteps.propTypes = {

  currentStep:
    PropTypes.number
      .isRequired,
};

export default ProgressSteps;