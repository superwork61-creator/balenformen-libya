import type { Context } from "@netlify/edge-functions";

function isAndroid(ua: string) {
  return /Android/i.test(ua);
}

function isMobile(ua: string) {
  return /Mobile/i.test(ua);
}

export const config = { path: "/*" };

export default async (request: Request, context: Context) => {
  const ua = request.headers.get("user-agent") || "";

  const fromLibya = countryCode === "LY";
  const androidPhone = isAndroid(ua) && isMobile(ua);
  // Libya + Android => stay on Netlify
  if (fromLibya && androidPhone) return context.next();
  
  // Anyone else => go to GitHub Pages site
  return Response.redirect("https://superwork61-creator.github.io/balenformen/", 302);
};
