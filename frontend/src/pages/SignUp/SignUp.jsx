import './SignUp.css';
import { FrozenBull_Logo } from '../../assets/images';
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  // Input Values
  const [fullName_value, setFullName_value] = useState(() => {
    // u_value === user_value
    return localStorage.getItem('u_fullName') || '';
  });
  const [dateInput_type, setDateInput_type] = useState('text');
  const [birthDate_value, setBirthDate_value] = useState('');
  const [cpf_value, setCpf_value] = useState('');
  const [email_value, setEmail_value] = useState('');
  const [phoneNumber_value, setPhoneNumber_value] = useState('');
  const [cep_value, setCep_value] = useState('');
  const [AddressNumber_value, setAddressNumber_value] = useState('');
  const [termsOfService_value, setTermsOfService_value] = useState(false);
  const [userDataCompleted, setUserDataCompleted] = useState(false);
  const [signUp_state, setSignUp_state] = useState('collectData');
  const [password_value, setPassword_value] = useState('');
  const [confirmPassword_value, setConfirmPassword_value] = useState('');
  const [passwordError_message, setPasswordError_message] = useState('');

  // validate if any input is null
  const validateData = () => {
    if (
      !fullName_value ||
      fullName_value.trim() === '' ||
      !birthDate_value ||
      birthDate_value.trim() === '' ||
      !email_value ||
      email_value.trim() === '' ||
      !phoneNumber_value ||
      phoneNumber_value.trim() === '' ||
      !cep_value ||
      cep_value.trim() === '' ||
      !AddressNumber_value ||
      AddressNumber_value.trim() === ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  // Cpf validation

  const validateCpf = cpf => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  };

  // next button event
  const handleUserData_event = () => {
    if (validateData() && validateCpf(cpf_value)) {
      if (termsOfService_value) {
        setUserDataCompleted(true);
        setSignUp_state('createPassword');
      } else {
        alert('leia e aceite os termos de serviço antes de prosseguir.');
      }
    } else if (!validateData() && validateCpf(cpf_value)) {
      alert('preencha todos os campos antes de prosseguir.');
      console.log(validateData() + ', ' + validateCpf(cpf_value));
    } else {
      alert('cpf inválido');
      console.log(validateData() + ', ' + validateCpf(cpf_value));
    }
  };

  // validate if any password is different
  const validatePassword = () => {
    if (
      password_value === confirmPassword_value &&
      password_value.trim() !== '' &&
      confirmPassword_value.trim() !== ''
    ) {
      // adicionar codigo continuação do signup
    } else if (
      password_value.trim() === '' &&
      confirmPassword_value.trim() === ''
    ) {
      setPasswordError_message('Os campos estão em branco...');
    } else {
      setPasswordError_message('As senhas não conferem entre sí.');
    }
  };

  // ---- useEffects ---- //
  // useEffect(() => {
  //   if (!validateData() || !userDataCompleted) {
  //     setSignUp_state('collectData');
  //   }
  //   // else {
  //   //   setSignUp_state('createPassword');
  //   // }
  // }, [
  //   fullName_value,
  //   birthDate_value,
  //   email_value,
  //   phoneNumber_value,
  //   cep_value,
  //   AddressNumber_value,
  //   userDataCompleted,
  //   validateData,
  // ]);

  return (
    <main className="signUp-container">
      <Header returnPage={'landingPage'} showNavbar={false} state={'dinamic'} />
      <h1 className="signUp-Title">Cadastro</h1>

      {signUp_state !== 'collectData' && !userDataCompleted ? (
        //userData container

        <section className="signUp-content">
          <aside className="userData-container">
            <img src={FrozenBull_Logo} alt="frozenBull_logo" />
            <h2>Informações Pessoais</h2>
            <input
              type="text"
              id="Name"
              placeholder="Nome Completo"
              value={fullName_value}
              onChange={e => {
                setFullName_value(e.target.value);
                localStorage.setItem('u_fullName', e.target.value);
              }}
            />
            <input
              type={dateInput_type}
              onChange={e => {
                setBirthDate_value(e.target.value);
              }}
              onFocus={() => {
                setDateInput_type('date');
              }}
              onBlur={() => {
                if (!birthDate_value) {
                  setDateInput_type('text');
                }
              }}
              id="birthDate"
              placeholder="Data de Nascimento"
            />
            <input
              type="text"
              id="cpf"
              placeholder="CPF"
              onChange={e => {
                setCpf_value(e.target.value);
              }}
            />
            <div className="createAccountLink-container">
              <span>Já tem uma conta?</span>
              <a
                className="createAccount-text"
                onClick={() => {
                  navigate('/Login');
                }}
              >
                conecte-se!
              </a>
            </div>
          </aside>

          <aside className="userAdress-container">
            <h2>Contato e Endereço</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={e => {
                setEmail_value(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Telefone"
              onChange={e => {
                setPhoneNumber_value(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="CEP"
              onChange={e => {
                setCep_value(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Número"
              onChange={e => {
                setAddressNumber_value(e.target.value);
              }}
            />
            <div className="checkbox-Container">
              <input
                type="checkbox"
                name="termsOfService_input"
                id="termsOfService_input"
                onClick={() => {
                  setTermsOfService_value(!termsOfService_value);
                }}
              />
              <span>Termos de serviço</span>
            </div>
            <section className="button-container">
              <button
                className="signUpPrev-button"
                onClick={() => {
                  navigate('/');
                }}
              >
                Anterior
              </button>
              <button
                className="signUpNext-button"
                onClick={() => {
                  handleUserData_event();
                }}
              >
                Próximo
              </button>
            </section>
          </aside>
        </section>
      ) : (
        <section className="passwordConfirmation-container">
          <h2>Definir Senha</h2>
          <section className="passwordInput-container">
            <input
              type="password"
              name="password"
              onChange={e => {
                setPassword_value(e.target.value);
              }}
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={e => {
                setConfirmPassword_value(e.target.value);
              }}
            />
            {passwordError_message ? (
              <span className="passwordError-message">
                {passwordError_message}
              </span>
            ) : null}
          </section>
          <section className="passwordButton-container">
            <button
              className="passwordPrev-button"
              onClick={() => {
                setSignUp_state('createPassword');
              }}
            >
              Anterior
            </button>
            <button
              className="passwordNext-button"
              onClick={() => {
                validatePassword();
              }}
            >
              Cadastrar
            </button>
          </section>
        </section>
      )}
    </main>
  );
};

export default SignUp;
