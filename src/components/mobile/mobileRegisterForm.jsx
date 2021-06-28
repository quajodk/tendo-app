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
    document.getElementById("referralCode").value = refCode ?? "";
  }, [refCode]);

  const createUserName = ({ name, phone, length }) => {
    let username;
    const part1 = name.split(" ")[0].substring(0, length);
    const part2 = phone.substring(phone.length - length);
    username = `${part1}${part2}`.toUpperCase();
    return username;
  };

  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  const onSignUpSubmit = (values) => {
    values.phone = phone;
    values.token = btoa(`${values.fullName} ${phone}`);
    values.referralCode =
      values.referralCode !== undefined
        ? values.referralCode.toUpperCase()
        : refCode.toUpperCase();
    values.username = createUserName({
      name: values.fullName,
      phone,
      length: 3,
    });
    values.createdAt = new Date().toLocaleDateString("en-GB");
    if (phone.length <= 3)
      return message.error("Invalid phone number. Check and try again", 5);
    if (_.isEmpty(values))
      return message.error("Form fields can not be empty", 5);
    const hide = message.loading("Loading...", 0);
    setLoading(true);
    // check phone already exist
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
      },
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/users?filter[phone]=${phone}`,
    })
      .then(({ data }) => {
        if (data?.users?.length === 0) {
          //   add user if does not exist
          axios({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
            },
            data: { user: values },
            url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/users`,
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
      <form onSubmit={handleSubmit(onSignUpSubmit)}>
        <div className="text-left mb-9">
          <h1 className="text-3xl">Create your account</h1>
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
          <label htmlFor="email" className="block text-sm font-medium">
            Your full name
          </label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <input
              type="text"
              name="fullName"
              id="fullName"
              autoComplete="fullName"
              required
              className="focus:ring-sokoBlue focus:border-sokoBlue block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2  rounded-md"
              placeholder="John Doe"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm font-medium">
            Your phone number
          </label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <PhoneInput
              country={"gh"}
              enableSearch={true}
              inputStyle={{ width: "100%" }}
              inputClass="focus:ring-gray-300 focus:border-gray-300 sm:text-sm border-gray-300 border-2 py-4"
              placeholder="+233 20xxxxxx"
              value={phone}
              onChange={(value) => setPhone(value)}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium">
            Your email
          </label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2  rounded-md"
              placeholder="example@mail.com"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium">
            Who referred you?
          </label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <input
              type="text"
              name="referralCode"
              id="referralCode"
              className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2  rounded-md"
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
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${
                loading ? "cursor-not-allowed" : null
              }`}
              disabled={loading ? true : false}
            >
              Create Account
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-3">
          By clicking on create an account <br />
          you have agreed to our{" "}
          <span to="#!" className="ml-1 text-blue-500">
            Terms and Conditions
          </span>
        </p>
      </form>
    </>
  );
};

export default MobileRegisterForm;
