import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () =>{
    let request = await fetch("http://localhost:3000/")
    let passwords = await request.json();
    console.log(passwords)
    setPasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    // alert("Show the password")
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
  if (
    form.site.length > 3 &&
    form.username.length > 3 &&
    form.password.length > 3
  ) {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    const id = uuidv4();
    const newPassword = { ...form, id };

    setPasswordArray([...passwordArray, newPassword]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword),
    });

    setForm({ site: "", username: "", password: "" });
    toast("Password saved!", { position: "top-right", autoClose: 5000, theme: "dark" });
  } else {
    toast("Error: Password not saved!", { position: "top-right", autoClose: 5000, theme: "dark" });
  }
};

  const deletePassword = async (id) => {
  let c = confirm("Do you really want to delete this password?");
  if (c) {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("Password Deleted!", { position: "top-right", autoClose: 5000, theme: "dark" });
  }
};

  const editPassword = (id) => {
  const existing = passwordArray.find(item => item.id === id);
  setForm(existing);
  setPasswordArray(passwordArray.filter((item) => item.id !== id));
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    // alert("copied to clipboard " + text)
    toast("copied to clipboard " + text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full">
      </div>

      <div className="mycontainer min-h-[88vh]">
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
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
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
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900 gap-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="text-white uppercase bg-green-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Site
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td
                        scope="row"
                        className="py-2 border border-white text-center width-32"
                      >
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={() => {
                            copytext(item.site);
                          }}
                        >
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <div className="cursor-pointer">
                            <img
                              src="/icons/copy.png"
                              alt="copy-img"
                              width={20}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center width-32">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={() => {
                            copytext(item.username);
                          }}
                        >
                          {item.username}
                          <div className="cursor-pointer">
                            <img
                              src="/icons/copy.png"
                              alt="copy-img"
                              width={20}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center width-32">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={() => {
                            copytext(item.password)
                          }}
                        >
                          {"*".repeat(item.password.length)}
                          <div className="cursor-pointer">
                            <img
                              src="/icons/copy.png"
                              alt="copy-img"
                              width={20}
                              style={{ marginLeft: "30px" }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center width-32">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              stroke="bold"
                              style={{ width: "25px;", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{ width: "25px;", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
