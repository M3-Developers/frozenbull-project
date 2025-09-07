import { FrozenBull_Icon, FrozenBull_Logo } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import './Header.css';


const Header = ({returnPage, state, showNavbar, showUser}) => {
  const navigate = useNavigate();
  return (
    <header className={`header-container ${state === "dinamic" ? "dinamicHeader" : null }`}>
      <img
        src={FrozenBull_Logo}
        alt="FrozenBull-Logo"
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
      {showUser ? <img src={FrozenBull_Icon}/> : null}
    </header>
  );
};

export default Header;
