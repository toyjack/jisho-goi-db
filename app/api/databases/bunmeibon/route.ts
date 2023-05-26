import { bunmeibonFindMany, BunmeibonFindManyQuery } from "@/db/bunmeibon";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const entry = searchParams.get("entry");
  const gokei = searchParams.get("gokei");
  const shouten = searchParams.get("shouten");
  const left_kun = searchParams.get("left_kun");
  const definition = searchParams.get("def");

  const query: BunmeibonFindManyQuery = {
    entry,
    gokei,
    shouten,
    left_kun,
    definition,
  };

  const response = await bunmeibonFindMany(query);

  return NextResponse.json(response);
}
