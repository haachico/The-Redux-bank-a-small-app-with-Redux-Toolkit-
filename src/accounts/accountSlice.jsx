import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initial State

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

export const convertingCurrency = createAsyncThunk(
  "account/convertingCurrency",
  async ({ amount, currency }) => {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    console.log(res, "RES");

    const data = await res.json();
    console.log(data, "DATA");

    const converted = data.rates.USD;
    return converted;
  }
);

console.log(convertingCurrency, "EHEHE");

//createSlice automates the action creators, also it kinda mutates the states in the reducer directly
const accountSlice = createSlice({
  name: "account",
  initialState,
  //reducer for each action in reducers object
  reducers: {
    //basically we say "account/deposit" in classic redux (where action creator function is given the "/" ke aage vaala naam), similarly here also we say "/" ke aage vaala. ie deposit here.

    //
    deposit: {
      prepare(amount, currency) {
        return {
          payload: { amount, currency }
        };
      },
      reducer(state, action) {
        state.balance = state.balance + action.payload.amount;
        state.isLoading = false;
      }
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },

    requestForLoan: {
      //Since in redux tool kid, we can't directly payload in the form of object like in useReducer and in Classic redux, we do this to achive the same thing
      prepare(amount, loanPurpose) {
        return {
          payload: { amount, loanPurpose }
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance = state.balance + action.payload.amount;
      }
    },

    //Also the order in RTK matters. Below, if we can't write state.loan =0 before state.balance = state.balance - state.loan, because as it  mutates the states, state.loan = 0 if written before will become 0 and then 0 will be deducted from state.balance as state.loan has become 0 before it
    paybackLoan(state) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    }
  },
  extraReducers: {
    [convertingCurrency.pending]: (state) => {
      state.isLoading = true;
    },
    [convertingCurrency.fulfilled]: (state, action) => {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    }
  }
});

export const {
  deposit,
  withdraw,
  requestForLoan,
  paybackLoan
} = accountSlice.actions;

export default accountSlice.reducer;

//in Redux, all async operations are done in Thunk/Middlware
//Thunk are created in action creators
//Here below, we are not using createAsyncThunk that is provided by the redux toolkit, instead we are using the normal thunk provided by classic Redux which is totally fine

////////////////////////////////////////////////////
