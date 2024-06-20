import { logOut, signInWithGoogle, logInWithEmailAndPassword } from "../../firebase";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './auth.actionTypes';

export const loginWithEmailAndPassword = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const userCredential = await logInWithEmailAndPassword(email, password);
    console.log('loginWithEmailAndPassword userCredential:', userCredential);
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
  } catch (error) {
    console.log('loginWithEmailAndPassword error:', error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const userCredential = await signInWithGoogle();
    console.log('loginWithGoogle userCredential:', userCredential);
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
  } catch (error) {
    console.log('loginWithGoogle error:', error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    await logOut();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};
