export const LoginService = {
    logar({login,senha}) {
        return(
            fetch("https://twitelum-api.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login,senha})
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
                    localStorage.setItem("TOKEN", token);
                    return;
                }
                
                throw new Error("Token not found");
            })
        )
    }
}