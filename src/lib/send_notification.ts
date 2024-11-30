import { auth } from 'google-auth-library';
import { env } from 'process';

function getKeys() {
    const keysEnvVar = env.CREDS;
    if (!keysEnvVar) {
        throw new Error('The $CREDS environment variable was not found!');
    }

    const keys = JSON.parse(keysEnvVar);
    return keys;
}

// Function to get OAuth2 access token
async function getAccessToken() {
    const keys = getKeys();
    const client = auth.fromJSON(keys);

    const accessToken = await client.getAccessToken();;
    return accessToken;
}

// Function to send FCM notification with custom payload
export async function sendNotification(deviceToken: string, title: string, body: string, vibrationLevel: string) {

    try {
        const keys = getKeys();
        const accessToken = await getAccessToken();
        const projectId = keys['project_id'];

        // Define the notification message structure
        const message = {
            message: {
                token: deviceToken,
                notification: {
                    title,
                    body
                },
                data: {
                    vibrationLevel,
                }
            }
        };

        // Send the notification via FCM API
        const response = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

        // Check the response
        const data = await response.json();
        console.log("Notification Response:", data);
        return data;
    } catch (error) {
        console.error("Error sending notification:", error);
        return error;
    }
}