import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { message } from "antd";
import { formatPhoneNumber } from "../../utils/utils";

import "react-phone-input-2/lib/bootstrap.css";

const MobileLoginForm = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (phone === undefined || phone === "")
      return message.error("Form fields can not be empty", 5);

    const hide = message.loading("Loading...", 0);
    setLoading(true);

    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
      },
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers?filter[phone]=${phone}`,
    })
      .then(({ data }) => {
        setLoading(false);

        if (data?.ghanaUsers.length === 1) {
          hide();
          dispatch({
            type: "authenticateUser",
            payload: data?.ghanaUsers[0],
          });
          localStorage.setItem("resellerToken", data?.ghanaUsers[0]?.token);
          dispatch({
            type: "toggleMobileLogin",
          });
        } else {
          hide();
          message.info(
            "Oops.., phone number maybe wrong, check and try again",
            10
          );
        }
      })
      .catch((e) => {
        hide();
        console.log(e);
        message.error("Error occurred, try again", 10);
        setLoading(false);
      });
  };

  console.log(phone, "formatted number");

  return (
    <>
      <form onSubmit={onLoginSubmit} className="w-full mx-4">
        <div className="text-left mb-9">
          <h1 className="text-3xl">Login</h1>
          <p className="text-sm text-gray-400 mt-3">
            Not a Reseller yet?{" "}
            <span
              className="ml-1 text-blue-500 cursor-pointer"
              onClick={() => {
                dispatch({ type: "toggleMobileLogin" });
                dispatch({ type: "toggleMobileSignUp" });
              }}
            >
              Create account here
            </span>
          </p>
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm font-medium">
            Your phone number
          </label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <PhoneInput
              country={"gh"}
              enableSearch={true}
              onlyCountries={["gh"]}
              countryCodeEditable={false}
              inputStyle={{ width: "100%" }}
              inputClass="focus:ring-sokoBlue focus:border-sokoBlue sm:text-sm border-gray-300 py-4"
              placeholder="+233 20xxxxxx"
              value={phone}
              onChange={(value) => {
                formatPhoneNumber({
                  value,
                  cb: setPhone,
                  errorCb: setPhoneError,
                });
              }}
            />
          </div>
          {phoneError && (
            <span className="text-red-500 mt-1 text-xs font-semibold">
              Invalid phone number
            </span>
          )}
        </div>

        <div className="flex">
          <div className="my-5 w-full">
            <button
              type="submit"
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${
                loading ? "cursor-not-allowed" : null
              }`}
              disabled={loading ? true : false}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MobileLoginForm;
