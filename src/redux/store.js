import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer, { restoreSessionAction } from "./userDuck";
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
	user : userReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
	let store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	restoreSessionAction()(store.dispatch);
	return store
}
