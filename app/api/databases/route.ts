import { NextResponse } from "next/server";

export async function GET(request: Request) {

  return NextResponse.json({
    databases: {
      jiruisho: "色葉字類抄",
      racvyoxv: "万葉集",
      wakunnoshiori: "和訓栞",
      bunmeibon: "文明本節用集",
      gyokuhentaizen:"増続大広益回玉篇大全"
    },
  });
}
