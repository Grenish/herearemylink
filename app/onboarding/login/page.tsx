"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";
import { logo } from "@/app/assets";
import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [seePassword, setSeePassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" }); // State for form inputs
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const { email, password } = loginData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login error:", error.message);
      setError(error.message); // Set the error state if login fails
    }
  };

  const handleSeePassword = () => {
    setSeePassword((prev) => !prev);
  };

  // Ensure that the component only renders on the client side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="flex h-screen bg-[#b1ac7034]">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/2 p-2 mb-2">
          <Image
            src={logo}
            alt="logo"
            width={70}
            height={70}
            className=" rotate-180"
          />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm">Let's get you started</p>
        </div>
        <form
          action=""
          method="post"
          className="flex flex-col w-1/2"
          onSubmit={handleLogin}
        >
          <div className="border-2 border-gray-600 flex items-center justify-between p-2 rounded-xl">
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              className="outline-none w-full bg-transparent"
              value={loginData.email}
              onChange={handleInputChange}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
            </svg>
          </div>

          <div className="border-2 border-gray-600 flex items-center justify-between p-2 rounded-xl mt-2">
            <input
              type={seePassword ? "text" : "password"}
              name="password" // Added name attribute
              placeholder="Password"
              className="outline-none w-full bg-transparent"
              value={loginData.password}
              onChange={handleInputChange}
            />

            <button type="button" onClick={handleSeePassword}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d={
                    seePassword
                      ? "M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Z"
                      : "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
                  }
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#ccd8e5] hover:bg-[#98a4c3] transition-colors mt-2 p-2 rounded-xl"
          >
            Login
          </button>
          <div className="flex items-center mt-2 gap-2">
            <button className="bg-[#9c9cbc] hover:bg-[#868eb1] transition-colors p-2 rounded-xl w-full">
              Forget Password
            </button>
            <Link href="/onboarding/signup" className="w-full">
              <button className="bg-[#cdcdde] hover:bg-[#bacddf] transition-colors p-2 rounded-xl w-full">
                Signup
              </button>
            </Link>
          </div>
          <span className="flex items-center w-1/2 p-2 pr-4">
            <Divider />
            <p className="mx-2">Or</p>
            <Divider />
          </span>

          <button className="bg-indigo-500 rounded-xl p-2 flex items-center justify-center gap-5 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              width="22"
              height="22"
              fill="currentColor"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            Login with Google
          </button>
        </form>
      </div>
      <div className="w-10/12 p-2">
        <Image
          src="https://images.unsplash.com/photo-1525426846044-691f3a72e3b9?q=80&w=1536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Welcome Back"
          width={500}
          height={500}
          className="pointer-events-none object-cover w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
}
