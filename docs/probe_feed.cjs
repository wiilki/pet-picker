/* Temporary live integration probe: public listing fields only. */
const urls = [
  "https://petnecto.com/api/v1/pets?country=US&species=Dog&found=exclude&detail=full&limit=24",
  "https://petnecto.com/api/v1/pets?country=US&species=Cat&found=exclude&detail=full&limit=24",
  "https://petnecto.com/api/v1/pets?country=TW&species=Dog&found=exclude&detail=full&limit=4",
  "https://petnecto.com/api/v1/pets?country=US&species=Dog&near=91710&miles=100&found=exclude&detail=full&limit=4"
];
(async function () {
 for (const url of urls) {
  const res = await fetch(url, { signal: AbortSignal.timeout(16000) });
  const data = await res.json();
  const pets = Array.isArray(data.pets) ? data.pets : [];
  console.log(JSON.stringify({
   request: url,
   status: res.status,
   total: data.total,
   count: pets.length,
   rights_counts: pets.reduce((a,p)=>{a[p.photo_rights||"unknown"]=(a[p.photo_rights||"unknown"]||0)+1;return a},{}),
   real_photo_count: pets.filter(p=>Array.isArray(p.photos)&&p.photos.length).length,
   sample: pets.slice(0,1).map(p=>({
    id:p.id, name:p.name, species:p.species, breeds:p.breeds,
    age_group:p.age_group,place:p.place, rescue:p.rescue&&{name:p.rescue.name,place:p.rescue.place},
    photo_rights:p.photo_rights, photos:p.photos&&p.photos.slice(0,1),
    photo_link:p.photo_link, listing_url:p.listing_url, url:p.url, good_with:p.good_with
   }))
  },null,2));
  if (!res.ok) throw new Error("Feed returned " + res.status);
 }
})().catch(e=>{console.error("Probe failed", e.message);process.exitCode=1});
