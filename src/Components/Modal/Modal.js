import React, { Fragment } from 'react';
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

function Modal(props) {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}>
                {
                    props.errorMessage ?
                        <p>{props.errorMessage} <strong>Sample data</strong> will be displayed. You can also try to load cinemas once more.
                            <p>
                                <button className={classes.BtnOk} onClick={props.modalClosed} >Ok</button>
                                <button className={classes.BtnReload} onClick={refreshPage}>Reload</button>
                            </p>
                        </p>
                        : null
                }
            </div>
        </Fragment>
    )
}

export default Modal
