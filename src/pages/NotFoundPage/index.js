import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'

const NotFoundPage = ({ location }) => {
    console.log(location);
    return (
        <Fragment>
            <Helmet>
                <title>Twitelum - Login</title>
            </Helmet>
            <div className="container">
                A URL <strong>{location.pathname}</strong> não existe no Twitelum, se
                quiser voltar para a <Link to="/">página inicial basta clicar aqui</Link>
            </div>
        </Fragment>
    )
}

export default NotFoundPage