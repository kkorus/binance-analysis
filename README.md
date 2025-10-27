# NestJS MongoDB Application

Bootstrap NestJS application with MongoDB and Docker Compose.

## Prerequisites

- Docker and Docker Compose
- Node.js 24.x (if running locally)

## Getting Started

### Using Docker Compose (Recommended)

1. Start the application:
```bash
docker-compose up
```

2. The API will be available at: http://localhost:3000
3. MongoDB will be available at: mongodb://localhost:27017

### Running Locally

1. Make sure MongoDB is running locally or update MONGO_URI in .env

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm run start:dev
```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot-reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

## Project Structure

```
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── docker-compose.yml
├── .env
└── package.json
```

## Docker Commands

- Start containers: `docker-compose up`
- Start in background: `docker-compose up -d`
- Stop containers: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild containers: `docker-compose up --build`
