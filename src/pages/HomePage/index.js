import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'

import Cabecalho from '../../components/Cabecalho'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal  from '../../components/Modal'

import { TweetsService } from "../../services/TweetsService";

import { ReactReduxContext } from "react-redux";

import { TweetsThunkActions } from "../../stores/ducks/tweets"

class HomePage extends Component {
    static contextType = ReactReduxContext;

    constructor() {
        super();
        this.state = {
            novoTweet: "",
            tweets: [],
            tweetAtivoNoModal: {}
        }
    }

    componentDidMount() {
        const store = this.context.store;

        store.subscribe(() => {
            this.setState({
                tweets: store.getState().tweets.data
            })
        })

        store.dispatch(TweetsThunkActions.carregaTweets());
        // TweetsService
        //     .carrega()
        //     .then(tweets => {store.dispatch({ type: 'CARREGA_TWEETS', tweets });})
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault();

        if(this.state.novoTweet.length > 0) {
            TweetsService.adiciona(this.state.novoTweet)
                .then((tweetVindoDoServidor) => {
                    this.setState({
                        tweets: [tweetVindoDoServidor, ...this.state.tweets],
                        novoTweet: ""
                    })
                })
        }
    }

    removeTweet(idTweetQueVaiSerRemovido) {
        TweetsService.remove(idTweetQueVaiSerRemovido)
            .then((response) => {
                console.log(response)
                const listaDeTweetsAtualizada = this.state.tweets.filter( (tweet) => tweet._id !== idTweetQueVaiSerRemovido )
                this.setState({
                    tweets: listaDeTweetsAtualizada
                });
                this.fechaModal()
            }
        )
    }

    abreModal = (tweetQueVaiProModal) => {
        this.setState({
            tweetAtivoNoModal: tweetQueVaiProModal
        }, () => {
            console.log(this.state.tweetAtivoNoModal)
        })
    }

    fechaModal = () => this.setState({ tweetAtivoNoModal: {} });

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
                                            id={tweetInfo._id}
                                            texto={tweetInfo.conteudo}
                                            usuario={tweetInfo.usuario}
                                            likeado={tweetInfo.likeado}
                                            totalLikes={tweetInfo.totalLikes}
                                            removivel={tweetInfo.removivel}
                                            removeHandler={() => this.removeTweet(tweetInfo._id)}
                                            onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo)}
                                        />
                                    )
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal
                    isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
                    onFechando={this.fechaModal}
                >
                    {() => (
                        <Tweet
                            id={this.state.tweetAtivoNoModal._id}
                            usuario={this.state.tweetAtivoNoModal.usuario}
                            texto={this.state.tweetAtivoNoModal.conteudo}
                            likeado={this.state.tweetAtivoNoModal.likeado}
                            totalLikes={this.state.tweetAtivoNoModal.totalLikes}
                            removivel={this.state.tweetAtivoNoModal.removivel}
                            removeHandler={() => this.removeTweet(this.state.tweetAtivoNoModal._id)}
                        />
                    )}
                </Modal>
            </Fragment>
        );
    }
}

export default HomePage;