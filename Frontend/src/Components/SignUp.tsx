import { useEffect, useState } from "react";

function SignUp() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);


  

  return (
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
          <div className="font-bold mb-4  text-gray-700 text-3xl">Sign Up</div>
        </div>
        <div className="p-8   gap-3 rounded-xl flex  flex-col justify-center items-center">
          <div className="">
            <div className="text-gray-700 font-semibold">Full Name</div>
            <input
              className="border-1 border-red-50 bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
              type="text"
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="">
            <div className="text-gray-700 font-semibold">Email</div>
            <input
              className="border-1 border-red-50 bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
              type="Email"
              placeholder="Enter your Email"
            />
          </div>
          <div className="">
            <div className="text-gray-700 font-semibold">Password</div>
            <input
              className="border-1 border-red-50 bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
              type="Password"
              placeholder="Enter your Password"
            />
          </div>
          <div className="">
            <div className="text-gray-700 font-semibold">Confirm Password</div>
            <input
              className="border-1 border-red-50 bg-white w-xs py-1 pl-2  focus:border-red-200 focus:border-1 outline-none rounded-sm "
              type="Password"
              placeholder="Enter your Password"
            />
          </div>
          <div className="hover:bg-red-300 bg-red-200 mt-4 cursor-pointer w-full text-center py-2 rounded-lg font-semibold text-white">
            Sign Up
          </div>
          <div className="mt-4 text-sm font-semibold text-gray-600">
            Already have an account?{" "}
            <span className="text-red-200 cursor-pointer">Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
