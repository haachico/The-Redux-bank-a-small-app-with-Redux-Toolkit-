import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deposit,
  withdraw,
  requestForLoan,
  paybackLoan,
  convertingCurrency
} from "./accountSlice";

const AccountOperations = () => {
  const [depositAmt, setDepositAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [loanAmt, setLoanAmt] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const state = useSelector((store) => store);
  console.log(state);

  const dispatch = useDispatch();

  const handleDeposit = (amount, currency) => {
    if (currency === "USD") {
      dispatch(deposit(amount, currency));
    } else {
      dispatch(convertingCurrency({ amount, currency }));
    }

    setDepositAmt("");
    setCurrency("USD");
  };

  const handleWithdraw = (amount) => {
    dispatch(withdraw(amount));
    setWithdrawAmt("");
  };

  const handleRequestForLoan = (amount, purpose) => {
    dispatch(requestForLoan(amount, purpose));
    setLoanAmt("");
    setLoanPurpose("");
  };

  const handlePaybackLoan = () => {
    dispatch(paybackLoan());
  };

  return (
    <div className="account--operations">
      <div>
        <label htmlFor="deposit"> Deposit: </label>
        <input
          id="deposit"
          type="number"
          value={depositAmt}
          onChange={(e) => setDepositAmt(+e.target.value)}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">Euro</option>
          <option value="GBP">British Pound</option>
        </select>
        <button onClick={() => handleDeposit(depositAmt, currency)}>
          {" "}
          {state.account.isLoading ? "Converting..." : "Deposit"}
        </button>
      </div>
      <div>
        <label htmlFor="withdraw"> Withdraw: </label>
        <input
          id="withdraw"
          type="number"
          value={withdrawAmt}
          onChange={(e) => setWithdrawAmt(e.target.value)}
        />
        <button onClick={() => handleWithdraw(withdrawAmt)}>Withdraw</button>
      </div>
      <div>
        <label htmlFor="loan"> Loan Amt: </label>
        <input
          id="loan"
          type="number"
          value={loanAmt}
          onChange={(e) => setLoanAmt(+e.target.value)}
        />
        <label htmlFor="loanPurpose"> Loan Purpose: </label>
        <input
          id="loanPurpose"
          type="text"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
        />
        <button onClick={() => handleRequestForLoan(loanAmt, loanPurpose)}>
          Request
        </button>
      </div>
      {state.account.loan > 0 ? (
        <button onClick={() => handlePaybackLoan()} className="payback--btn">
          Payback $ {state.account.loan} taken for {state.account.loanPurpose}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AccountOperations;
