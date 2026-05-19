# Project Structure Rules

These rules explain where different types of work should live in this repository.

## Folder Responsibilities

- Keep frontend application code inside the `frontend` folder.
- Keep backend application code inside the `backend` folder.
- Keep project documentation inside the `docs` folder.
- Keep long-term project memory and handoff notes inside the `memory-bank` folder.
- Keep AI assistant or contributor guidance inside `.agents/rules`.

## Frontend and Backend Separation

This project is split into two main services:

- `frontend` contains the React, TypeScript, and Vite application.
- `backend` contains the Python and FastAPI application.

Do not mix frontend code into the backend folder or backend code into the frontend folder.

## Documentation Placement

Use the right folder for the right type of documentation:

- Use `docs` for assignment notes, engineering practices, and general project documentation.
- Use `memory-bank` for long-term project context, product overview, tech stack notes, and current project status.
- Use `.agents/rules` for practical rules that future AI assistants or developers should follow when working in this repo.

## Before Adding New Files

Before creating a new file or folder, check whether an existing location already fits the purpose. The goal is to keep the repo easy to understand for future contributors.