import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'

import Cabecalho from '../../components/Cabecalho'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'


class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            novoTweet: "",
            tweets: []
        }
    }

    componentDidMount() {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then((tweets) => {
                this.setState({
                    tweets
                })
            })
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault();

        if(this.state.novoTweet.length > 0) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ conteudo: this.state.novoTweet })
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetVindoDoServidor) => {
                console.log(tweetVindoDoServidor)
                this.setState({
                    tweets: [tweetVindoDoServidor, ...this.state.tweets],
                    novoTweet: ""
                })
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Twitelum - ({`${this.state.tweets.length}`}) tweets</title>
                </Helmet>

                <Cabecalho usuario="@omariosouto" />
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                                <div className="novoTweet__editorArea">
                                    <span className={`
                                        novoTweet__status 
                                        ${
                                            this.state.novoTweet.length > 140
                                            ? 'novoTweet__status--invalido'
                                            : ''
                                        }
                                    `}>{this.state.novoTweet.length}/140</span>
                                    <textarea className="novoTweet__editor" 
                                            placeholder="O que está acontecendo?"
                                            value={this.state.novoTweet}
                                            onChange={ (event) => this.setState({ novoTweet: event.target.value })}>
                                    </textarea>
                                </div>
                                <button type="submit" 
                                        className="novoTweet__envia"
                                        disabled={ this.state.novoTweet.length === 0 || this.state.novoTweet.length > 140 }>Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                { this.state.tweets.map(
                                    (tweetInfo) => 
                                        <Tweet 
                                            key={tweetInfo._id}
                                            texto={tweetInfo.conteudo}
                                            usuario={tweetInfo.usuario}
                                        />
                                    )
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
