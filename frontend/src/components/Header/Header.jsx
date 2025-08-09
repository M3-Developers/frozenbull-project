import {FrozenBull_Logo} from "../../assets/images";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <img src={FrozenBull_Logo} alt="FrozenBull-Logo" />
      <nav>
        <a onClick={() => {alert("Action Not implemented")}}>Reserva</a>
        <a onClick={() => {alert("Action Not implemented")}}>Funcionamento</a>
        <a onClick={() => {alert("Action Not implemented")}}>Ajuda</a>
      </nav>
    </header>
  );
};

export default Header;
