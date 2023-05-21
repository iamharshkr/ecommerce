import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/userActions";
import Loader from "./Loader";

const Login = () => {
  const { loading, user, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-emerald-600">Login Page</h1>
          </div>
          <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-3 bg-cyan-400 rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
          {error && <div className="text-red-500 font-bold">{error}</div>}
          {user && <div>{JSON.stringify(user)}</div>}
        </div>
      )}
    </Fragment>
  );
};

export default Login;
