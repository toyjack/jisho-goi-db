import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/hzwm/:path*"],
};

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("Authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    // atob is deprecated but Buffer.from is not available in Next.js edge.
    const [user, password] = atob(authValue).split(":");

    if (
      user === process.env.BASIC_AUTH_USERNAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      {
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        status: 401,
      }
    );
  } else {
    return NextResponse.json(
      { error: "Please enter credentials" },
      {
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        status: 401,
      }
    );
  }
}
