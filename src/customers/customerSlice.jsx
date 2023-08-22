import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  fullName: "",
  natioanalID: "",
  createdAt: ""
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      // prepare  method basically  prepares the object that we want to send in payload, as object in payload is not allowed to be sent directtly in redux toolkit

      //prepare function recieves the data we pass in the acton creator
      prepare(name, id) {
        return {
          payload: {
            fullName: name,
            natioanalID: id,
            createdAt: new Date().toISOString()
            // don't write new Date() / uuid() things insode  the reducer below, as reducer is supposed to hold only pure logic, write these things, if any, inside the prepare function
          }
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.natioanalID = action.payload.natioanalID;
        state.createdAt = action.payload.createdAt;
      }
    }
  },
  updateName(state, action) {
    state.fullName = action.payload;
  }
});

export const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;

console.log(customerSlice, "customer slice");

//reducer
// const customerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         natioanalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload
//       };

//     default:
//       return state;
//   }
// };

// export default customerReducer;
// //this reducer function will be exported to store where i will be maintained in a rooot reducer with all other reducers, if any

// //action creators

// export const createCustomer = (fullName, nationalID) => {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName: fullName,
//       nationalID: nationalID,
//       createdAt: new Date().toISOString()
//     }
//   };
// };
