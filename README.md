# Welcome to FunkoStore!

Thank you for choosing our application. Below, we provide you with the necessary information to test login functionality for both administrators and regular users.

## Installation

To install the application, please follow the steps below:

1. Clone the repository to your local machine.
2. Open the project in your IDE of choice.
3. Run `npm install` to install all dependencies.
4. Go to the `/server` folder and run `npm install` to install all dependencies for the server.

## Development server

Ensure that you have three separate terminals open to run the Angular app, JSON server, and the additional backend server.

1. In the first terminal, run `npm run start:server` to start the JSON server.
2. In the second terminal, run `npm run funkos` to start json-server
3. In the third terminal, go to the `/server` folder and run `npm run start:server` to start the backend server.

## Administrator Credentials

To log in as an administrator, please use the following credentials:

- **Email:** admin@gmail.com
- **Password:** 123456

Please note that these credentials are intended exclusively for development and testing purposes.

## Regular User Credentials

If you wish to log in as a regular user, you can use the following credentials:

- **Email:** user@gmail.com
- **Password:** 123456

## Technologies Used

- Mercado Pago API: Used for payment transactions with test credentials.
- JSON Server: Used to simulate a backend server.
- Firebase: Utilized for authentication processes.
- Firestore: Stores user data, including the shopping cart for logged-in users.
- IndexedDB: Manages the shopping cart for non-logged-in users.
- SweetAlert2: Library used for customized alerts.
- AOS: Library for smooth animations.
- Ngx-Spinner: Library used for loading animations.
- Express: Used to create the backend server.


Thank you for trying out our application! If you have any questions or encounter any issues, feel free to reach out to our support team.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

