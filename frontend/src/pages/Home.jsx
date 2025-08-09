import React from 'react';
import { useApiCall } from '../hooks/useApiCall';
import { userService } from '../services/userService';
import Loading from '../components/Loading/Loading';
import Header from '../components/Header/Header';
import ScrollingNumber from '../components/ScrollingNumber';
import Carroussel from '../components/Carroussel/Carroussel';
import Map from '../components/Map/Map';

import './Home.css';

import {
  FrozenBull_SecondLogo,
  Triangle_up,
  Triangle_down,
} from '../assets/images';
import Faq from '../components/Faq/Faq';

const faqItem = [
  {
    title: 'Faq1',
    content:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
  },
  {
    title: 'Faq2',
    content:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
  },
  {
    title: 'Faq3',
    content:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
  },
];

const Home = () => {
  const {
    data: apiResponse,
    loading,
    error,
    refetch,
  } = useApiCall(userService.getUsers, [], true);

  // // Extrair dados da resposta da API
  // const users = apiResponse?.data || [];
  // const apiMessage = apiResponse?.message;

  if (loading && !faqItem) return <Loading message="Carregando usuários..." />;

  if (error) {
    return (
      <div className="error-container">
        <h3>Erro ao carregar dados</h3>
        <p>{error.message}</p>
        <button onClick={refetch}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header />
      <Carroussel />

      <section className="slogan-container">
        <img src={FrozenBull_SecondLogo} alt="" />
        <h2>Investindo no seu happy hour!</h2>
      </section>

      <section className="percentExample-container">
        <h1>Sempre se adaptando ao seu dia?</h1>
        <div className="percent-container">
          <aside className="percent-content">
            <div className="percentImages-container">
              <img src={Triangle_down} alt="" className="pointers-image" />
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={1}
                  color="red"
                  duration={2000}
                  delay={500}
                  threshold={0.3}
                />
              </div>
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={5}
                  color="red"
                  duration={2000}
                  delay={700}
                  threshold={0.3}
                />
              </div>
            </div>
            <p className="percent-text">%</p>
            <p>Heineken</p>
          </aside>
          <aside className="percent-content">
            <div className="percentImages-container">
              <img src={Triangle_up} alt="" className="pointers-image" />
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={2}
                  color="green"
                  duration={2000}
                  delay={1000}
                  threshold={0.3}
                />
              </div>
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={5}
                  color="green"
                  duration={2000}
                  delay={1200}
                  threshold={0.3}
                />
              </div>
            </div>
            <p className="percent-text">%</p>
            <p>Monster</p>
          </aside>
          <aside className="percent-content">
            <div className="percentImages-container">
              <img src={Triangle_up} alt="" className="pointers-image" />
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={3}
                  color="green"
                  duration={2000}
                  delay={1500}
                  threshold={0.3}
                />
              </div>
              <div className="scrollingNumber-container">
                <ScrollingNumber
                  targetNumber={0}
                  color="green"
                  duration={2000}
                  delay={1700}
                  threshold={0.3}
                />
              </div>
            </div>
            <p className="percent-text">%</p>
            <p>Pepsi</p>
          </aside>
        </div>
      </section>

      <section className="aboutUs-container">
        <p className="aboutUs-title">Quem Somos?</p>
        <p className="aboutUs-text">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean. A small river named Duden flows by their place and
          supplies it with the necessary regelialia. It is a paradisematic
          country, in which roasted parts of sentences fly into your mouth. Even
          the all-powerful Pointing has no control about the blind texts it is
          an almost unorthographic life One day however a small line of blind
          text by the name of Lorem Ipsum decided to leave for the far World of
          Grammar.
        </p>
      </section>

      <section className="locationInfo-container">
        <Map />
        <aside className="locationInfo-content">
          <h3 className="locationInfo-title">Quando e onde atuamos?</h3>
          <p className="locationInfo-text">
            Nós atuamos próximos a [Endereco de algum lugar - n°] no endereço
            [Endereco Fisico] , e funcionamos das{' '}
            <span className="locationInfo-strongText">18hrs até as 2hrs</span>,
            sempre com reservas que devem ser feitas no local através{' '}
            <a
              onClick={() => {
                alert('Action not Implemented');
              }}
            >
              deste mesmo site
            </a>
            , a sua reserva será desfeita se ocorrer uma demora de mais de{' '}
            <span className="locationInfo-strongText">30 MINUTOS.</span>
          </p>
        </aside>
      </section>

      <section className="reservePlace-container">
        <button
          onClick={() => {
            alert('Action not Implemented');
          }}
        >
          Reserve seu lugar Aqui!!
        </button>
      </section>

      <section className="FAQ-container">
        <h4 className="FAQ-title">FAQ:</h4>
        <section className="FAQ-content">
          {faqItem.map((item, index) => (
            <Faq key={index} title={item.title} content={item.content} />
          ))}
        </section>
      </section>

      <footer className="footer-container"/>
    </div>
  );
};

export default Home;
