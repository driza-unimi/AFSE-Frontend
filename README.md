# AFSE Frontend

The AFSE Frontend is a modern web application built with Vue.js 3, Vuetify 3, Vite, and Pinia. This guide provides instructions for setting up the project, running the development server, and building the production version.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [License](#license)

## Project Overview

The AFSE Frontend is designed to provide a user-friendly interface for interacting with the AFSE backend API. It features a responsive design with modern UI components, state management, and fast build times.

## Technologies Used

- **Vue.js 3**: Progressive JavaScript framework for building user interfaces.
- **Vuetify 3**: Material Design component framework for Vue.js.
- **Vite**: Next-generation front-end tooling for faster builds and development.
- **Pinia**: State management library for Vue.js applications.

## Installation and Setup

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/driza-unimi/AFSE---Frontend.git
   cd afse-frontend
   ```

2. **Install Dependencies**

   Install the required packages using:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

    Create a .env file in the root directory of the project and add the following configuration:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```
VITE_API_BASE_URL: The base URL for the API endpoints. Adjust this to match your backend API URL.

## Running the Application
Once the setup is complete, you can start the development server with:

   ```bash
   npm run dev
   ```
This command will start a local development server and provide a URL to view your application in the browser (default is http://localhost:5173).

## License
This project is licensed under the MIT License. For more details, see the LICENSE file.
