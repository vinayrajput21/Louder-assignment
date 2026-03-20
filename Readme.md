# AI Event Concierge Platform

This is the complete solution for the **Louder Assignment**.  
It is a full-stack **MERN application** that allows users to describe a corporate offsite or event in natural language and receive an **AI-generated venue proposal** with structured details.

The application uses **Gemini API** for intelligent venue suggestion generation, **MongoDB Atlas** for storing search history, **Express.js + Node.js** for backend APIs, and **React + Vite + Tailwind CSS** for a modern frontend interface.

## Live Demo
[https://louder-assignment-alpha.vercel.app/](https://louder-assignment-alpha.vercel.app/)

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Axios
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **AI Integration**: Gemini API
- **Deployment**: Vercel (Frontend) + Render (Backend)

---

## Project Structure

```bash
louder-assignment/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── searchController.js
│   ├── models/
│   │   └── Search.js
│   ├── routes/
│   │   └── searchRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── searchApi.js
│   │   ├── components/
│   │   │   ├── EventForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── HistoryList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```
## Features Implemented

- Natural language event prompt input
- AI-generated venue proposal using Gemini API
- Structured response containing:
- Venue Name
- Location
- Estimated Cost
- Why It Fits
- Search history saved in MongoDB
- Responsive UI using React + Tailwind CSS
- REST API with Express.js
- MongoDB Atlas integration
- Deployed frontend and backend


## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/vinayrajput21/Louder-assignment
cd Louder assignment
```

## backend setup
``` bash
cd backend
npm install
```
## .env 
``` bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

## Start backend:
``` bash 
npm run dev
# or
npm start
```
```bash
API will run at: http://localhost:5000
```

## frontend setup
``` bash
cd frontend
npm install
```

## Start frontend:
``` bash 
npm run dev
# or
npm start
```
```bash
Frontend runs at: http://localhost:5173
```

## Example Request

### POST /api/searches
```bash
{
  "query": "A 10-person leadership retreat in the mountains for 3 days with a $4k budget."
}
```
### Example Response
```bash
{
  "_id": "search_id",
  "query": "A 10-person leadership retreat in the mountains for 3 days with a $4k budget.",
  "proposal": {
    "venueName": "Pinecrest Mountain Retreat",
    "location": "Manali, Himachal Pradesh",
    "estimatedCost": "$4,000 approx",
    "whyItFits": "This venue is ideal for a small leadership retreat with mountain views, stay options, and team-friendly facilities."
  },
  "createdAt": "2026-03-20T10:00:00.000Z"
}

```

## Deployemnt
``` bash
https://louder-assignment-alpha.vercel.app/

```