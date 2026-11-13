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


(async function probeCatPhotoFeed(){
 for (const base of ["https://adoptacat.org","https://adopt-a-cat.org"]) {
   try {
     const response = await fetch(base + "/data/cats_available.json", {signal: AbortSignal.timeout(12000)});
     const data = await response.json();
     const cats = Array.isArray(data) ? data : (Array.isArray(data.cats) ? data.cats : (Array.isArray(data.animals) ? data.animals : []));
     console.log("ALASKA PROBE",JSON.stringify({base,status:response.status,cors:response.headers.get("access-control-allow-origin"),keys:Array.isArray(data)?"array":Object.keys(data),count:cats.length,first_cat:cats[0]&&{keys:Object.keys(cats[0]),name:cats[0].name,images:cats[0].photos||cats[0].image||cats[0].imageUrl,slug:cats[0].slug}}));
   } catch(e){console.log("ALASKA PROBE ERROR",base,e.message);}
 }
})().catch(e=>console.log("Additional probe failed",e.message));
