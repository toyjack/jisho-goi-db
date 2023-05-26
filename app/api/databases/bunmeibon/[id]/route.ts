import { bunmeibonFindUnique } from "@/db/bunmeibon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const result = await bunmeibonFindUnique(params.id);

  if (!result) {
    return NextResponse.error();
  }

  return NextResponse.json(result);
}
