"use client";

import React, { useState, useRef } from "react";
import { FatCard } from "../components/FatCard";
import { FatCardLazyBox } from "../components/FatCardLazyBox";
import { SmallCard } from "../components/SmallCard";
import SmallCardLazyBox from "../components/SmallCardLazyBox";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCard, setSelectedCard] = useState<"fat" | "small" | null>(null);
  const [fatCardData, setFatCardData] = useState({
    title: "",
    desc: "",
    link: "",
    image: "",
  });

  const handleSaveFatCard = (data: typeof fatCardData) => {
    setFatCardData(data);
    setSelectedCard(null); // Hide after saving
  };

  const copyToClipboard = async () => {
    if (inputRef.current) {
      try {
        inputRef.current.select();
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    }
  };

  const handleCreateNewClick = () => {
    setIsPopupVisible(true);
  };

  const handleCardSelection = (cardType: "fat" | "small") => {
    setSelectedCard(cardType);
    setIsPopupVisible(false); // Hide the PopUp after selection
  };


  return (
    <div className="flex">
      <div className="w-1/5 h-screen border-r flex flex-col items-center p-2">
        <div className="mt-5">
          <img
            src="https://images.unsplash.com/photo-1653379671988-b32fceafb5e5?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="w-[200px] h-[200px] rounded-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Lily Jane</h2>
        <p className="text-xs">@LilyJane</p>
        <p className="text-center text-sm mt-2 bg-gray-200 p-2 rounded-xl">
          I love to explore the world. So join me with my journey.
        </p>
        <div className="mt-2 flex gap-3">
          <div className="text-center p-2 px-4 bg-gray-200 rounded-xl">
            <p className="text-3xl font-bold">429k</p>
            <h2 className="text-xs">Visitors</h2>
          </div>
          <div className="text-center p-2 px-4 bg-gray-200 rounded-xl">
            <p className="text-3xl font-bold">400k</p>
            <h2 className="text-xs">Clicks</h2>
          </div>
        </div>
        <p className="mt-2 text-xs hover:underline cursor-pointer">See More</p>
      </div>
      <div className=" flex-1">
        <div
          className="p-5 w-full border-b overflow-hidden"
          onClick={copyToClipboard}
        >
          <div className="w-1/2 flex items-center bg-gray-200 rounded-xl pr-3">
            <input
              type="text"
              className="w-full bg-transparent p-3 cursor-pointer outline-none text-sm"
              value="herearemylinks.vercel.app/LilyJane"
              readOnly
              ref={inputRef}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="#000000"
              viewBox="0 0 256 256"
              className="cursor-pointer"
            >
              <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
            </svg>
          </div>
          {copied ? (
            <span className="flex gap-1 items-center text-green-500 mt-1">
              <p className="text-xs ">Copied</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </span>
          ) : null}
        </div>
        <div className="p-5">
          <button
            className="text-sm bg-customColor-4 px-5 py-2 rounded-xl"
            onClick={handleCreateNewClick}
          >
            Create New
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs">My Links</p>
          <div className="mt-5 gap-2 grid grid-cols-4">
            <SmallCardLazyBox />
          </div>
          <p className="text-xs mt-5">My Blogs</p>

          <div className="mt-5 gap-2 grid grid-cols-4">
            <FatCardLazyBox />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PopUpProps {
  onClose: () => void;
  onSelectFatCard: () => void;
  onSelectSmallCard: () => void;
}

const PopUp: React.FC<PopUpProps> = ({
  onClose,
  onSelectFatCard,
  onSelectSmallCard,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[999]">
      <div className="bg-customColor-2 w-1/3 p-2 rounded-xl shadow-lg">
        <p className="text-xs">What's on your mind?</p>
        <div className="flex flex-grow flex-col gap-2 mt-2">
          <button
            className="mb-4 hover:bg-gray-400 p-5 rounded-xl transition-colors duration-200 ease-in-out"
            onClick={onSelectSmallCard}
          >
            <p className="text-sm mb-2">Only Links</p>
          </button>
          <button
            className="mb-4 hover:bg-gray-400 p-5 rounded-xl transition-colors duration-200 ease-in-out"
            onClick={onSelectFatCard}
          >
            <p className="mb-2 text-sm">Blogs</p>
          </button>
        </div>
        <button
          className="bg-customColor-4 px-5 py-2 rounded-xl text-xs mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const MyBlog = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      // Preview the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden input
    }
  };
  return (
    <>
      <div className="flex flex-col w-1/4">
        <div
          className="border-dashed border-2 h-[150px] rounded-xl overflow-hidden mb-2 flex flex-col items-center justify-center relative cursor-pointer"
          onClick={handleDivClick}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Uploaded Image Preview"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M80,224a8,8,0,0,1-8,8H56a16,16,0,0,1-16-16V184a8,8,0,0,1,16,0v32H72A8,8,0,0,1,80,224ZM216,88v48a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H120a8,8,0,0,1,0-16h32a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31ZM80,24H56A16,16,0,0,0,40,40V64a8,8,0,0,0,16,0V40H80a8,8,0,0,0,0-16ZM208,168a8,8,0,0,0-8,8v40h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V176A8,8,0,0,0,208,168ZM48,152a8,8,0,0,0,8-8V104a8,8,0,0,0-16,0v40A8,8,0,0,0,48,152Zm104,64H112a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Z"></path>
              </svg>
              <p className="text-xs">Add Image</p>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the input
        />

        <input
          type="text"
          className="bg-gray-100 outline-none p-2 rounded-xl mb-2 text-sm"
          placeholder="Title"
        />

        <Textarea
          key="flat"
          variant="flat"
          labelPlacement="outside"
          placeholder="Description"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />

        <input
          type="url"
          className="bg-gray-100 outline-none p-2 rounded-xl my-2 text-sm"
          placeholder="Link"
        />

        <button className="bg-gray-300 p-2 rounded-xl w-1/2">Go Back</button>
        <button className="bg-gray-300 p-2 rounded-xl w-1/2">Save</button>
      </div>
    </>
  );
};
