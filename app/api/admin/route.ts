import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { getToken,JWT } from "next-auth/jwt";

interface Token extends JWT {
  account:{
    access_token:string
  },
}

export async function GET(req: NextRequest) {
  const token = (await getToken({ req })) as Token;
  if (token){
     const jwt = token.account.access_token;

     const res = await fetch(`${process.env.API_ROOT}/auth/profile`, {
       headers: {
         Authorization: `Bearer ${jwt}`, // <-- add token to request
         "Content-Type": "application/json",
       },
     });
     const profile = await res.json();
     return NextResponse.json({ profile });
  }

  return NextResponse.json({
    msg:"not authorized"
  })
 
}
