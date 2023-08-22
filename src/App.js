import { useSelector } from "react-redux";

import CreateCustomer from "./customers/CreateCustomer";
import "./styles.css";
import CustomerDisplay from "./customers/CustomerDisplay";
import AccountOperations from "./accounts/AccountOperations";

import BalanceDisplay from "./accounts/BalanceDisplay";

//redux, react-redux, redux-thunk

//Also remember that the component that recieves the state that is changed with dispatch action is re-rendered.

export default function App() {
  const fullName = useSelector((store) => store.customer.fullName);
  return (
    <div className="App">
      <h1>The Redux bank </h1>
      {fullName === "" ? (
        <div className="createCustomer--div">
          <CreateCustomer />
        </div>
      ) : (
        <div className="main--div">
          <div className="top">
            <CustomerDisplay />
            <BalanceDisplay />
          </div>
          <div>
            <AccountOperations />
          </div>
        </div>
      )}
    </div>
  );
}
