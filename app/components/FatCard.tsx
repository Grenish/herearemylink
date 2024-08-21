"use client";

import React from "react";

interface FatCardProps {
  title: string;
  desc: string;
  link: string;
  image: string;
}

export const FatCard: React.FC<FatCardProps> = ({
  title,
  desc,
  link,
  image,
}) => {
  return (
    <>
      <div className=" p-2 bg-customColor-4 rounded-2xl">
        <img
          src={image}
          alt=""
          className="w-full h-40 object-cover rounded-xl pointer-events-none"
        />
        <div className="">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs">{desc}</p>
          <a href={link} className="text-xs text-indigo-900" target="_blank">
            {link}
          </a>
        </div>
      </div>
    </>
  );
};
