import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white py-[10px] grid justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-500">&lt;</span>
          Passop
          <span className="text-green-500">OP/&gt;</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        Created with
        <lord-icon
          src="https://cdn.lordicon.com/ajzwsrcs.json"
          trigger="hover"
          colors="primary:#f28ba8,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#c71f16"
        ></lord-icon>
        by Kalpana
      </div>
    </div>
  );
};

export default Footer;
