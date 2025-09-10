import Header from '../../components/Header/Header';
import { FrozenBull_Icon } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginInput_data, setLoginInput_data] = useState('');
  const [loginState, setLoginState] = useState(0);

  const handleNextButton_Event = () => {
    if (!loginInput_data || loginInput_data.trim() === '') {
      alert('Por favor, preencha o email antes de continuar.');
      return;
    }
    sessionStorage.setItem('loginEmail', loginInput_data);
    setLoginInput_data('');
    setLoginState(1);
  };

  const handlePrevButton_Event = () => {
    sessionStorage.setItem('loginPassword', loginInput_data);
    setLoginInput_data(sessionStorage.getItem('loginEmail') || '');
    setLoginState(0);
  };

  const handleLoginSubmit = () => {
    if (!loginInput_data || loginInput_data.trim() === '') {
      alert('Por favor, preencha a senha antes de continuar.');
      return;
    }
    sessionStorage.setItem('loginPassword', loginInput_data);
    // TODO: Implement login logic here
    alert('action not implemented');
  };

  useEffect(() => {
    if (!loginInput_data) {
      switch (loginState) {
        case 0:
          setLoginInput_data(sessionStorage.getItem('loginEmail'));
          setEmail(sessionStorage.getItem('loginEmail'));

        case 1:
          setLoginInput_data(sessionStorage.getItem('loginPassword'));
          setPassword(sessionStorage.getItem('loginPassword'));
      }
    }
  }, []);

  useEffect(() => {
    switch (loginState) {
      case 0:
        setEmail(loginInput_data);
      case 1:
        setPassword(loginInput_data);
    }
  }, []);

  return (
    <main className="login-container">
      <Header returnPage={'landingPage'} state={'dinamic'} />
      <form action="post" className="login-content" onsubmit={() => {
        // Validade password and email
        // send this data to the next page via url
      }}>
        <section className="loginForm-Header">
          <img src={FrozenBull_Icon} alt="FrozenBull_Icon" />
          <p>FrozenBull</p>
        </section>
        <section className="loginForm-content">
          <h1>Login</h1>
          <input
            type={loginState === 0 ? 'email' : 'password'}
            name="loginInput-input"
            id="loginInput-input"
            placeholder={loginState === 0 ? 'Email' : 'Senha'}
            value={loginInput_data || ''}
            onChange={e => {
              setLoginInput_data(e.target.value);
            }}
            required
          />
          <div className="createAccountLink-container">
            <span>Sem conta?</span>
            <a
              className="createAccount-text"
              onClick={() => {
                navigate('/SignUp');
              }}
            >
              Crie uma!
            </a>
          </div>
        </section>
        <section className="loginForm-buttons">
          <button
            className="prev-button"
            type="button"
            onClick={() => {
              loginState === 0 ? navigate('/') : handlePrevButton_Event();
            }}
          >
            anterior
          </button>
          <button
            className="next-button"
            type="button"
            onClick={() => {
              loginState === 0 ? handleNextButton_Event() : handleLoginSubmit();
            }}
          >
            Próximo
          </button>
        </section>
      </form>
    </main>
  );
};

export default Login;
