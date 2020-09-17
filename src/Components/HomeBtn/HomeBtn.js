import React from 'react'
import classes from "./HomeBtn.module.css"
import home from "../../img/home.png";
import { BrowserRouter, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function HomeBtn(props) {
    const history = useHistory();

    const routeChange = (path) =>{ 
        history.go(path);
      }

    return (
        <div className={classes.HomeBtn} onClick={() => {
            routeChange("/")
        }}>
            <BrowserRouter>
                <NavLink to="/" >
                    <img className={classes.HomeImg} src={home} alt="Home button"/>
                </NavLink>
            </BrowserRouter>
        </div>
    )
}
export default HomeBtn
