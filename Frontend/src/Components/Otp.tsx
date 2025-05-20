import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/User";
import { number } from "zod/v4";
function Otp() {
  const { userName } = useUserContext();
  const { userPassword } = useUserContext();
  const { userEmail } = useUserContext();
  const [error, setError] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  async function submitOtp() {
    console.log(otp);
    if (otp.length < 6) {
      setError("Please type your One time Password!");
      return;
    }
    function concatOtp() {
      const currOtp = otp.join("");
      return currOtp;
    }

    const getOtp = Number(concatOtp());

    const response = await axios.post(
      `http://localhost:3200/MeetFlow/verification`,
      {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        userOtp: getOtp,
      }
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 w-dvw   h-dvh   bg-gray-400/10 backdrop-blur-[1px]`}
    >
      <div
        className={`bg-white w-fit md:w-fit h-fit -translate-x-0   text-gray-800 gap-4 rounded-4xl flex flex-col mx-auto md:mx-auto mt-[14%] p-7 pl-4  `}
      >
        <div className="font-bold text-2xl  text-center cursor-default">
          Verify your Email Address
        </div>
        <div className="text-center">
          Please check you email for One time password
        </div>
        <form className="flex flex-row gap-4 justify-center ">
          <input
            className={`bg-gray-100 max-w-12  max-h-12 outline-1 outline-white focus:bg-white  focus:outline 
             focus:outline-red-100 rounded-md text-center text-2xl py-8`}
            type="text"
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[0] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
          <input
            className="bg-gray-100 max-w-12 max-h-12 outline-1 outline-white focus:bg-white   focus:outline focus:outline-red-200 rounded-md text-center text-2xl py-8"
            type="text"
            required
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[1] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
          <input
            className="bg-gray-100 max-w-12 max-h-12 outline-1 outline-white focus:bg-white   focus:outline focus:outline-red-200 rounded-md text-center text-2xl py-8"
            type="text"
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[2] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
          <input
            className="bg-gray-100 max-w-12 max-h-12 outline-1 outline-white focus:bg-white   focus:outline focus:outline-red-200 rounded-md text-center text-2xl py-8"
            type="text"
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[3] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
          <input
            className="bg-gray-100 max-w-12 max-h-12 outline-1 outline-white  focus:bg-white  focus:outline focus:outline-red-200 rounded-md text-center text-2xl py-8"
            type="text"
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[4] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
          <input
            className="bg-gray-100 max-w-12 max-h-12 outline-1 outline-white  focus:bg-white  focus:outline focus:outline-red-200 rounded-md text-center text-2xl py-8"
            type="text"
            maxLength={1}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              if (e.target.value !== "") {
                setOtp((prevOtp) => {
                  const newOtp = [...prevOtp];
                  newOtp[5] = e.target.value;
                  return newOtp;
                });
              }
              setError("");
            }}
          />
        </form>
        {error && <div className="text-center text-red-500">{error}</div>}
        <div
          onClick={submitOtp}
          className="m-4 text-white text-center font-bold  bg-red-200 hover:bg-red-300   cursor-pointer p-2 rounded-md px-4  "
        >
          Submit OTP
        </div>
      </div>
    </div>
  );
}

export default Otp;
