import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div>
      <h1>Unauthorized use</h1>
      <Link to={"/"}>Go to home</Link>
    </div>
  );
};

export default UnAuthorized;
