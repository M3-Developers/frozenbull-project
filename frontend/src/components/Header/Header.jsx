import { FrozenBull_Icon, FrozenBull_Logo } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = ({ returnPage, state, showNavbar, showUser }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`header-container ${state === 'dinamic' ? 'dinamicHeader' : null}`}
    >
      <img
        src={FrozenBull_Logo}
        alt="FrozenBull-Logo"
        className="frozenBull-logo"
        onClick={() => {
          returnPage === 'landingPage'
            ? navigate('/')
            : alert('action Not Implemented');
        }}
      />
      {showNavbar ? (
        <nav>
          <a
            onClick={() => {
              navigate('/Login');
            }}
          >
            Reserva
          </a>
          <a
            onClick={() => {
              alert('Action Not implemented');
            }}
          >
            Funcionamento
          </a>
          <a
            onClick={() => {
              alert('Action Not implemented');
            }}
          >
            Ajuda
          </a>
        </nav>
      ) : null}
      {showUser ? (
        <img
          src={FrozenBull_Icon}
          className="userImage"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      ) : null}
      {showMenu ? (
        <section className="userMenu">
          <a href="https://example.com" className="userAnchor_border">
            Meus dados
          </a>
          <a href="https://example.com" className="userAnchor_border">
            Meus Pedidos
          </a>
          <a href="https://example.com">Ajuda</a>
        </section>
      ) : null}
    </header>
  );
};

export default Header;
