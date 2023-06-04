import { gyokuhentaizenFindOne } from "@/db/gyokuhentaizen";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { ghtz_id: string };
  }
) {
  const response = await gyokuhentaizenFindOne(params.ghtz_id);

  return NextResponse.json(response);
}