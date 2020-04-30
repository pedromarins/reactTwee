import React from "react"; 
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./modal.module.css"; 
import Widget from "../Widget";

export const Modal = ({ children, isAberto, onFechando }) => {
    function handleBlackAreaClick(infosDoEvento) {
        const isModalTag = infosDoEvento.target.classList.contains(styles.modal);
        if (isModalTag) onFechando && onFechando();
    }

    return (
        <div
            onClick={handleBlackAreaClick}
            className={classNames(styles.modal, {
                [styles.modalActive]: isAberto
            })}>

            <div>
                <Widget>{isAberto && children()}</Widget>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isAberto: PropTypes.bool.isRequired,
    onFechando: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
}

export default Modal