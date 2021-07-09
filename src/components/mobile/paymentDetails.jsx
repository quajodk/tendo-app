import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/utils";
import { message } from "antd";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "./orderDetails";

const paymentMethods = [
  {
    name: "Mobile Money",
    description: "Your profit will be send to you through mobile money",
  },
  {
    name: "Bank Transfer",
    description: "Your profit will be send to you through bank transfer",
  },
];

const UpdateUserPaymentForm = ({ setModal }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(paymentMethods[0]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onPaymentUpdate = async (values) => {
    setLoading(true);
    auth.paymentProvider =
      document.querySelector("#paymentProvider").value !== undefined
        ? values.paymentProvider
        : auth.paymentProvider;

    auth.paymentMethod = selected.name ?? auth?.paymentMethod;

    auth.accountName =
      document.querySelector("#accountName").value !== undefined
        ? values.accountName
        : auth.accountName;

    auth.accountNumber =
      document.querySelector("#accountNumber").value !== undefined
        ? values.accountNumber
        : auth.accountNumber;

    const user = auth;
    try {
      const result = await request({
        method: "PUT",
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/users/${auth.id}`,
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
        return message.error("Error occurred adding payment. Try again.", 5);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Error occurred adding payment. Try again.", 5);
    }
  };

  return (
    <form onSubmit={handleSubmit(onPaymentUpdate)}>
      <div className="text-left mb-6">
        <h1 className="text-3xl">Add payment</h1>
      </div>
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            order cancellation
          </RadioGroup.Label>
          <div className="space-y-2">
            {paymentMethods.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-tendo-active ring-tendo-active ring-opacity-60"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-blue-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>{plan.description}</span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mb-5 mt-4">
        <label htmlFor="email" className="block text-sm font-medium">
          {selected.name.toLowerCase() === "bank transfer"
            ? "Your bank name"
            : "Your provider name"}
        </label>
        <div className="mt-2 relative rounded-md shadow-sm">
          <input
            type="text"
            name="paymentProvider"
            id="paymentProvider"
            required
            className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
            placeholder={
              selected.name.toLowerCase() === "bank transfer"
                ? "Eg: Tendo Bank"
                : "Eg: MTN Momo"
            }
            defaultValue={auth?.paymentProvider ?? ""}
            ref={register({ required: true })}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block text-sm font-medium">
          {selected.name.toLowerCase() === "bank transfer"
            ? "Your account name"
            : "Your momo account name"}
        </label>
        <div className="mt-2 relative rounded-md shadow-sm">
          <input
            type="text"
            name="accountName"
            id="accountName"
            required
            className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
            placeholder="John Doe"
            defaultValue={auth?.accountName ?? ""}
            ref={register({ required: true })}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium">
          {selected.name.toLowerCase() === "bank transfer"
            ? "Your account number"
            : "Your momo number"}
        </label>
        <div className="mt-2 relative rounded-md shadow-sm">
          <input
            type="text"
            name="accountNumber"
            id="accountNumber"
            className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
            placeholder={
              selected.name.toLowerCase() === "bank transfer"
                ? "0094xxxxx"
                : "02xxxxxx..."
            }
            defaultValue={auth?.accountNumber ?? ""}
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
            {loading ? "Adding Payment ..." : "Add Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateUserPaymentForm;
