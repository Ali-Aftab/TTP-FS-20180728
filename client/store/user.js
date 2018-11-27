import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const GET_STOCK = "GET_STOCK";
const BUY_STOCK = "BUY_STOCK";

/**
 * INITIAL STATE
 */
const defaultUser = {
  userInfo: {},
  stock: []
};

/**
 * ACTION CREATORS
 */
const getStock = data => ({ type: GET_STOCK, data });
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const buyStock = data => ({ type: BUY_STOCK, data });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};
export const buyNewStock = (amount, stock, id) => async dispatch => {
  try {
    const res = await axios.post("/api/stock/buy", {
      amount,
      stock,
      id
    });
    dispatch(buyStock(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const getAllStock = userId => async dispatch => {
  try {
    const res = await axios(`/api/stock/all/${userId}`);
    dispatch(getStock(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};
export const login = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user };
    case REMOVE_USER:
      return defaultUser;
    case GET_STOCK:
      return { ...state, stock: action.data };
    case BUY_STOCK:
      return { ...state, cash: action.data.cash };
    default:
      return state;
  }
}
