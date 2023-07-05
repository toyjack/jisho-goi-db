import { NextResponse } from "next/server";

export async function POST(request:Request){
  // TODO: ユーザー登録のAPIを作成する
  return NextResponse.json({message:"Hello World"})
}