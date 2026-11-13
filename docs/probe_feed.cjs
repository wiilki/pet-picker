/* Temporary integration probe: reports only response keys and field shapes, not data. */
const url = "https://petnecto.com/api/v1/pets?country=US&species=Dog&found=exclude&detail=full&limit=2";
(async function () {
 const r = await fetch(url, {headers: {Accept: "application/json"}, signal: AbortSignal.timeout(15000)});
 console.log("PETNECTO STATUS", r.status, "CORS", r.headers.get("access-control-allow-origin"));
 const data = await r.json();
 const pets = Array.isArray(data.pets) ? data.pets : (Array.isArray(data.results) ? data.results : (Array.isArray(data.data) ? data.data : []));
 console.log("ROOT KEYS:", Object.keys(data));
 console.log("PET COUNT:", pets.length);
 console.log("SAMPLE FIELD SHAPES", JSON.stringify(pets.slice(0, 1).map(p => ({
  keys: Object.keys(p),
  id_type: typeof p.id,
  name_type: typeof p.name,
  breed_type: typeof p.breeds,
  species_type: typeof p.species,
  photos_kind: Array.isArray(p.photos) ? "array" : typeof p.photos,
  photo_sample_keys: p.photos && p.photos[0] && typeof p.photos[0] === "object" ? Object.keys(p.photos[0]) : [],
  rescue_keys: p.rescue && typeof p.rescue === "object" ? Object.keys(p.rescue) : [],
  photo_rights: p.photo_rights
 })), null, 2));
 if (!r.ok) throw new Error("Feed API returned "+r.status);
 if (!pets.length) throw new Error("No US listings in current test query.");
})().catch(e => { console.error("Probe error:", e.message); process.exitCode = 1; });
