import { jiruishoFindmany } from "@/db/jiruisho";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const entry = searchParams.get("entry")
  const gokei_search_original = searchParams.get("gokei_search_original")
  const gokei_search_current= searchParams.get("gokei_search_current")
  const definition = searchParams.get("definition")
  const char_count = searchParams.get("char_count")
  const hen = searchParams.get("hen")
  const bu = searchParams.get("bu")
  const onkun = searchParams.get("onkun")

  const results = await jiruishoFindmany({
    entry,
    gokei_search_original,
    gokei_search_current,
    definition,
    hen,
    bu,
    onkun,
    char_count,
  });

  return NextResponse.json(results);
}
