
import { helloWorldTask } from "@/src/trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    // Parse the webhook payload
    const payload = req.body;

    // Trigger the helloWorldTask with the webhook data as the payload
    const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", payload);

    return NextResponse.json(handle);
}
