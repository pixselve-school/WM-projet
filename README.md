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

