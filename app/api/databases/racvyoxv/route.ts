import { racvyoxvFindMany } from "@/db/racvyoxv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);

  // const term = searchParams.get("term");
  // const kanji_pair_length = searchParams.get("kanji_pair_length");

  // const results = await racvyoxvFindMany({
  //   term, kanji_pair_length,
  // })

  // return NextResponse.json(results);

  // TODO: delete this
  return NextResponse.json({});
}
