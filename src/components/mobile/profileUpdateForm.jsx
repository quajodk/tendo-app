import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/utils";
import { message } from "antd";

const UpdateUserAccountForm = ({ setModal }) => {
  const { register, handleSubmit } = useForm();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onAccountUpdate = async (values) => {
    setLoading(true);
    auth.fullName =
      document.querySelector("#fullName").value !== undefined
        ? values.fullName
        : auth.fullName;
    auth.phone = phone.length !== 0 ? phone : auth.phone;
    auth.email =
      document.querySelector("#email").value !== undefined
        ? values.email
        : auth.email;

    const user = auth;
    try {
      const result = await request({
        method: "PUT",
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoNigeriaResellerApp/nigeriaUsers/${auth.id}`,
        data: { user },
      });
      setLoading(false);

      if (result.user.id) {
        dispatch({
          type: "authenticateUser",
          payload: result.user,
        });
        message.success("Account updated successfully", 5);
        setModal(false);
      } else {
        return message.error("Error occurred updating account. Try again.", 5);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Error occurred updating account. Try again.", 5);
    }
  };

  return (
    <form onSubmit={handleSubmit(onAccountUpdate)}>
      <div className="text-left mb-6">
        <h1 className="text-3xl">Update your account</h1>
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
            className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
            placeholder="John Doe"
            defaultValue={auth?.fullName ?? ""}
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
            country={"ng"}
            enableSearch={true}
            inputStyle={{ width: "100%" }}
            inputClass="focus:ring-gray-300 focus:border-gray-300 sm:text-sm border-gray-300 border-2 py-4"
            placeholder="+234 20xxxxxx"
            value={auth?.phone ?? phone}
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
            className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
            placeholder="example@mail.com"
            defaultValue={auth?.email ?? ""}
            ref={register({ required: true })}
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
            {loading ? "Updating Account ..." : "Update Account"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateUserAccountForm;
