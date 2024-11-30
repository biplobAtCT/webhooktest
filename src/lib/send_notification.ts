import { GoogleAuth } from "google-auth-library";
import { env } from "process";

function getKeys() {
  const keysEnvVar = env.CREDS;
  if (!keysEnvVar) {
    throw new Error("The $CREDS environment variable was not found!");
  }

  const keys = JSON.parse(keysEnvVar);
  return keys;
}

async function getAccessTokenFile() {
  const keys = getKeys();

  const auth = new GoogleAuth({
    credentials: keys,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"], // Required scope for FCM
  });
  const accessToken = await auth.getAccessToken();
  return accessToken;
}

// Function to send FCM notification with custom payload
export async function sendNotification(
  deviceToken: string,
  title: string,
  body: string,
  vibrationLevel: string
) {
  try {
    const keys = getKeys();
    const accessToken = await getAccessTokenFile();
    const projectId = keys["project_id"];

    // Define the notification message structure
    const message = {
      message: {
        token: deviceToken,
        notification: {
          title,
          body,
        },
        data: {
          vibrationLevel,
        },
      },
    };

    // Send the notification via FCM API
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    // Check the response
    const data = await response.json();
    console.log("Notification Response:", data);
    return data;
  } catch (error) {
    console.error("Error sending notification:", error);
    return error;
  }
}
