import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../Componentes/Loading';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      disabledBtn: true,
      loading: false,
      redirect: false,
    };
    this.haddleBtnDisabled = this.haddleBtnDisabled.bind(this);
    this.haddleChange = this.haddleChange.bind(this);
  }

  // Função para fazer a requisição sobre a função createUser e setar o loading e o redirect para que apareça o "carregando..." e depois seja redirecionado para a page "Search"
  haddleLoginCreateUser = async () => {
    const { nameLogin } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: nameLogin });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  // Função para habilitar o botão somente se tiver mais de 3 caracters digitados no input
  haddleBtnDisabled() {
    const { nameLogin } = this.state;
    const MIN_LENGTH_NAME = 3;
    if (nameLogin.length >= MIN_LENGTH_NAME) {
      this.setState({
        disabledBtn: false,
      });
    } else {
      this.setState({
        disabledBtn: true,
      });
    }
  }

  // Função para pegar o target do nome e do valor e fazer com que o onChange faça a atribuição do que for digitado para o state com o mesmo nome, dessa forma o state pega o valor do que for digitado e depois é passado o valor para o input com o name exatamente igual ao state.
  haddleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.haddleBtnDisabled);
  }

  render() {
    const {
      nameLogin,
      disabledBtn,
      loading,
      redirect,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="login-div" data-testid="page-login">
        <form className="login-form">

          <label htmlFor="name-input">
            <input
              className="name-input"
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.haddleChange }
            />
          </label>

          <button
            className="btn-form"
            disabled={ disabledBtn }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.haddleLoginCreateUser }
          >
            Entrar
          </button>

        </form>
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
