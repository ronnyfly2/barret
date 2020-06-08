import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./views/home/HomePage";
import AdminPage from "./views/admin/AdminPage";
import RegisterPage from "./views/auth/RegisterPage";
import LoginPage from "./views/auth/LoginPage";

function PrivateRoute({ path, component, ...rest }) {
	let storage = localStorage.getItem("storage");
	storage = storage ? JSON.parse(storage) : null;
	if (storage && storage.user) {
		return <Route path={path} component={component} {...rest} />;
	} else {
		return <Redirect to="/" {...rest} />;
	}
}

export default function Routes() {
	return (
		<Switch>
			<PrivateRoute path="/admin" component={AdminPage} />
			<Route exact path="/" component={Home} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/login" component={LoginPage} />
		</Switch>
	);
}
