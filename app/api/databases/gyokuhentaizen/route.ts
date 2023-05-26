import { gyokuhentaizenFindMany } from "@/db/gyokuhentaizen";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const entry = searchParams.get("entry")
  const jion = searchParams.get("jion")
  const wakun = searchParams.get("wakun")
  const radical = searchParams.get("radical")
  const remain_strokes = searchParams.get("remain_strokes")
  const ghtz_id = searchParams.get("ghtz_id")

  const results = await gyokuhentaizenFindMany({
    entry,jion,wakun,radical,remain_strokes,ghtz_id
  })

  return NextResponse.json(results);
}
