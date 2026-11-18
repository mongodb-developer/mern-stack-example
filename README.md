# MERN Stack Example: Employee Records App (MongoDB Atlas, Express, React, Node.js)

A full-stack CRUD application built with MongoDB, Express, React, and Node.js (MERN).

Companion code for the [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) and [video walkthrough](https://www.youtube.com/watch?v=4nKWREmCvsE).

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mongodb-developer/mern-stack-example?style=social)](https://github.com/mongodb-developer/mern-stack-example/stargazers)

## Project Overview

This project demonstrates an employee record tracker:

- Create records
- Read records from MongoDB Atlas
- Update records
- Delete records

The React app in `mern/client` calls an Express API in `mern/server`, and data is stored in MongoDB Atlas.

## MERN Stack Architecture

```
┌─────────────────────┐       REST (JSON)      ┌──────────────────────────┐
│   React (Vite)      │ ─────────────────────► │  Express API             │
│   mern/client       │ ◄───────────────────── │  mern/server             │
│   :5173             │                        │  :5050                   │
└─────────────────────┘                        └───────────┬──────────────┘
                                                           │ MongoDB Node.js driver
                                                           ▼
                                               ┌──────────────────────────┐
                                               │  MongoDB Atlas           │
                                               │  database: employees     │
                                               │  collection: records     │
                                               └──────────────────────────┘
```

Stack:

- Frontend: React 18, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express 4, MongoDB Node.js Driver 6
- Database: MongoDB Atlas (`employees.records` collection)

## Project Structure

```text
mern/
   client/   # React + Vite frontend
   server/   # Express API + MongoDB integration
```

## Prerequisites

- Node.js 20+
- npm 9+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) cluster
   - Or [create an Atlas Ephemeral Cluster](https://www.mongodb.com/docs/atlas/tutorial/create-ephemeral-cluster/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel), a temporary Atlas Free cluster that you can claim within 7 days to convert into a standard Free cluster

## Quick Start and MongoDB Setup

```bash
# 1) Clone
git clone https://github.com/mongodb-developer/mern-stack-example.git
cd mern-stack-example

# 2) Create server environment file
cp mern/server/config.env.example mern/server/config.env
```

Update `mern/server/config.env` with one of the following `ATLAS_URI` values:

Atlas cluster:

```env
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
PORT=5050
```

If you are new to Atlas, use the [Atlas quick start guide](https://www.mongodb.com/docs/atlas/getting-started/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) and then paste your connection string into `ATLAS_URI`.

Optional: seed sample data:

```bash
cd mern/server && node seed.js
```

Start the backend API:

```bash
cd mern/server
npm install
npm start
```

Start the frontend in a second terminal:

```bash
cd mern/client
npm install
npm run dev
```

Open `http://localhost:5173`.

## GitHub Codespaces and Dev Containers

GitHub Codespaces is an easy and fast way to get this project running without installing anything locally. It uses a dev container, which is a Docker environment configured for development.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mongodb-developer/mern-stack-example?quickstart=1)

## REST API Endpoints

Base URL: `http://localhost:5050`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/record` | Retrieve all records |
| `GET` | `/record/:id` | Retrieve one record by ID |
| `POST` | `/record` | Create a record |
| `PATCH` | `/record/:id` | Update a record |
| `DELETE` | `/record/:id` | Delete a record |

Example request body for create or update:

```json
{
   "name": "Jane Smith",
   "position": "Developer",
   "level": "Senior"
}
```

## MongoDB Features Demonstrated

| Feature | Where |
|---|---|
| [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) | `mern/server/db/connection.js` |
| [CRUD operations](https://www.mongodb.com/docs/manual/crud/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) | `mern/server/routes/record.js` |
| [MongoDB Atlas](https://www.mongodb.com/atlas?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) | `ATLAS_URI` in `config.env` |
| [Server API version](https://www.mongodb.com/docs/manual/reference/stable-api/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel) | `ServerApiVersion.v1` in `connection.js` |

## Troubleshooting

### Cannot connect to MongoDB Atlas

- Verify `ATLAS_URI` in `mern/server/config.env`
- Confirm your database user credentials are correct in `mern/server/config.env`
- Confirm your IP is in [Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel)

### Backend fails to start

- Check Node version: `node --version`
- Confirm `mern/server/config.env` exists
- Reinstall dependencies in `mern/server`: `npm install`

### Frontend shows empty data

- Confirm backend is running on `:5050`
- Open browser dev tools and check network requests
- Confirm records exist in Atlas (or run `node seed.js` in the server folder)

### Port already in use

- Change `PORT` in `mern/server/config.env`, or stop the process using `:5050`

## Community and Support

- Use [GitHub Issues](https://github.com/mongodb-developer/mern-stack-example/issues) for bugs and feature requests
- Use [MongoDB Community Forums](https://www.mongodb.com/community/forums/) for general MongoDB questions

## Additional Resources

- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel)
- [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/?utm_campaign=devrel&utm_medium=referral&utm_source=github&utm_content=mern.stack.example&utm_term=learning.fuel)

## License

[Apache 2.0](LICENSE)

## Disclaimer

This repository is for educational use and is not a supported MongoDB product.
