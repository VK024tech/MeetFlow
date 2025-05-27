import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod/v4";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/solid";


import { useUserContext } from "../context/User";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const { userPassword, setUserPassword } = useUserContext();
  const { userEmail, setUserEmail } = useUserContext();

  const [passInput, setPassInput] = useState<boolean>(false);
  function focusinput() {
    setPassInput(true);
  }
  function blurinput() {
    setPassInput(false);
  }

  const [eye, setEye] = useState<boolean>(false);

  const validationSchema = z.object({
    userEmail: z.email({ message: "Invalid email address." }),
    userPassword: z
      .string()
      .min(8, { message: "Must be at least 8 characters." }),
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

  async function signIn() {
    try {
      setLoading(true);
      const userInfo = validationSchema.safeParse({
        userEmail,
        userPassword,
      });

      console.log(userInfo);

      if (userInfo.success) {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/MeetFlow/signin`,
          { userEmail: userEmail, userPassword: userPassword }
        );
        console.log(response);

        if (response.data.message == "Signin successfull") {
          const token = response.data.token;
          sessionStorage.setItem("token", token);
          setLoading(false);
          navigate("/dashboard");
        } else {
          setError(response.data.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setErrors(userInfo.error);
        return;
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }




  return (
    <>
      <div
        className={`h-dvh w-dvw flex flex-col justify-center items-center overflow-hidden    bg-red-50 `}
      >
        <div
          className={`bg-red-50  transition-shadow duration-1000 rounded-md ${
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
              Sign In
            </div>
          </div>
          <div className="p-8   gap-3 rounded-xl flex  flex-col justify-center items-center">
            <div className="text-red-300">{error && <div>{error}</div>}</div>
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
                  setError("");
                  setErrors(null);
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
                    setErrors(null);
                    setError("");
                    setUserPassword(e.target.value);
                  }}
                  className="w-full h-full placeholder:text-gray-300  outline-none"
                  type={eye ? "text" : "password"}
                  placeholder="Password"
                />
                {passwordIcon()}
              </div>
            </div>

            <div
              onClick={() => {
                signIn();
              }}
              className="hover:bg-red-300  bg-red-200 mt-4 cursor-pointer w-full text-center py-2 rounded-lg font-semibold text-white"
            >
              <span className="px-2"> Sign In</span>
              {loading && (
                <ArrowPathIcon className="inline-block size-5  animate-spin text-gray-100" />
              )}
            </div>
            <div className="mt-4 text-sm font-semibold  text-gray-600">
              Create new account
              <span
                className="text-red-200 cursor-pointer px-2"
                onClick={() => {
                  navigate("/SignUp");
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
