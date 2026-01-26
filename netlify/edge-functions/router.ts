import type { Context } from "@netlify/edge-functions";

function isAndroid(ua: string) {
  return /Android/i.test(ua);
}

export const config = { path: "/*" };

export default async (request: Request, context: Context) => {
  const countryCode = context.geo?.country?.code || ""; // "LY"
  const ua = request.headers.get("user-agent") || "";

  const fromLibya = countryCode === "LY";
  const android = isAndroid(ua);

  // Libya + Android => stay on Netlify
  if (fromLibya && android) return context.next();

  // Anyone else => go to GitHub Pages site
  return Response.redirect("https://superwork61-creator.github.io/balenformen/", 302);
};
