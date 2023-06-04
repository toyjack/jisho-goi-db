import { wakunnoshioriFindOne } from "@/db/wakunnosiori";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:{id:string}}) {
  const {id} = params;
  const result = await wakunnoshioriFindOne(id);

  return NextResponse.json(result);
}