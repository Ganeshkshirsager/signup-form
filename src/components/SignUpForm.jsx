// src/components/SignUpForm.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    emailVerified: false,
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const validateForm = () => {
    const { fullName, email, mobile, username, password, emailVerified } = formData;

    const fullNameValid = fullName.length >= 5;
    const emailValid = email.endsWith("@gmail.com");
    const mobileValid = /^[789]\d{9}$/.test(mobile);
    const usernameValid = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(username);
    const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password) && password !== username;

    return fullNameValid && emailValid && mobileValid && usernameValid && passwordValid && emailVerified;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendVerificationEmail = () => {
    if (!formData.email || !formData.email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    const templateParams = {
      to_email: formData.email,
      verification_code: code,
    };

    emailjs.send("service_es4ratw", "template_7o2yajr", templateParams, "_FrLcvkHDq5nAr6qo")
      .then(() => {
        toast.success("Verification email sent!");
      }, (error) => {
        console.error("Failed to send email:", error);
        toast.error("Failed to send verification email.");
      });
  };

  const verifyCode = () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code.");
      return;
    }
    if (verificationCode === generatedCode) {
      setFormData({ ...formData, emailVerified: true });
      toast.success("Email verified successfully!");
    } else {
      toast.error("Invalid verification code");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      emailVerified: false,
    });
    setVerificationCode("");
    setGeneratedCode("");
    toast.info("Form has been reset");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form submitted successfully!");
      // Handle form submission logic here
    } else {
      toast.error("Please fill the form correctly");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-3 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input type="text" name="fullName" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.fullName} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input type="text" name="mobile" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.mobile} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" name="username" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.username} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.password} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.email} onChange={handleChange} />
          <button type="button" onClick={sendVerificationEmail}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            disabled={!formData.email || !formData.email.endsWith("@gmail.com")}>
            Send Verification Code
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Verification Code</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1"
            value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <button type="button" onClick={verifyCode}
            className="mt-2 bg-green-500 text-white p-2 rounded">Verify OTP</button>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={resetForm} className="bg-yellow-500 text-white p-2 rounded">Reset</button>
          <button type="button" onClick={sendVerificationEmail}
            className="bg-purple-500 text-white p-2 rounded"
            disabled={!formData.email || !formData.email.endsWith("@gmail.com")}>
            Resend Verification Code
          </button>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
