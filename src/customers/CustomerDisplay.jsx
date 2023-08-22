import { useSelector } from "react-redux";

const CustomerDisplay = () => {
  const fullName = useSelector((store) => store.customer.fullName);

  console.log(fullName);
  return (
    <div className="name">
      <h3>Hi, {fullName}</h3>
    </div>
  );
};

export default CustomerDisplay;
