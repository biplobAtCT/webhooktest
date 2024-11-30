
import { helloWorldTask } from "@/src/trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Parse query parameters
    const params = req.nextUrl.searchParams;

    // Convert query parameters to an object
    const payload = Object.fromEntries(params.entries());

    // Trigger the helloWorldTask with the webhook data as the payload
    const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", payload);

    return NextResponse.json(handle);
}
