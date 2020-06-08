import { auth, provider } from '../firebase';
let initialData = {
	loggedIn:false,
	fetching:false
}
const LOGIN = 'LOGIN';
let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let LOGIN_ERROR = 'LOGIN_ERROR';
let LOGIN_REGISTER = 'LOGIN_REGISTER';
const LOG_OUT = "LOG_OUT";

export default function reducer(state = initialData, action){
	switch(action.type){
		case LOGIN:
			return { ...state, fetching: true }
		case LOGIN_SUCCESS:
			return { ...state, fetching: false, ...action.payload, loggedIn: true }
		case LOGIN_REGISTER:
			return { ...state, fetching: false, ...action.payload, loggedIn: true }
		case LOGIN_ERROR:
			return { ...state, fetching:false, error: action.payload }
		case LOG_OUT:
				return { ...initialData };
		default:
			return state
	}
}

function saveStorage(storage){
	localStorage.storage = JSON.stringify(storage);
}



export let logOutAction = () => (dispatch, getState) => {
	auth.signOut();
	dispatch({
		type: LOG_OUT,
	});
	localStorage.removeItem("storage");
};

export let restoreSessionAction = () => (dispatch, getState) => {
	let storage = localStorage.storage;
	storage = storage ? JSON.parse(storage) : null;
	if (storage && storage.user) {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: storage.user,
		});
	}
};

export let doLoginEmailAndPass = (e)=>(dispatch, getState)=>{
	dispatch({
		type: LOGIN
	});
	return auth.signInWithEmailAndPassword(e.email, e.pass).then((res)=>{
		dispatch({
			type: LOGIN_REGISTER,
			payload: {
				uid: res.user.uid,
				email: res.user.email
			}
		});
		saveStorage( getState() )
	}).catch((err)=>{
		console.log('err', err)
		dispatch({
			type: LOGIN_ERROR,
			payload: err.message
		});
	})
}

export let doRegisterEmailAndPass = (e)=>(dispatch, getState)=>{
	dispatch({
		type: LOGIN
	});
	return auth.createUserWithEmailAndPassword(e.email, e.pass).then((res)=>{
		console.log('res', res, res.user.email, res.user.uid)
		dispatch({
			type: LOGIN_REGISTER,
			payload: {
				uid: res.user.uid,
				email: res.user.email
			}
		});
		saveStorage( getState() )
	}).catch((err)=>{
		console.log('err', err)
		dispatch({
			type: LOGIN_ERROR,
			payload: err.message
		});
	})
}

export let doGoogleLoginAction = ()=> (dispatch, getState) =>{
	dispatch({
		type: LOGIN
	});
	return auth.signInWithPopup(provider).then((snap) => {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				uid: snap.user.uid,
				displayName: snap.user.displayName,
				photoURL: snap.user.photoURL,
				email: snap.user.email
			}
		});
		saveStorage( getState() )
	}).catch(e=>{
		console.log(e);
		dispatch({
			type: LOGIN_ERROR,
			payload: e.message
		});
	});
}
