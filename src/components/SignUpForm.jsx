import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { auth } from "./firebase";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    emailVerified: false,
    phoneVerified: false,
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false);
  const [isPhoneVerificationPopupOpen, setIsPhoneVerificationPopupOpen] = useState(false);

  const validateForm = () => {
    const { fullName, email, mobile, username, password, emailVerified, phoneVerified } = formData;

    const fullNameValid = fullName.length >= 5;
    const emailValid = email.endsWith("@gmail.com");
    const mobileValid = /^[789]\d{9}$/.test(mobile);
    const usernameValid = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(username);
    const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password) && password !== username;

    return fullNameValid && emailValid && mobileValid && usernameValid && passwordValid && emailVerified && phoneVerified;
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

    emailjs
      .send("service_es4ratw", "template_7o2yajr", templateParams, "_FrLcvkHDq5nAr6qo")
      .then(() => {
        toast.success("Verification email sent!");
        setIsVerificationPopupOpen(true);
      })
      .catch((error) => {
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
      setIsVerificationPopupOpen(false);
    } else {
      toast.error("Invalid verification code");
    }
  };

  const sendPhoneVerificationCode = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    auth
      .signInWithPhoneNumber(`+91${formData.mobile}`, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsPhoneVerificationPopupOpen(true);
        toast.success("Phone verification code sent!");
      })
      .catch((error) => {
        console.error("Failed to send phone verification code:", error);
        toast.error("Failed to send phone verification code.");
      });
  };

  const verifyPhoneCode = () => {
    const code = verificationCode;

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        setFormData({ ...formData, phoneVerified: true });
        toast.success("Phone verified successfully!");
        setIsPhoneVerificationPopupOpen(false);
      })
      .catch((error) => {
        console.error("Invalid phone verification code:", error);
        toast.error("Invalid phone verification code");
      });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      emailVerified: false,
      phoneVerified: false,
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
          <input
            type="text"
            name="fullName"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.mobile}
            onChange={handleChange}
          />
          <div id="recaptcha-container"></div>
          <button
            type="button"
            onClick={sendPhoneVerificationCode}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            disabled={!formData.mobile}
          >
            Send Phone Verification Code
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={formData.email}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={sendVerificationEmail}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            disabled={!formData.email || !formData.email.endsWith("@gmail.com")}
          >
            Send Email Verification Code
          </button>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={resetForm} className="bg-yellow-500 text-white p-2 rounded">
            Reset
          </button>
        </div>

        <button
          type="submit"
          disabled={!validateForm()}
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>

      <ToastContainer />

      <Transition show={isVerificationPopupOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsVerificationPopupOpen(false)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Verify Email
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                          placeholder="Enter verification code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={verifyCode}
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsVerificationPopupOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isPhoneVerificationPopupOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsPhoneVerificationPopupOpen(false)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Verify Phone
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                          placeholder="Enter phone verification code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={verifyPhoneCode}
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsPhoneVerificationPopupOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SignUpForm;
