import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

import { NotificacaoContext } from '../../contexts/NotificacaoContext'  

class LoginPage extends Component {

    fazerLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault();
             
        const dadosDeLogin = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputSenha.value
        };

        fetch("https://twitelum-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosDeLogin)
        })
        .then(async responseDoServer => {
            if (!responseDoServer.ok) {
                const respostaDeErroDoServidor = await responseDoServer.json();
                const errorObj = Error(respostaDeErroDoServidor.message);
                errorObj.status = responseDoServer.status;
                throw errorObj;
            }

            return responseDoServer.json();
        })

        .then(dadosDoServidorEmObj => {
            const token = dadosDoServidorEmObj.token;

            if (token) {
                console.log(token)
                localStorage.setItem("TOKEN", token);
                this.props.history.push("/");
            }
        })
        .catch(err => {
            console.error(`[Erro ${err.status}]`, err.message);
        });
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" onSubmit={this.fazerLogin} action="/">
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input ref="inputLogin" className="loginPage__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input ref="inputSenha" className="loginPage__input" type="password" id="senha" name="senha"/>
                                </div>
                                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage