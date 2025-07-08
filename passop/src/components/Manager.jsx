import React, { useEffect } from "react";
import { useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const showPassword = () => {
    // alert("Show the password")
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/hidden.png";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    console.log(passwordArray);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer grid gap-2">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Passop
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="text-black flex flex-col px-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4px]"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 cursor-pointer"
                  width={26}
                  src="/icons/eye.png"
                  alt="show-icon"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
