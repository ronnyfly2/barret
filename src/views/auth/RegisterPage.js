import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { doRegisterEmailAndPass, doGoogleLoginAction } from '../../redux/userDuck';
import FontAwesome from "react-fontawesome";

function registerPage({ loggedIn, fetching, doRegisterEmailAndPass, doGoogleLoginAction }){
	const emailRef = React.createRef();
	const passwordRef = React.createRef();
	function doLoginGoogle(){
		doGoogleLoginAction();
	}
	function redirect(){
		return (
			<Redirect to='/' />
		)
	}
	function doLogin(e){
		e.preventDefault();
		let form = {
			email: emailRef.current.value,
			pass: passwordRef.current.value
		}
		doRegisterEmailAndPass(form)
	}
	if(fetching) return <h2>Registrando...</h2>
	return (
		<Fragment>
			<div className="columns">
				<div className="column is-half is-offset-one-quarter">
					<h2>Registro</h2>
					<form onSubmit={doLogin} autoComplete="off">
						<div className="field">
							<label className="label">Email</label>
							<div className="control">
								<input className="input" autoComplete="off" name="email" ref={emailRef} type="email" placeholder="e.g. hola@gmail.com" />
							</div>
						</div>
						<div className="field">
							<label className="label">Password</label>
							<div className="control">
								<input className="input" autoComplete="off" name="password" ref={passwordRef} type="password" placeholder="password" />
							</div>
						</div>
						<button className="button is-success is-fullwidth" tyoe="submit">
							<span className="icon">
								<FontAwesome name="sign-in"></FontAwesome>
							</span>
							<span>Iniciar Sesion</span>
						</button>
					</form>
					<button className="button is-danger is-fullwidth mt-4" onClick={doLoginGoogle}>
						<span className="icon">
							<FontAwesome name="google"></FontAwesome>
						</span>
						<span>Login with Google</span>
					</button>
				</div>
			</div>
			{loggedIn? redirect(): null }
		</Fragment>
	)
}

function mapState({ user: { fetching, loggedIn } }) {
	return {
		fetching,
		loggedIn,
	};
}


export default connect( mapState, { doRegisterEmailAndPass, doGoogleLoginAction })(registerPage)

