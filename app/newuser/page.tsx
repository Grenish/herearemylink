"use client";

import React, { useState, useRef, useCallback } from "react";
import { greetings, find } from "../assets";
import Image from "next/image";
import { Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function NewUser() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      sectionRefs.current[index] = el;
      console.log(`Set ref for step ${index + 1}`, el);
    },
    []
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
  });

  // Handle Image Change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigate to Next Step
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      sectionRefs.current[step]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to Previous Step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      sectionRefs.current[step - 2]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Style for Step Indicators
  const stepIndicatorStyle = (currentStep: number) =>
    currentStep === step
      ? "w-[20px] h-[20px] bg-rose-600 transition-all duration-300 ease-in-out"
      : "w-[10px] h-[10px] bg-rose-400 transition-all duration-300 ease-in-out";

  // Handle Form Submission and Save Data to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Save user data in Firestore under "users" collection with the document id as the uid
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid, // Store uid inside the document data as well
          profile: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            bio: formData.bio,
            profileImage: selectedImage,
            email: user.email,
            createdAt: serverTimestamp(),
            link: {
              blogs: [],
              smallLinks: [],
            },
            extras: {
              clicks: 0,
              visitors: 0,
            },
          },
        });

        alert("Profile saved successfully");
        router.push("/dashboard");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      alert("No user is signed in");
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Step 1: Name Collection */}
      <div
        className="flex flex-col justify-center items-center h-screen relative"
        ref={setRef(0)}
      >
        <h1>Hello there</h1>
        <p>Let's start with your name first.</p>
        <form action="" className="flex flex-col w-1/4 mt-2">
          <div className="border-2 p-2 rounded-xl">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="bg-transparent w-full outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <div className="border-2 p-2 rounded-xl mt-2">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="bg-transparent w-full outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            onClick={nextStep}
            className="bg-[#909fb8] p-2 rounded-xl mt-2"
          >
            Next
          </button>
        </form>
        <div className="flex flex-col gap-6 fixed right-5">
          <motion.div
            className={`rounded-full ${stepIndicatorStyle(1)}`}
          ></motion.div>
          <motion.div
            className={`rounded-full ${stepIndicatorStyle(2)}`}
          ></motion.div>
          <motion.div
            className={`rounded-full ${stepIndicatorStyle(3)}`}
          ></motion.div>
        </div>
        <Image
          src={greetings}
          alt="logo"
          width={500}
          height={500}
          className="absolute pointer-events-none left-0 bottom-0 -z-1"
        />
      </div>

      {/* Step 2: Username Collection */}
      <div
        className="flex flex-col justify-center items-center h-screen relative"
        ref={setRef(1)}
      >
        <p>Choose a username</p>
        <form action="" className="flex flex-col w-1/4 mt-2">
          <div className="border-2 p-2 rounded-xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-transparent w-full outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <p className="text-green-500 text-xs">
            {formData.username} is available to use
          </p>
          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="bg-[#909fb8] p-2 rounded-xl mt-2 w-full"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#909fb8] p-2 rounded-xl mt-2 w-full"
            >
              Next
            </button>
          </div>
        </form>
        <Image
          src={find}
          alt="logo"
          width={500}
          height={500}
          className="absolute pointer-events-none left-0 bottom-0 -z-1"
        />
      </div>

      {/* Step 3: Profile Image & Bio Collection */}
      <div
        className="flex flex-col justify-center items-center h-screen relative"
        ref={setRef(2)}
      >
        <h1>Final Step</h1>
        <p>Pick a dashing profile and bio</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-1/4 mt-2 justify-center items-center"
        >
          <div
            className="w-[150px] h-[150px] border-dashed border-3 rounded-full text-gray-300 flex flex-col justify-center items-center cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="gray"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,72H179.31l-25-33.33A16,16,0,0,0,141.33,32H114.67a16,16,0,0,0-13,6.67L76.69,72H40A16,16,0,0,0,24,88v88a16,16,0,0,0,16,16H84.69l25,33.33A16,16,0,0,0,114.67,224h26.66a16,16,0,0,0,13-6.67L179.31,192H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM128,172a44,44,0,1,1,44-44A44.05,44.05,0,0,1,128,172Zm63.87-60.7a8,8,0,1,1,11.31-11.31,8,8,0,0,1-11.31,11.31Z"></path>
                </svg>
                <p>Pick image</p>
              </>
            )}
          </div>
          <span className="text-center mt-2">
            <h1 className="text-xl font-bold">
              {formData.firstName} {formData.lastName}
            </h1>
            <p>@{formData.username}</p>
          </span>
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <Textarea
            placeholder="Type your bio here"
            className="mt-2 w-full"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="bg-[#909fb8] p-2 rounded-xl mt-2 w-full"
            >
              Go back
            </button>
            <button
              type="submit"
              className="bg-[#909fb8] p-2 rounded-xl mt-2 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
