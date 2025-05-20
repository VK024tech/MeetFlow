import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod/v4";
import axios from "axios";
import { useChatContext } from "../context/Chat";
import Otp from "./Otp";
import { useUserContext } from "../context/User";
function SignUp() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { screenOtp, setScreenOtp } = useChatContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const { userName, setUserName } = useUserContext();
  const { userPassword, setUserPassword } = useUserContext();
  const [confirmUserPassword, setConfirmUserPassword] = useState<string>("");
  const { userEmail, setUserEmail } = useUserContext();

  const [passInput, setPassInput] = useState<boolean>(false);
  function focusinput() {
    setPassInput(true);
  }
  function blurinput() {
    setPassInput(false);
  }

  const [eye, setEye] = useState<boolean>(false);

  const validationSchema = z
    .object({
      userName: z
        .string()
        .min(2, { message: "Must be at least 2 characters." }),
      userEmail: z.email({ message: "Invalid email address." }),
      userPassword: z
        .string()
        .min(8, { message: "Must be at least 8 characters." }),
      confirmUserPassword: z.string(),
    })
    .refine((data) => data.userPassword === data.confirmUserPassword, {
      message: "Passwords don't match",
      path: ["confirmUserPassword"],
    });

  function passwordIcon() {
    if (!eye) {
      return (
        <EyeSlashIcon
          onClick={() => {
            setEye(!eye);
          }}
          className="inline-block size-6 mr-3 text-gray-700 cursor-pointer"
        />
      );
    } else {
      return (
        <EyeIcon
          onClick={() => {
            setEye(!eye);
          }}
          className="inline-block size-6 mr-3 text-gray-700 cursor-pointer"
        />
      );
    }
  }
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  async function signUp() {
    const userInfo = validationSchema.safeParse({
      userName,
      userEmail,
      userPassword,
      confirmUserPassword,
    });

    if (userInfo.success) {
      const response = await axios.post(
        `http://localhost:3200/MeetFlow/verification`,
        { userName: userName, userEmail: userEmail, userPassword: userPassword }
      );
      if (response.data.message == "Otp sent successfully") {
        setScreenOtp(true);
      } else {
        console.log();
      }
    } else {
      console.log(userInfo.error);
      setErrors(userInfo.error);
      return;
    }
  }

  return (
    <>
      <div
        className={`h-dvh w-dvw flex flex-col justify-center items-center overflow-hidden     bg-red-50 `}
      >
        <div
          className={`bg-red-50  transition-shadow duration-1000 ${
            isVisible ? " shadow-2xl/100 " : "shadow-xs/0 border-red-100  "
          }  shadow-red-200  `}
        >
          <div
            className={`w-full pb-15 pt-15  transition-shadow duration-1000 rounded-b-full text-center bg-red-50   ${
              isVisible
                ? "shadow-[inset_0_-7px_20px_rgba(251,144,132,0.2)] "
                : "inset-shadow-red-50  "
            }`}
          >
            <div className="font-bold mb-4  text-gray-700 text-3xl">
              Sign Up
            </div>
          </div>
          <div className="p-8   gap-3 rounded-xl flex  flex-col justify-center items-center">
            <div>
              <div className="text-gray-700 font-semibold flex justify-between items-center">
                Full Name
                <span className="text-sm text-red-300 text-right">
                  {errors?.issues.find((index) =>
                    index.path.includes("userName")
                  ) &&
                    errors?.issues.find((index) =>
                      index.path.includes("userName")
                    )?.message}
                </span>
              </div>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="border-1 border-red-50 placeholder:text-gray-300  bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div>
              <div className="text-gray-700 font-semibold flex justify-between items-center">
                Email
                <span className="text-sm text-red-300 text-right">
                  {errors?.issues.find((index) =>
                    index.path.includes("userEmail")
                  ) &&
                    errors?.issues.find((index) =>
                      index.path.includes("userEmail")
                    )?.message}
                </span>
              </div>
              <input
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                className="border-1 border-red-50 placeholder:text-gray-300  bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
                type="Email"
                placeholder="Email"
              />
            </div>
            <div>
              <div className="text-gray-700  flex justify-between items-center font-semibold">
                Password
                <span className="text-sm text-red-300 text-right">
                  {errors?.issues.find((index) =>
                    index.path.includes("userPassword")
                  ) &&
                    errors?.issues.find((index) =>
                      index.path.includes("userPassword")
                    )?.message}
                </span>
              </div>
              <div
                className={`border-1 ${
                  passInput ? "border-red-200 " : "border-red-50"
                } outline-none flex justify-between   border-red-50 bg-white w-xs py-1 pl-2  rounded-sm `}
              >
                <input
                  onClick={() => {
                    focusinput();
                  }}
                  onBlur={() => {
                    blurinput();
                  }}
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                  className="w-full h-full placeholder:text-gray-300  outline-none"
                  type={eye ? "text" : "password"}
                  placeholder="Password"
                />
                {passwordIcon()}
              </div>
            </div>
            <div>
              <div className="text-gray-700 flex justify-between items-center font-semibold">
                Confirm Password
                <span className="text-sm text-red-300 text-right">
                  {errors?.issues.find((index) =>
                    index.path.includes("confirmUserPassword")
                  ) &&
                    errors?.issues.find((index) =>
                      index.path.includes("confirmUserPassword")
                    )?.message}
                </span>
              </div>
              <input
                onChange={(e) => {
                  setConfirmUserPassword(e.target.value);
                }}
                className="border-1 placeholder:text-gray-300  border-red-50 bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
                type={eye ? "text" : "password"}
                placeholder="Confirm your Password"
              />
            </div>
            <div
              onClick={() => {
                signUp();
              }}
              className="hover:bg-red-300 bg-red-200 mt-4 cursor-pointer w-full text-center py-2 rounded-lg font-semibold text-white"
            >
              Sign Up
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-600">
              Already have an account?{" "}
              <span className="text-red-200 cursor-pointer">Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
