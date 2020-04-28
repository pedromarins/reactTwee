import React, { useState, createContext } from "react";
import "../assets/css/notificacao.css";
    
export const NotificacaoContext = createContext({
    msg: "",
    setMsg(newMsg) {}
});

export const NotificacaoContextProvider = ({ children }) => {
    const [msg, setMsg] = useState("");
    
    return (
        <NotificacaoContext.Provider 
            value={{ msg, setMsg }}>
            {children}
            
            {msg && (
                <div className="notificacaoMsg" onAnimationEnd={() => setMsg("")}>
                    {msg}
                </div>
            )}
        </NotificacaoContext.Provider>
    )
};
 