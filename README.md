# SignUp Form using react.js and eamil.js

This project is a SignUp Form application built with React, using EmailJS for email verification, and styled with Tailwind CSS. The form includes validation for full name, mobile number, username, password, and email, with an OTP verification system for the email.

## ScreenShoot

![email-otp](https://github.com/Ganeshkshirsager/signup-form/assets/132088216/2a45c001-cae4-493c-b04b-aa5c374767ee)

![Screenshot 2024-07-10 123854](https://github.com/Ganeshkshirsager/signup-form/assets/132088216/a84c964d-4214-4b95-a24e-56a0ea428b74)


## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **User-friendly Form**: Collects user information including full name, mobile number, username, password, and email.
- **Email Verification**: Sends a verification code to the user's email using EmailJS.
- **OTP Verification**: Users can verify their email using the OTP sent to their email.
- **Form Validation**: Validates input fields to ensure they meet specified criteria.
- **Styled Components**: Uses Tailwind CSS for styling.
- **Animated Popup**: Utilizes Lottie animations for OTP verification popup.

## Dependencies

The project uses the following dependencies:

- **React**: JavaScript library for building user interfaces.
- **EmailJS**: Service to send emails directly from client-side JavaScript.
- **React Toastify**: Toaster notifications for React.
- **Lottie React**: Library for using Lottie animations in React.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **@headlessui/react**: Unstyled, accessible UI primitives for building custom components.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Set Up EmailJS**:
    - Create an account at [EmailJS](https://www.emailjs.com/).
    - Create an email service and email template.
    - Note the service ID, template ID, and user ID provided by EmailJS.
    - Update your code with these IDs where necessary.

4. **Run the Application**:
    ```sh
    npm start
    ```

## Usage

- Open the application in your browser.
- Fill in the sign-up form with valid data.
- Click on "Send Verification Code" to receive an OTP on your email.
- Enter the received OTP in the provided field in the popup to verify your email.
- Submit the form once all fields are validated and the email is verified.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```sh
    git commit -m 'Add some feature'
    ```
5. **Push to the branch**:
    ```sh
    git push origin feature/your-feature-name
    ```
6. **Create a Pull Request**.

## Explanation of Dependencies:

React: A JavaScript library for building user interfaces. It's the core library used for creating the components and managing the state of the application.

EmailJS: A service that allows sending emails directly from client-side JavaScript. It's used to send the verification code to the user's email.

React Toastify: A library for creating toast notifications in React. It's used to show success and error messages to the user.

Lottie React: A library for rendering animations using Lottie in React applications. It's used for the OTP verification popup animation.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs. It's used for styling the form and components.

@headlessui/react: A library that provides unstyled, fully accessible UI components. It's used to create the modal for the OTP verification popup.

## Summary of Installation Steps:

Clone the repository: Use git clone to download the project to your local machine.

Install dependencies: Use npm install to install all the required packages.

Set up EmailJS: Create an account on EmailJS, set up your email service and template, and update your code with the provided service ID, template ID, and user ID.

Run the application: Use npm start to start the application and open it in your browser.
