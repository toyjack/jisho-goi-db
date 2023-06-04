import { wakunnoshioriFindMany } from "@/db/wakunnosiori";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const entry = searchParams.get("entry");
  const definitions = searchParams.get("definitions");

  const results = await wakunnoshioriFindMany({
    entry, definitions,
  })

  return NextResponse.json(results);
}
