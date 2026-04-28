import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });

  const [mssg, setMssg] = useState({
    emailmssg: "",
    pwdmssg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 

    let hasErrors = false;
    let newMessages = {};

    // Clear previous messages
    setMssg({
      emailmssg: "",
      pwdmssg: "",
    });

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      newMessages.emailmssg = "Invalid email format";
      hasErrors = true;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(data.pwd)) {
      newMessages.pwdmssg = "Password must be at least 8 characters long and contain at least one number";
      hasErrors = true;
    }

    // If there are errors, show them and stop
    if (hasErrors) {
      setMssg(newMessages);
      return;
    }
  
    fetch("/api/login.php", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        pwd: data.pwd,
      }),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error(`Invalid JSON: ${text}`);
        }
      })
      .then((data) => {
        if (data.success) {
           navigate("/HomePage");
        } else {
           setMssg({ emailmssg: data.message });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err.message, err);
      });
  };

  return (
    <section className='flex items-center justify-center min-h-screen bg-gray-100 px-6'>
      <div className='flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full'>
        {/* Left Side Text */}
        <div className='flex-1 text-center md:text-left'>
          <h1 className='text-blue-600 text-5xl font-bold mb-4'>facebook</h1>
          <p className='text-xl text-gray-800'>Connect with friends and the world around you on Facebook.</p>
        </div>

        {/* Right Side Form */}
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='text' placeholder='Email or Phone Number' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className='border border-gray-300 rounded-md px-4 py-2' />
            {mssg.emailmssg && <p style={{ color: "red" }}>{mssg.emailmssg}</p>}

            <input type='password' placeholder='Password' value={data.pwd} onChange={(e) => setData({ ...data, pwd: e.target.value })} className='border border-gray-300 rounded-md px-4 py-2' />
            {mssg.pwdmssg && <p style={{ color: "red" }}>{mssg.pwdmssg}</p>}

            <button type='submit' className='bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700'>
              Log In
            </button>
            <Link href='#' className='text-blue-500 text-sm text-center hover:underline'>
              Forgot account?
            </Link>
            <hr />

            <Link to='/Register' className='text-center bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600'>
              Create New Account
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
