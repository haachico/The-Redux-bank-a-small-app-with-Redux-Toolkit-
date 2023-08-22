import { useState } from "react";
import { useDispatch } from "react-redux";

import { createCustomer } from "./customerSlice";

const CreateCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [nationalID, setNationalID] = useState("");

  const dispatch = useDispatch();

  //action creators will tell the dispatch what to do which in turn will send the actions to the store

  const handleCreateCustomer = (name, id) => {
    dispatch(createCustomer(name, id));
    setFullName("");
    setNationalID("");
  };
  return (
    <div>
      <label htmlFor="name">Full Name : </label>
      <input
        id="name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <label htmlFor="id">National ID : </label>
      <input
        id="id"
        type="number"
        value={nationalID}
        onChange={(e) => setNationalID(+e.target.value)}
      />

      <button onClick={() => handleCreateCustomer(fullName, nationalID)}>
        Create
      </button>
    </div>
  );
};

export default CreateCustomer;
