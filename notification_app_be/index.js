const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Log = require("../logging_middleware/logger");

const app = express();
app.use(express.json());
app.use(cors()); // ✅ CORS FIX

// TOKEN (your real one)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcDAwOTVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjkzMSwiaWF0IjoxNzc3NzA2MDMxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzZiOWQyNDctNmE2Mi00YjkzLTllYjMtYzIzYTg1M2ZlMjRlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FtcmlkaCBwYXRoYWsiLCJzdWIiOiJkMjI1NTJiOS03YjdlLTRkYjEtOWY2Yy1jNzM4MzQyMGJlOGMifSwiZW1haWwiOiJzcDAwOTVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzYW1yaWRoIHBhdGhhayIsInJvbGxObyI6InJhMjMxMTA1NjAzMDEwNCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQyMjU1MmI5LTdiN2UtNGRiMS05ZjZjLWM3MzgzNDIwYmU4YyIsImNsaWVudFNlY3JldCI6ImhhYlRrbnREVlZ2a0dybUQifQ.1Gr1rvN0vPMCSEVs8xinz70QeZMflQNqyvlMZAlRbYA";

// test route
app.get("/", async (req, res) => {
  Log("backend", "info", "route", "Home route accessed");
  res.send("Server is working");
});

// notifications route
app.get("/notifications", async (req, res) => {
  try {
    Log("backend", "info", "route", "Fetching notifications");

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    let notifications = response.data.notifications;

    // priority sorting
    const priorityMap = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const topNotifications = notifications.slice(0, 10);

    res.json({
      success: true,
      data: topNotifications
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching notifications");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});