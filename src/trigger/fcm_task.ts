import { task, wait } from "@trigger.dev/sdk/v3";
import { sendNotification } from "../lib/send_notification";

export const fcmTask = task({
  id: "fcm",
  run: async (payload: { [k: string]: string }) => {
    const { date, deviceToken, title, body, vibrationLevel } = payload;

    await wait.until({
      date: new Date(parseInt(date)),
      throwIfInThePast: true,
    });

    const data = await sendNotification(
      deviceToken,
      title,
      body,
      vibrationLevel
    );

    return {
      logs: data,
    };
  },
});
