import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    window.open(
      "https://github.com/TejasSalunkeCode/AI-Resume-Builder"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      console.log("Printing from Homepage User is There ");
      navigate("/dashboard");
    } else {
      console.log("Printing for Homepage User Not Found");
      navigate("/auth/sign-in");
    }
  };
  return (
    <>
      <Header user={user} />
      <section className="pt-24 pb-20 bg-mesh min-h-screen">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tight text-white md:text-7xl">
              <span>Start</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 lg:inline">
                building a Resume
              </span>{" "}
              <span>for your next Job</span>
            </h1>
            <p className="px-0 mb-10 text-lg text-gray-400 md:text-xl lg:px-24 font-medium">
              Elevate your career with AI-driven precision. Build, refine, and shine with resumes designed to pass ATS and wow recruiters.
            </p>
            <div className="mb-4 flex flex-col sm:flex-row justify-center gap-4 md:mb-8">
              <Button
                className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={hadnleGetStartedClick}
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button
                onClick={handleClick}
                variant="outline"
                className="h-14 px-10 text-lg bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl backdrop-blur-md transition-all duration-300"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-3xl bg-white/5 backdrop-blur-3xl">
                <div className="flex items-center justify-between px-6 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 h-12 border-b border-white/10">
                  <div className="flex space-x-2">
                    <FaCircle className="w-3 h-3 text-white/40" />
                    <FaCircle className="w-3 h-3 text-white/40" />
                    <FaCircle className="w-3 h-3 text-white/40" />
                  </div>
                  <FaInfoCircle className="text-white/40" />
                </div>
                <img
                  className="object-cover py-4 px-6 rounded-b-2xl transition duration-700 transform hover:scale-[1.02]"
                  src={heroSnapshot}
                  alt="Dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-mesh border-t border-white/5" aria-labelledby="footer-heading">
        <div className="px-12 mx-auto max-w-7xl py-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-gray-500">
            &copy; 2024 Ai-Resume-Builder. All rights reserved.
          </p>
          <div>
            <Button
              variant="ghost"
              onClick={handleClick}
              className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              GitHub Repo
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
