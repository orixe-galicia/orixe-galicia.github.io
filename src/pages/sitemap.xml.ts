import { getAllMissions } from "../content";

export const prerender = true;

export async function GET() {
  const site = "https://orixe-galicia.github.io";
  const missions = await getAllMissions();

  const urls = [
    `${site}/`,
    `${site}/misiones/`,
    `${site}/mapa/`,
    ...missions.map((mission) => `${site}/misiones/${mission.data.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
