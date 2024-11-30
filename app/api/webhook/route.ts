import { fcmTask } from "@/src/trigger/fcm_task";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const payload = Object.fromEntries(params.entries());

  const handle = await tasks.trigger<typeof fcmTask>("fcm", payload);

  return NextResponse.json(handle);
}
