import { getCollection } from "astro:content";

export async function getAllMissions() {
  const missions = await getCollection("missions");
  return missions.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getMissionById(id: string) {
  const missions = await getAllMissions();
  return missions.find((mission) => mission.data.id === id);
}

export async function getMissionBySlug(slug: string) {
  const missions = await getAllMissions();
  return missions.find((mission) => mission.data.slug === slug);
}
