const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcDAwOTVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwODU0MSwiaWF0IjoxNzc3NzA3NjQxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjNmMGUwNzgtMDM5MS00MjM0LTliYjctOGFiMTZiZDcwNTAyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FtcmlkaCBwYXRoYWsiLCJzdWIiOiJkMjI1NTJiOS03YjdlLTRkYjEtOWY2Yy1jNzM4MzQyMGJlOGMifSwiZW1haWwiOiJzcDAwOTVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzYW1yaWRoIHBhdGhhayIsInJvbGxObyI6InJhMjMxMTA1NjAzMDEwNCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQyMjU1MmI5LTdiN2UtNGRiMS05ZjZjLWM3MzgzNDIwYmU4YyIsImNsaWVudFNlY3JldCI6ImhhYlRrbnREVlZ2a0dybUQifQ.foZwVp6MqbK3pMfivgnHu4JrwHSMr61Tz1TnNatdjQI"; // same token

async function Log(stack, level, packageName, message) {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
  } catch (error) {
    console.log("Log failed (ignored)");
  }
}

module.exports = Log;