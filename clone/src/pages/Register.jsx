import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const date = new Date();
const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
const yearsArray = Array.from({ length: 50 }, (_, index) => 2024 - index);
const months = ["January", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"];

const Register = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    gender: "",
    day: "",
    month: "",
    year: "",
  });

  const [mssg, setMssg] = useState({
    emailmssg: "",
    pwdmssg: "",
    NameMssg: "",
    ageMssg: "", // Added age message
  });

  // Function to calculate age
  const calculateAge = (birthYear, birthMonth, birthDay) => {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth, birthDay);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Function to handle form submission
  const submitForm = (e) => {
    e.preventDefault();

    //fetshing data from back-end
    fetch("/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        pwd: data.pwd,
      }),
    })
      .then(async (response) => {
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error("❌ JSON Parse Error:", text);
          throw new Error("Invalid JSON received from backend");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success (e.g., show a success message, redirect, etc.)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show an error message)
      });

    // Clear previous messages
    setMssg({
      emailmssg: "",
      pwdmssg: "",
      NameMssg: "",
      ageMssg: "",
    });

    let hasErrors = false;
    let newMessages = {};

    // Name validation
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(data.firstName) || !nameRegex.test(data.lastName)) {
      newMessages.NameMssg = "Name is not valid";
      hasErrors = true;
    }

    // Age validation - Check if all birthday fields are filled
    if (!data.day || !data.month || !data.year) {
      newMessages.ageMssg = "Please select your complete birth date";
      hasErrors = true;
    } else {
      // Calculate age
      const age = calculateAge(parseInt(data.year), parseInt(data.month), parseInt(data.day));

      if (age < 18) {
        newMessages.ageMssg = `You must be at least 18 years old to register. You are ${age} years old.`;
        hasErrors = true;
      }
    }

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

    // Gender validation
    if (!data.gender) {
      newMessages.ageMssg = (newMessages.ageMssg || "") + (newMessages.ageMssg ? " " : "") + "Please select your gender.";
      hasErrors = true;
    }

    // If there are errors, show them and stop
    if (hasErrors) {
      setMssg(newMessages);
      return;
    }

    // If validation passes, create user
    const newRegister = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      pwd: data.pwd,
      gender: data.gender,
      birthDate: {
        day: data.day,
        month: data.month,
        year: data.year,
      },
      age: calculateAge(parseInt(data.year), parseInt(data.month), parseInt(data.day)),
    };

    console.log("Form submitted:", newRegister); // Debug log

    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-blue-600 text-5xl font-bold text-center mb-4'>facebook</h1>
        <h2 className='text-xl font-semibold text-center'>Create a new account</h2>
        <p className='text-sm text-center text-gray-600 mb-4'>It's quick and easy.</p>
        <hr className='mb-4' />

        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          {/* Name fields */}
          <div className='flex gap-3'>
            <input type='text' placeholder='First name' className='flex-1 border border-gray-300 rounded-md px-2 py-2' value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} required />
            <input type='text' placeholder='Last name' className='flex-1 border border-gray-300 rounded-md px-2 py-2' value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} required />
          </div>
          {mssg.NameMssg && (
            <p className='text-sm' style={{ color: "red" }}>
              {mssg.NameMssg}
            </p>
          )}

          {/* Birthday */}
          <label className='text-sm text-gray-600'>Birthday</label>
          <div className='flex gap-2'>
            <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={data.month} onChange={(e) => setData({ ...data, month: e.target.value })}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={data.day} onChange={(e) => setData({ ...data, day: e.target.value })}>
              <option value=''>Day</option>
              {daysArray.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })}>
              <option value=''>Year</option>
              {yearsArray.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {mssg.ageMssg && (
            <p className='text-sm' style={{ color: "red" }}>
              {mssg.ageMssg}
            </p>
          )}

          {/* Gender */}
          <label className='text-sm text-gray-600'>Gender</label>
          <div className='flex justify-between'>
            <label className='flex items-center border border-gray-300 rounded-md px-3 py-2 w-full mr-1'>
              <input type='radio' name='gender' className='mr-2' value='female' checked={data.gender === "female"} onChange={(e) => setData({ ...data, gender: e.target.value })} /> Female
            </label>
            <label className='flex items-center border border-gray-300 rounded-md px-3 py-2 w-full mx-1'>
              <input type='radio' name='gender' className='mr-2' value='male' checked={data.gender === "male"} onChange={(e) => setData({ ...data, gender: e.target.value })} /> Male
            </label>
          </div>

          {/* Contact */}
          <input type='text' placeholder='Mobile number or email' className='border border-gray-300 rounded-md px-4 py-2' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
          {mssg.emailmssg && <p style={{ color: "red" }}>{mssg.emailmssg}</p>}

          <input type='password' placeholder='New password' className='border border-gray-300 rounded-md px-4 py-2' value={data.pwd} onChange={(e) => setData({ ...data, pwd: e.target.value })} required />
          {mssg.pwdmssg && <p style={{ color: "red" }}>{mssg.pwdmssg}</p>}

          {/* Sign Up Button */}
          <button type='submit' className='bg-green-600 text-white font-bold text-lg py-2 rounded-md hover:bg-green-700 mt-2'>
            Sign Up
          </button>

          {/* Already have account */}
          <Link to='/login' className='text-blue-600 text-sm text-center mt-2 hover:underline'>
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
