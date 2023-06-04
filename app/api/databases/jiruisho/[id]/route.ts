import { jiruishoFindOne } from "@/db/jiruisho";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await jiruishoFindOne(id);
  return NextResponse.json(result);
}
