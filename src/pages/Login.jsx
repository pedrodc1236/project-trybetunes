import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../Componentes/Loading';

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
      <div data-testid="page-login">
        <form>

          <label htmlFor="name-input">
            <input
              id="name-input"
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.haddleChange }
            />
          </label>

          <button
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
