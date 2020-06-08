import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logOutAction } from '../../redux/userDuck';
import styles from "./layouts.module.css";



function header({loggedIn, logOutAction}){
	function logOut(){
		logOutAction()
	}
	return (
		<header className="container is-fullhd">
			<div className="columns">
				<div className="column">
					<NavLink className="link" activeClassName="active" exact to="/">Inicio</NavLink>
				</div>
				{loggedIn?<div className="column">
					<NavLink className="link" activeClassName="active" exact to="/admin">Admin</NavLink>
				</div>:<div className="column">
					<NavLink className="link" activeClassName="active" exact to="/register">Registro</NavLink>
				</div>}
				{loggedIn?<div className="column">
					<a className="link" onClick={logOut}>Cerrar sesión</a>
				</div>:<div className="column">
					<NavLink className="link" activeClassName="active" exact to="/login">Login</NavLink>
				</div>}
			</div>
		</header>
	)
}

function mapState({ user: { loggedIn } }) {
	return {
		loggedIn,
	};
}


export default connect( mapState, { logOutAction })(header)
