import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div>
        <hr></hr>
        <div>
          <Link to="/package/create">Create</Link>
        </div>
        <div>
          <Link to="/package/modify">Modify</Link>
        </div>
      </div>
    </>
  );
}
