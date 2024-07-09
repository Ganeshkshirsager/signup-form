# SignUp Form Application

This project is a SignUp Form application built with React, using EmailJS for email verification, and styled with Tailwind CSS. The form includes validation for full name, mobile number, username, password, and email, with an OTP verification system for the email.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-friendly Form**: Collects user information including full name, mobile number, username, password, and email.
- **Email Verification**: Sends a verification code to the user's email using EmailJS.
- **OTP Verification**: Users can verify their email using the OTP sent to their email.
- **Form Validation**: Validates input fields to ensure they meet specified criteria.
- **Styled Components**: Uses Tailwind CSS for styling.

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
- Enter the received OTP in the provided field to verify your email.
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
