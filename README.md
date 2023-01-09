<h1 align="center">Association Manager Angular Front-end</h1>
<h4 align="center">Mael KERICHARD (@Pixselve) - Romain BRIEND (@Yami2200)</h4>
<p align="center">
   <img src="https://img.shields.io/badge/-ESIR-orange" alt="ESIR">
   <img src="https://img.shields.io/badge/-TypeScript-blue" alt="TypeScript">
   <img src="https://img.shields.io/badge/-Angular-red" alt="NestJS">
</p>

---

This project provides a web Front-end made with Angular for managing associations services provided by a [REST API](https://github.com/pixselve-school/tp1-wm). 
The user interfaces provide all tools you need to interact with, edit and display data from the API.

## ✨ How to use

We released a Docker image for anyone to use. It is available
on [GitHub Packages](https://github.com/pixselve-school/tp1-wm/pkgs/container/tp1-wm).

```bash
docker run -p 4200:4200 ghcr.io/pixselve-school/wm-projet:main
```

Or use a `docker-compose.yml` file:

You can find a complete docker compose file including the frontend and backend, a RabbitMQ instance, a PostgreSQL and a
SMTP server in the [projet-al](https://github.com/pixselve-school/projet-al) repository. (REQUIRED for feature like : email verification)


## 🧱 Build from source

### Requirements

- Node.js

### Installation

```bash
git clone
cd wm-projet
npm install
```

### Configuration

The configuration is done through environment variables in the file src/environments/environment.ts. 

### Development

```bash
npm run start
```
Navigate to `http://localhost:4200/`.

### Building

```bash
npm run build
```

## 📕 Project Details:

### 🏠 Architecture :

![Architecture](docs/schema.jpg)

Legend : 
- Red components : page component
- Green component : component used by pages
- Purple component : layout component once logged in
- Grey circle : component accessible only when logged in

### 📃 Pages :

#### Login :

> 🚗 Routes : 
>- /login
>- / -redirect if not signed in-> /login
>
> 🧰 Components :
> - **main :** login

![Login Page](docs/login.jpg)

The login page of our project is the gateway to accessing the rest of the application. 
It is designed to be simple, with a form for entering your email and password. 
Before logging in, it is mandatory to verify your email address. 
You cannot register an account without being logged in. We have made this decision for security purposes because once you are logged in, you will have full access to the application.

#### Email verification :

> 🚗 Routes :
>- /verify
>
> 🧰 Components :
> - **main :** verification

![Verification Page](docs/verif.jpg)

The verification page is used to verify the email address of new user accounts. 
When a user creates an account, they receive an email with a verification link. 
When they click on this link, they are directed to the verification page. 
On this page, the verification component reads the URL parameter and sends a post request to the API to verify the address.
(2) If the token is found and is linked to an unverified account, the account will be verified and the user will be able to log in.
(1) If the token is linked to a verified account, the user will see a message indicating that the account has already been verified.
(3) If the token is not found by the API, an error message will be displayed.

#### Users Home :

> 🚗 Routes :
> - /users
> - / -redirect if signed in-> /users
> 
> 🧰 Components :
> - **main :** users-list
> - (1) search-user
> - (2) logged-layout
> 
> 📌 Modals :
> - new-user-modal
>

![Users Home](docs/users.jpg)

The users list page displays a list of all users of the application, as well as some statistics about the users such as the total number of users, the mean age of the users, and the age range. 
The page also includes a search bar component called "search-user" which can be useful for searching for specific users or checking if a particular user ID exists. 
Each user in the list is displayed with their first name, last name, and age, and there is a button to view the user's profile in more detail. 
From this page, you can also create a new user by clicking on the button above the list, which will open the "new-user-modal" component.

#### Create User Modal :

![Create User Modal](docs/createuser.jpg)

The create user modal is a component that is displayed in a modal when the user clicks on the "Create User" button on the users list page.
It contains a form for creating a new user. 
The form contains fields for the user's first name, last name, email address, age and password.

#### User Profile :

> 🚗 Routes :
> - /users/:id
> 
> 🧰 Components :
> - **main :** user-profile
