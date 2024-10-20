import React, { useState } from "react";
import victory from "../../assets/victory.svg";
import backgroundImage from "../../assets/login2.png";
import { login } from "../../slice/authThunk";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../utils/HelperFunctions";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const validateLogin = () => {
    if (!email.length) {
      console.log("Email is required!");
      return false;
    }
    if (!password.length) {
      console.error("Password is required!");
      return false;
    }
    return true;
  };

  const handlelogin = async () => {
    if (validateLogin()) {
      try {
        const response = await dispatch(login({ email, password }));

        if (response.data.user) {
          navigate("/");
        }

        console.log("login response:", { response });
      } catch (error) {
        setError(error);
        console.error("login_error", error.response.status);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="p-8 md:p-2 md:h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl shadow-black w-[90vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2   ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex  justify-center items-center ">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} className="h-[100px]" alt="victory imoji" />
            </div>
            <p className="font-medium text-center px-8 md:px-3 text-black/75">
              Fill in the details to get started with the best platform!
            </p>
            {Error && (
              <p className="font-medium text-center  text-red-600">
                User Doesn't Exist. Create an account
              </p>
            )}
          </div>
          <div className="flex items-center justify-center w-full ">
            <div className="flex flex-col gap-4 mt-4 w-[70%]">
              <input
                type="email"
                className="bg-gray-50 outline-none  border ring-1 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="demo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="bg-gray-50 border outline-none ring-1 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="md:text-end hidden md:block underline text-blue-500">
                <Link to="/register">Create new account</Link>
              </div>

              {loading ? (
                <span>Loading....... </span>
              ) : (
                <button
                  className="rounded-full p-4 bg-blue-600 text-white"
                  onClick={handlelogin}
                >
                  Login
                </button>
              )}

              <div className="md:hidden flex-1 text-center underline text-blue-500">
                <Link to="/register">Create new account</Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden xl:flex justify-center items-center">
          <img
            src={backgroundImage}
            alt="background login image"
            className="h-[630px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
