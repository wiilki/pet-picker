/* Integration smoke tests for static Pet Picker, using a fake public API response. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const dom = new JSDOM(html, {url:"https://wiilki.github.io/pet-picker/", runScripts:"outside-only"});
const w = dom.window;
w.HTMLElement.prototype.scrollIntoView = function () {};
w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
w.HTMLDialogElement.prototype.close = function () { this.open = false; };
const fixture = {
  schema_version:"0.1.0", total:2, page:1, pages:1, next_cursor:null, pets:[
    {id:"us-mc-test01",name:"Bacon Bear",species:"Dog",breeds:["Rottweiler"],age_group:"Adult",
     size:"Large",sex:"Male",color:"Black",summary:"A gentle dog who likes naps.",
     photos:[],photo_rights:"link-out", photo_link:"https://example.org/pet/1",
     url:"https://petnecto.com/pets/us-mc-test01",listing_url:"https://example.org/pet/1",
     rescue:{name:"Community Animal Shelter",place:{city:"Derwood",region:"Maryland"}},
     good_with:{dogs:null,cats:true,kids:false}},
    {id:"us-kc-test02",name:"<script>Not markup</script>",species:"Dog",breeds:["Labrador"],age_group:"Young",size:"Small",sex:"Female",
     photos:[{small:"https://example.org/cropped.jpg",large:"https://example.org/large.jpg"}],
     photo_rights:"open-licence",listing_url:"https://example.org/pet/2",
     rescue:{name:"Neighborhood Rescue",place:{city:"Kent",region:"Washington"}},
     good_with:{dogs:true,cats:null,kids:null}}
  ]
};
let requested = [];
w.fetch = async function (url) {
 requested.push(String(url));
 return {ok:true,status:200,json: async () => fixture};
};
w.eval(fs.readFileSync(path.join(root,"app.js"),"utf8"));
w.eval(fs.readFileSync(path.join(root,"results.js"),"utf8"));
const sleep = () => new Promise(resolve=>setTimeout(resolve,12));
(async()=>{
 await sleep();
 const doc = w.document;
 assert.equal(doc.querySelectorAll(".result-card").length,2,"initial live pet cards");
 assert.equal(doc.querySelector(".result-name").textContent,"Bacon Bear");
 assert.match(doc.querySelector(".result-eyebrow").textContent,/Derwood, Maryland/);
 assert.equal(doc.querySelector(".result-photo-link").href,"https://example.org/pet/1","link-only images point to shelter");
 assert.equal(doc.querySelectorAll(".result-card")[1].querySelector("img").src,"https://example.org/large.jpg");
 assert.equal(doc.querySelector("script[src='results.js']").getAttribute("src"),"results.js");
 const normalized = w.PetPickerResults.normalize(fixture.pets[0]);
 assert.equal(normalized.photos.length,0,"honor photo link-out restrictions");
 assert.equal(normalized.rescueName,"Community Animal Shelter");
 assert.equal(w.PetPickerResults.normalize(fixture.pets[1]).photos.length,1,"licensed photo accepted");
 const data = w.PetPickerResults.extractPets(fixture);
 assert.equal(data.length,2);
 doc.querySelector(".result-details-button").click();
 assert.equal(doc.getElementById("petDetailsDialog").open,true,"full details dialog opens");
 assert.match(doc.getElementById("petDetailBody").textContent,/A gentle dog who likes naps/);
 assert.match(doc.getElementById("petDetailBody").textContent,/View Bacon Bear's actual photo/);
 assert.match(doc.getElementById("petDetailBody").textContent,/Community Animal Shelter/);
 doc.getElementById("petDetailsClose").click();
 assert.equal(doc.getElementById("petDetailsDialog").open,false,"dialog closes");
 doc.querySelector(".result-heart").click();
 assert.match(doc.getElementById("savedPetItems").textContent,/Bacon Bear/,"favorite persists");
 doc.querySelectorAll(".result-card")[1].querySelector(".result-details-button").click();
 assert.match(doc.getElementById("petDetailBody").textContent,/<script>Not markup<\/script>/);
 assert.equal(doc.getElementById("petDetailBody").querySelector("script"),null,"unsafe provider text not parsed as HTML");
 doc.getElementById("petDetailsClose").click();
 const form = doc.getElementById("petSearch");
 doc.getElementById("zip").value="9021x";
 form.dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
 assert.equal(doc.getElementById("zipError").hidden,false,"invalid ZIP rejected");
 const before = requested.length;
 assert.equal(requested.length,before);
 doc.getElementById("zip").value="90210";
 form.querySelector('input[name="type"][value="cat"]').checked=true;
 form.dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
 await sleep();
 assert.equal(requested.length,before+1,"in-page search performed");
 assert.match(requested[requested.length-1],/species=Cat/);
 assert.match(requested[requested.length-1],/near=90210/);
 assert.equal(doc.getElementById("zipError").hidden,true);
 assert.equal(doc.getElementById("resultsGrid").children.length,2);
 console.log("On-page listings integration checks passed: profiles, licensed images, originals, favorites, filtering, and safe rendering.");
 w.close();
})().catch(e=>{console.error(e);w.close();process.exitCode=1;});
