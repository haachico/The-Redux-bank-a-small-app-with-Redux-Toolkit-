import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accounts/accountSlice";
import customerReducer from "./customers/customerSlice";
import { devToolsEnhancer } from "redux-devtools-extension";

//one of the big advantages of redux over context is in redux, only that component re-renders in which a state is used changes, where as in Context API all components changes over which context provider is wrapped around for which there we would use useMemo and useCallback for optimisation who have no use in Redux for reason cited above

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer
  },
  enhancers: []
});

console.log(store, "STORE");

export default store;
