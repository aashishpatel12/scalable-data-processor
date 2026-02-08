# Scalable Real-Time Data Processor

A high-frequency data monitoring dashboard built with **React**, **Node.js**, and **MongoDB**. This project demonstrates scalable architecture patterns including **virtualized lists**, **custom rate limiting**, and **efficient state management**.

## Features

- **Frontend**:
  - **Virtualized List**: Custom React Hook (`useVirtualizer`) to handle 5,000+ records at 60fps.
  - **Real-Time Stream**: Simulated data stream pushing updates to the Backend API.
  - **Optimistic UI**: Immediate UI updates for smooth user experience while data persists in the background.
  - **Error Handling**: Toast notifications for API errors (e.g., Rate Limits).
  - **Modular Architecture**: Clean separation of concerns with `components`, `services`, and `hooks`.

- **Backend**:
  - **Custom Rate Limiter**: Middleware built from scratch (no third-party libs) using a Sliding Window approach (5000 requests/minute).
  - **Custom Request Validator**: Middleware for schema validation without external dependencies.
  - **MongoDB Integration**: Optimized Mongoose schema with indexing for time-series data.
  - **Structured API**: MVC pattern with dedicated `controllers`, `routes`, and `middleware`.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Architecture & Decisions

### 1. Visualization Strategy (Virtualization)

To handle 5,000+ records without DOM bloat, I implemented a **Virtual Window** pattern.

- **Why?** Rendering 5,000 DOM nodes freezes the browser.
- **Solution**: The `useVirtualizer` hook calculates only the visible items + a small buffer based on the scroll position. The container height is set to `totalItems * itemHeight` to maintain the scrollbar, but only ~20 items exist in the DOM at any time.

### 2. Backend Scalability

- **Rate Limiting**: Implemented an in-memory sliding window limiter (5000 req / minute) to accommodate high-frequency data ingestion while protecting the API.
- **Validation**: A lightweight, schema-based validator ensures data integrity before it reaches the controller logic.

### 3. State Management

- **Stream Handling**: Data updates are batched and processed to minimize re-renders. The `streamActive` toggle gives users control over the simulated load.
- **API Integration**: Frontend services abstract API calls, handling successful responses with optimistic updates and errors with user feedback (Toast).

## Installation & Run

### Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or via Atlas)

### 1. Setup Backend

```bash
cd backend
npm install
# Create .env file with MONGO_URI if needed (defaults to localhost)
npm run dev
```

Server runs on `http://localhost:5000`.

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Testing

- **Rate Limit**: Send >5000 requests/1min to test the 429 response. The frontend will automatically pause the stream and show an error toast.
- **Stream**: Toggle "Start Simulation" to begin high-frequency data ingestion.
- **Performance**: Scroll through the list while simulation is active to verify smooth 60fps rendering.
