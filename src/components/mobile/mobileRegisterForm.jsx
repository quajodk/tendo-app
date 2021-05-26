import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message } from "antd";
import _ from "lodash";

import "react-phone-input-2/lib/bootstrap.css";

const MobileRegisterForm = ({ refCode }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.getElementById("referralCode").value = refCode;
  }, [refCode]);

  const createUserName = ({ name, phone, length }) => {
    let username;
    const part1 = name.split(" ")[0].substring(0, length);
    const part2 = phone.substring(phone.length - length);
    username = `${part1}${part2}`.toUpperCase();
    return username;
  };

  const onSignUpSubmit = (values) => {
    values.phone = phone;
    values.token = btoa(`${values.fullName} ${phone}`);
    values.referralCode =
      values.referralCode !== undefined
        ? values.referralCode
        : refCode
        ? refCode
        : "tendo";
    values.username = createUserName({
      name: values.fullName,
      phone,
      length: 3,
    });
    if (_.isEmpty(values))
      return message.error("Form fields can not be empty", 5);
    const hide = message.loading("Loading...", 0);
    setLoading(true);
    // check phone already exist
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TEST_TOKEN",
      },
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/users?filter[phone]=${phone}`,
    })
      .then(({ data }) => {
        if (data?.users?.length === 0) {
          //   add user if does not exist
          axios({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer TEST_TOKEN",
            },
            data: { user: values },
            url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/users`,
          })
            .then(({ data }) => {
              hide();
              dispatch({
                type: "authenticateUser",
                payload: data?.user,
              });
              localStorage.setItem("resellerToken", data?.user?.token);
              dispatch({
                type: "toggleMobileSignUp",
              });
            })
            .catch((e) => {
              hide();
              console.log(e);
              message.error("Error occurred, try again", 10);
              setLoading(false);
            });
        } else {
          hide();
          message.info("Yay!, you're already a reseller. Login", 10);
          setLoading(false);
        }
      })
      .catch((e) => {
        hide();
        console.log(e);
        message.error("Error occurred, try again", 10);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-tendo-bg">
        <div className="pt-10 lg:pt-7 pb-7">
          <form onSubmit={handleSubmit(onSignUpSubmit)}>
            <div className="text-left mb-9">
              <h1 className="text-3xl lg:text-black text-white">
                Create your account
              </h1>
              <p className="text-sm text-gray-400 mt-3">
                Already have an account?{" "}
                <span
                  className="ml-1 text-blue-500 cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "toggleMobileLogin" });
                    dispatch({ type: "toggleMobileSignUp" });
                  }}
                >
                  Sign in here
                </span>
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium lg:text-black text-white"
              >
                Your full name
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="fullName"
                  required
                  className="focus:ring-sokoBlue focus:border-sokoBlue block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                  ref={register({ required: true })}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block text-sm font-medium lg:text-black text-white"
              >
                Your phone number
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <PhoneInput
                  country={"gh"}
                  enableSearch={true}
                  inputStyle={{ width: "100%" }}
                  inputClass="focus:ring-sokoBlue focus:border-sokoBlue sm:text-sm border-gray-300 py-4"
                  placeholder="+233 20xxxxxx"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium lg:text-black text-white"
              >
                Who referred you?
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="referralCode"
                  id="referralCode"
                  autoComplete="referralCode"
                  className="focus:ring-sokoBlue focus:border-sokoBlue block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter referral code"
                  defaultValue={refCode}
                  ref={register()}
                />
              </div>
            </div>

            <div className="flex">
              <div className="my-5 w-full">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                  disabled={loading ? true : false}
                >
                  Create Account
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-3">
              By clicking on create an account <br />
              you have agreed to out{" "}
              <span to="#!" className="ml-1 text-blue-500">
                Terms and Conditions
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default MobileRegisterForm;
