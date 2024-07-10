// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    emailVerified: false,
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false);

  const history = useHistory();

  const validateForm = () => {
    const { fullName, email, mobile, username, password, emailVerified } = formData;

    const fullNameValid = fullName.length >= 5;
    const emailValid = email.endsWith('@gmail.com');
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
    if (!formData.email || !formData.email.endsWith('@gmail.com')) {
      toast.error('Please enter a valid Gmail address.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    const templateParams = {
      to_email: formData.email,
      verification_code: code,
    };

    emailjs.send('service_es4ratw', 'template_7o2yajr', templateParams, '_FrLcvkHDq5nAr6qo')
      .then(() => {
        toast.success('Verification email sent!');
        setIsVerificationPopupOpen(true);
      }, (error) => {
        console.error('Failed to send email:', error);
        toast.error('Failed to send verification email.');
      });
  };

  const verifyCode = () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code.');
      return;
    }
    if (verificationCode === generatedCode) {
      setFormData({ ...formData, emailVerified: true });
      setIsVerificationPopupOpen(false);
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid verification code');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      username: '',
      password: '',
      emailVerified: false,
    });
    setVerificationCode('');
    setGeneratedCode('');
    toast.info('Form has been reset');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Form submitted successfully!');
      // Redirect to login page
      history.push('/login');
    } else {
      toast.error('Please fill the form correctly');
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
            disabled={!formData.email || !formData.email.endsWith('@gmail.com')}>
            Send Verification Code
          </button>
        </div>

        <button type="submit" disabled={!validateForm()}
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400">Submit</button>
      </form>

      <ToastContainer />

      <Transition show={isVerificationPopupOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsVerificationPopupOpen(false)}>
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="bg-white rounded p-6 shadow-lg max-w-sm w-full z-20">
              <Dialog.Title className="text-lg font-medium text-gray-900">Verify OTP</Dialog.Title>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={verifyCode}
                  className="mt-2 bg-green-500 text-white p-2 rounded w-full"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  className="mt-2 bg-purple-500 text-white p-2 rounded w-full"
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  onClick={() => setIsVerificationPopupOpen(false)}
                  className="mt-2 bg-red-500 text-white p-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SignUpForm;
