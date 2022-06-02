import {getToken} from "next-auth/jwt";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {jwt} from "../../utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!session) {
    const {origin, pathname} = req.nextUrl.clone();
    return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
    // const url = req.nextUrl.clone();
    // url.pathname = "/auth/login";
    // url.search = `p=${req.page.name}`;
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
