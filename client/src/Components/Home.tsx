import { useState } from "react";

export default function Home() {
  const [signinFormData, setSigninFormData] = useState({
    driverFirstName: "",
    driverLastName: "",
    driverContactNumber: "",
    driverSecondContactNumber: "",
    passcode: "",
    password: ""

  });
  return (
    <>
      <div>
        <h2>Sign in</h2>
        <form>
          <div>
            <label>Get a registrtion code from dispatch to sign in!</label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="first name"
            />
            <input
              type="text"
              name="lastName"
              required
              placeholder="last name"
            />
            <input
              type="text"
              name="passcode"
              required
              placeholder="your registration code"
            />
            <input
              type="text"
              name="password"
              required
              placeholder="create password"
            />
            <input
              type="text"
              name="confirmPassword"
              placeholder="re-type your password"
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}
