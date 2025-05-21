
# 🏏 IPL Player Management API

This is a Node.js and Express-based REST API for managing IPL players with MongoDB. It includes functionality for adding, listing, updating, deleting, and viewing detailed information about players.

## 🚀 Base URL
```
https://ipl-management.onrender.com/api
```

---

## 📌 Endpoints Overview

| Method | Endpoint                          | Description                            |
|--------|-----------------------------------|----------------------------------------|
| POST   | `/add/player`                     | Add a single IPL player                |
| POST   | `/many/player`                    | Add multiple players at once           |
| GET    | `/players`                        | List all players (pagination, filter, search, sort) |
| GET    | `/players/:id/description`        | Get detailed info about a player       |
| PATCH  | `/players/:id`                    | Update a player's information          |
| DELETE | `/players/:id`                    | Delete a player                        |

---

## 🔹 1. Add Player

**POST** `/add/player`

### Request Body (JSON):
```
{
  "name": "Virat Kohli",
  "team": "RCB",
  "country": "India",
  "runs": 6000,
  "image": "https://linktoimage.com/kohli.jpg",
  "role": "Batsman",
  "salary": 150000000
}
```

### Response:
```
{
  "message": "Player created successfully",
  "playerId": "<insertedId>"
}
```

---

## 🔹 2. Add Many Players

**POST** `/many/player`

### Request Body:
```
[
  {
    "name": "Player 1",
    "team": "MI",
    "country": "India",
    "runs": 2000,
    "image": "https://linktoimage.com/player1.jpg",
    "role": "Bowler",
    "salary": 50000000
  }
]
```

---

## 🔹 3. List Players

**GET** `/players`

### Query Parameters:
- `page` (default: `1`)
- `limit` (default: `10`)
- `team`: Filter by team
- `sortBy`: `runs` or `salary`
- `search`: Search by player name

### Response:
```
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "players": [
    {
      "id": "650fa6e429f30e75e4b909b8",
      "name": "Virat Kohli",
      "image": "https://linktoimage.com/kohli.jpg",
      "role": "Batsman",
      "team": "RCB"
    }
  ]
}
```

---

## 🔹 4. Get Player Description

**GET** `/players/:id/description`

### Response:
```
{
  "name": "Virat Kohli",
  "team": "RCB",
  "country": "India",
  "runs": 6000,
  "image": "https://linktoimage.com/kohli.jpg",
  "role": "Batsman",
  "salary": 150000000
}
```

---

## 🔹 5. Update Player

**PATCH** `/players/:id`

### Request Body Example:
```
{
  "runs": 6200,
  "salary": 160000000
}
```

### Response:
```
{
  "message": "Player updated successfully"
}
```

---

## 🔹 6. Delete Player

**DELETE** `/players/:id`

### Response:
```
{
  "message": "Player deleted successfully"
}
```

---

## ✅ Validation Rules (Joi)

| Field     | Rule                                               |
|-----------|----------------------------------------------------|
| name      | Required, non-empty string                         |
| team      | Required, non-empty string                         |
| country   | Required, non-empty string                         |
| runs      | Required, integer                                  |
| image     | Required, valid URI                                |
| role      | Required, one of `Batsman`, `Bowler`, `All-rounder` |
| salary    | Required, positive number                          |

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Joi (for validation)

---

## 📦 Run Locally

1. Clone the repo
2. Run `npm install`
3. Add a `.env` file with your MongoDB URI and PORT
4. Run `npm start`