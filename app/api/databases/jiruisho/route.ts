import { jiruishoFindmany } from "@/db/jiruisho";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const entry = searchParams.get("entry")
  const hen = searchParams.get("hen")
  const bu = searchParams.get("bu")
  const onkun = searchParams.get("onkun")
  const char_count = searchParams.get("char_count")
  const gokei_search_original = searchParams.get("gokei_search_original")
  const definition = searchParams.get("definition")

  const results = await jiruishoFindmany({
    entry,hen,bu,onkun,char_count,gokei_search_original,definition
  })

  return NextResponse.json(results);
}
