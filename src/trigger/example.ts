import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { sendNotification } from "../lib/send_notification";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload: {
    [k: string]: string;
  }, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });
    const { date, deviceToken, title, body, vibrationLevel } = payload;

    await wait.until({ date: new Date(date) });

    const data = await sendNotification(deviceToken, title, body, vibrationLevel);

    return {
      message: "Hello, world!",
      logs: data
    }
  },
});