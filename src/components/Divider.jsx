"use client";

import React from "react";

const Divider = ({ children, height = "80px", background }) => {
  return (
    <div
      style={{ height , marginTop:"40px" ,backgroundColor: background, color: "#8AAEAE"}}
      className="w-full flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Divider;
