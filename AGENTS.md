# AGENTS.md — AI Agent Guide

This file is the source of truth for AI agents working in this repository.

## Project Overview

Full-stack MERN CRUD app for managing employee records. React (Vite) frontend communicates with an Express REST API; MongoDB Atlas stores data in the `employees` database, `records` collection.

## Project Structure

```
mern-stack-example/
├── EDD.md                          # MongoDB data model — read before touching schema or routes
├── mern/
│   ├── client/                     # React 18 + Vite + Tailwind CSS frontend
│   │   ├── src/
│   │   │   ├── App.jsx             # Root component and routes
│   │   │   ├── components/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Record.jsx      # Create / edit form
│   │   │   │   └── RecordList.jsx  # Main list view
│   │   ├── vite.config.js
│   │   └── package.json
│   └── server/                     # Node.js + Express REST API
│       ├── db/
│       │   └── connection.js       # MongoDB Atlas connection (appName set here)
│       ├── routes/
│       │   └── record.js           # GET / POST / PATCH / DELETE /record
│       ├── seed.js                 # Database seed script
│       ├── server.js               # Express app entry point
│       └── package.json
└── .github/workflows/main.yaml     # CI: install, start, Cypress e2e
```

## Build and Test Commands

```bash
# Install and start the API server
cd mern/server
npm install
npm start           # requires mern/server/config.env (see Environment Variables)

# Install and start the React dev server
cd mern/client
npm install
npm run dev         # serves on http://localhost:5173

# Seed the database
cd mern/server
node seed.js        # requires ATLAS_URI in config.env

# Run Cypress e2e tests (client must be running)
cd mern/client
npx cypress run
```

## Environment Variables

Create `mern/server/config.env` (not committed):

| Variable    | Description                              | Example |
|-------------|------------------------------------------|---------|
| `ATLAS_URI` | MongoDB Atlas connection string          | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `PORT`      | Port for the Express server              | `5050`  |

## MongoDB Skills

Use the official MongoDB agent skills from https://github.com/mongodb/agent-skills
whenever the task is MongoDB-specific and a matching skill exists.

## When To Use EDD.md

Use [EDD.md](./EDD.md) as the source of truth for the MongoDB data model in this repository.

Consult [EDD.md](./EDD.md) before making changes that touch:

- MongoDB collections, document structure, or field names
- Express routes that read or write database records
- Validation, form fields, API payloads, or UI that depend on persisted data
- Schema documentation, Mermaid diagrams, or entity modeling discussions

## Atlas Ephemeral Clusters

[Atlas Ephemeral Clusters](https://www.mongodb.com/docs/atlas/tutorial/create-ephemeral-cluster/) are temporary MongoDB Atlas Free clusters that require no account or API keys. They are ideal for testing, demos, and experimentation.

Agents should prefer ephemeral clusters when a temporary MongoDB deployment is sufficient.

Create one with:

```bash
curl -X POST https://cloud.mongodb.com/api/atlas/v2/clusters/ephemeral
```

The response provides a connection string. Clusters pause after 48 hours and are deleted after 7 days unless claimed by a user.