import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  const location = useLocation();

  function handleScroll(id) {

    if (location.pathname !== '/') {

      navigate('/');

      setTimeout(() => {

        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: 'smooth',
          });

      }, 100);

      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  }

  return (
    <header className="header">

      <div className="header__top">
        <div className="container">

          <Link
            to="/"
            className="header__logo"
          >
            Лого
          </Link>

        </div>
      </div>

      <nav className="header__nav">
        <div className="container">

          <ul className="header__menu">

            <li>
              <button
                type="button"
                onClick={() =>
                  handleScroll('about')
                }
              >
                О нас
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  handleScroll('how-it-works')
                }
              >
                Как это работает
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  handleScroll('reviews')
                }
              >
                Отзывы
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  handleScroll('contacts')
                }
              >
                Контакты
              </button>
            </li>

          </ul>

        </div>
      </nav>

    </header>
  );
}

export default Header;