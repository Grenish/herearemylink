"use client";

import React, { useState, useEffect } from "react";

interface smallCardProps {
  title: string;
  link: string;
}

export const SmallCard:React.FC<smallCardProps> = ({title, link}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(link);
  }, []);

  return (
    <a href="#">
      <div
        className="bg-customColor-1 p-2 pb-4 rounded-xl smallcard text-sm relative mb-7"
        data-after={text}
      >
        {title}
      </div>
    </a>
  );
};
