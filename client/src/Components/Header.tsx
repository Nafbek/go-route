import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <div>
          <a href="/h" title="Go to home">
            <h1>goRoute</h1>
          </a>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Documentation</Link>
              </li>
              <li>
                <Link to="/">Today's Route</Link>
              </li>
              <li>
                <Link to="/">Create</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
