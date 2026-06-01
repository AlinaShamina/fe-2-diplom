import MainLayout from '../components/layout/MainLayout';
import SearchForm from '../components/home/SearchForm';

function HomePage() {
  return (
    <MainLayout>
      <main className="home-page">
        {/* HERO */}

        <section className="hero">
          <div className="container">
            <div className="hero__inner">
              <div className="hero__text">
                <h1 className="hero__title">
                  Вся жизнь —
                  <br />
                  путешествие!
                </h1>

                <p className="hero__subtitle">
                  Быстрый поиск
                  железнодорожных билетов
                  по всей России
                </p>
              </div>

              <div className="hero__search">
                <SearchForm />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="about-section"
        >
          <div className="container">
            <h2 className="section-title">
              О нас
            </h2>

            <div className="about-content">
              <p>
                Мы создаём удобную
                систему бронирования
                железнодорожных билетов,
                чтобы путешествия были
                быстрыми, комфортными
                и понятными.
              </p>

              <p>
                Выбирайте поезд,
                вагон, места,
                дополнительные услуги
                и оформляйте поездку
                всего за несколько минут.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}

        <section
          id="how-it-works"
          className="how-section"
        >
          <div className="container">
            <h2 className="section-title">
              Как это работает
            </h2>

            <div className="how-grid">
              <div className="how-card">
                <img
                  src="/assets/train.svg"
                  alt="Поезд"
                />

                <h3>
                  Выберите поезд
                </h3>

                <p>
                  Найдите маршрут
                  и выберите
                  подходящий поезд
                </p>
              </div>

              <div className="how-card">
                <img
                  src="/assets/wifi.svg"
                  alt="Услуги"
                />

                <h3>
                  Выберите услуги
                </h3>

                <p>
                  Wi-Fi, бельё,
                  кондиционер
                  и другие опции
                </p>
              </div>

              <div className="how-card">
                <img
                  src="/assets/rocket.svg"
                  alt="Бронирование"
                />

                <h3>
                  Забронируйте
                </h3>

                <p>
                  Оформите билет
                  быстро
                  и безопасно
                </p>
              </div>

              <div className="how-card">
                <img
                  src="/assets/blanket.svg"
                  alt="Комфорт"
                />

                <h3>
                  Путешествуйте
                </h3>

                <p>
                  Наслаждайтесь
                  комфортной поездкой
                </p>
              </div>
            </div>

            <div className="features">
              <div className="feature-item">
                <img
                  src="/assets/wifi.svg"
                  alt=""
                />

                <span>
                  Wi-Fi
                </span>
              </div>

              <div className="feature-item">
                <img
                  src="/assets/air.svg"
                  alt=""
                />

                <span>
                  Кондиционер
                </span>
              </div>

              <div className="feature-item">
                <img
                  src="/assets/blanket.svg"
                  alt=""
                />

                <span>
                  Бельё
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}

        <section
          id="reviews"
          className="reviews-section"
        >
          <div className="container">
            <h2 className="section-title">
              Отзывы
            </h2>

            <div className="reviews-grid">
              <div className="review-card">
                <h3>
                  Ирина
                </h3>

                <p>
                  Очень удобный
                  сервис. Всё быстро,
                  интерфейс понятный,
                  билеты пришли сразу.
                </p>
              </div>

              <div className="review-card">
                <h3>
                  Александр
                </h3>

                <p>
                  Понравился выбор
                  мест в вагоне.
                  Намного удобнее,
                  чем у конкурентов.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTS */}

        <section
          id="contacts"
          className="contacts-section"
        >
          <div className="container">
            <h2 className="section-title">
              Свяжитесь с нами
            </h2>

            <div className="contacts-grid">
              <div className="contact-item">
                <img
                  src="/assets/phone.svg"
                  alt=""
                />

                <span>
                  8 (800) 555-35-35
                </span>
              </div>

              <div className="contact-item">
                <img
                  src="/assets/mail.svg"
                  alt=""
                />

                <span>
                  support@tickets.ru
                </span>
              </div>

              <div className="contact-item">
                <img
                  src="/assets/address.svg"
                  alt=""
                />

                <span>
                  Москва, ул. Ленина, 10
                </span>
              </div>
            </div>

            <div className="socials">
              <img
                src="/assets/youtube.svg"
                alt="Youtube"
              />

              <img
                src="/assets/vk.svg"
                alt="VK"
              />
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

export default HomePage;