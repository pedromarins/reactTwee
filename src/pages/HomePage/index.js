import React, { Component, Fragment } from 'react';
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

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault();

        if(this.state.novoTweet.length > 0) {
            this.setState({
                tweets: [this.state.novoTweet, ...this.state.tweets],
                novoTweet: ""
            })
        }
    }

    render() {
        return (
        <Fragment>
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
                            {
                                this.state.tweets.map(
                                    (tweetInfo, index) => {
                                        return <Tweet 
                                            key={tweetInfo + index}
                                            texto={tweetInfo}
                                        />
                                    }
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
