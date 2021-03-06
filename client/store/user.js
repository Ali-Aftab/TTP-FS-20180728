import axios from "axios";
import history from "../history";
import * as _fetch from "isomorphic-fetch";

//Public Token
let token = "PLACE YOUR TOKEN HERE";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const GET_STOCK = "GET_STOCK";
const BUY_STOCK = "BUY_STOCK";
const ALL_TRANSACTION = "ALL_TRANSACTION";
const GET_COMPANIES = "GET_COMPANIES";

const defaultUser = {
  userInfo: {},
  stock: [],
  transactions: [],
  companies: []
};

const getStock = data => ({ type: GET_STOCK, data });
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const buyStock = data => ({ type: BUY_STOCK, data });
const allTransaction = data => ({ type: ALL_TRANSACTION, data });
const addCompanies = data => ({ type: GET_COMPANIES, data });

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
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const getAllStock = userId => async dispatch => {
  try {
    const res = await axios(`/api/stock/all/${userId}`);
    dispatch(getStock(res.data));
    let companies = [];
    for (let i = 0; i < res.data.length; i++) {
      const oneStock = res.data[i];
      companies.push(oneStock.name);
    }
    if (companies.length) {
      const companyComma = companies.join(",");
      const url =
        "https://cloud.iexapis.com/stable/stock/market/batch?symbols=" +
        companyComma +
        "&types=quote,news,chart&range=1m&last=5&token=" +
        token;
      let stockInfo = {};
      const what = await fetch(url)
        .then(res => res.json())
        .then(out => {
          stockInfo = out;
        })
        .catch(err => {
          throw err;
        });
      for (let i = 0; i < res.data.length; i++) {
        let com = res.data[i];
        stockInfo[com.name].amount = com.amount;
        const latestPrice = Number(stockInfo[com.name].quote.latestPrice);
        const open = Number(stockInfo[com.name].quote.open);
        if (latestPrice > open) {
          stockInfo[com.name].color = "green";
        } else if (latestPrice < open) {
          stockInfo[com.name].color = "red";
        } else {
          stockInfo[com.name].color = "black";
        }
      }
      dispatch(addCompanies(stockInfo));
    }
  } catch (error) {
    console.error(error);
  }
};

export const allTransactions = userId => async dispatch => {
  try {
    const res = await axios(`/api/stock/transactions/${userId}`);
    dispatch(allTransaction(res.data));
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
    case ALL_TRANSACTION:
      return { ...state, transactions: action.data };
    case GET_COMPANIES:
      return { ...state, companies: action.data };
    default:
      return state;
  }
}
