"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, RefreshCw, Search, ShieldCheck, Sparkles } from "lucide-react";

type Level = "Intermediate" | "Diploma" | "Undergraduate" | "Postgraduate" | "Research";
type Scholarship = { id?:string; slug:string; name:string; provider:string; summary:string; benefits?:string|null; grades:string[]; states:string[]; categories:string[]; applicationStatus:string; applicationDeadline?:string|null; statusNote?:string|null; officialApplicationUrl?:string|null; officialSourceUrl:string; academicYear:string; sourceLastChecked?:string; sourceLastCheckedAt?:string; };
const allStates=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];
const labels:Record<string,string>={open:"Applications open",opening_soon:"Opening soon",closed:"Application closed",check_state_portal:"Check state portal",verify_on_provider:"Confirm with provider"};
function ProviderLogo({item}:{item:Scholarship}){const [failed,setFailed]=useState(false);const host=(()=>{try{return new URL(item.officialSourceUrl).hostname.replace(/^www\\./,"")}catch{return "scholarships.gov.in"}})();const initials=item.provider.split(/\\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();return <span className="school-provider-logo">{failed?<span>{initials}</span>:<img src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`} alt={item.provider+" logo"} onError={()=>setFailed(true)}/>}</span>}
export default function LevelScholarshipListings({level}:{level:Level}) {
 const [items,setItems]=useState<Scholarship[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(""),[q,setQ]=useState(""),[state,setState]=useState(""),[grade,setGrade]=useState("");
 const query=useMemo(()=>new URLSearchParams({level,...(q?{q}:{}),...(state?{state}:{}),...(grade?{grade}:{})}),[level,q,state,grade]);
 useEffect(()=>{let active=true;setLoading(true);setError("");fetch("/api/scholarships?"+query.toString(),{cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.message||"Unable to load records.");return d}).then(d=>{if(active)setItems(d.scholarships||[])}).catch(e=>{if(active)setError(e.message||"Could not load records.")}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[query]);
 const grades=level==="Intermediate"?["Class 11","Class 12"]:level==="Diploma"?["Diploma Year 1","Diploma Year 2","Diploma Year 3","Diploma Lateral Entry"]:level==="Undergraduate"?["Undergraduate Year 1","Undergraduate Year 2","Undergraduate Year 3","Undergraduate Year 4"]:level==="Postgraduate"?["Postgraduate Year 1","Postgraduate Year 2"]:["Research / PhD"];
 return <section className="school-listings" id={level.toLowerCase()+"-scholarships"}>
  <div className="eyebrow school-dark-eyebrow">RESEARCHED OPPORTUNITIES · {level.toUpperCase()}</div>
  <div className="school-listings-heading"><div><h2>Explore scholarship<br/><em>{level.toLowerCase()} support.</em></h2><p>Browse government, state, corporate and foundation listings. Open a card for available details, then confirm current eligibility, benefits and deadlines with the provider.</p></div><span className="school-verified-badge"><ShieldCheck size={16}/> Verification status shown</span></div>
  <div className="school-listing-filters">
   <label><span>Search opportunities</span><div><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Scholarship, organisation or keyword"/></div></label>
   <label><span>Class / year</span><select value={grade} onChange={e=>setGrade(e.target.value)}><option value="">All levels</option>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
   <label><span>State / UT</span><select value={state} onChange={e=>setState(e.target.value)}><option value="">All states & UTs</option>{allStates.map(s=><option key={s}>{s}</option>)}</select></label>
  </div>
  <div className="school-results-line"><span>{loading?"Loading opportunities…":error?"Catalogue status":`${items.length} opportunities listed`}</span><span><Sparkles size={14}/> Open a card to explore details</span></div>
  {loading?<div className="school-listing-state"><RefreshCw size={20}/> Loading catalogue entries…</div>:error?<div className="school-listing-state school-listing-error"><h3>Catalogue temporarily unavailable</h3><p>{error}</p></div>:items.length===0?<div className="school-listing-state"><h3>No matching scholarships found</h3><p>Try removing a filter. Try another search or remove a filter. Some catalogue entries are awaiting provider verification.</p></div>:<div className="school-listing-grid">{items.map(item=><Link className="school-listing-card-link" href={"/scholarships/"+item.slug} key={item.id||item.slug} aria-label={"View full details for "+item.name}><article className="school-listing-card">
   <div className="school-listing-card-top"><span className={"school-status status-"+item.applicationStatus}>{labels[item.applicationStatus]||"Check provider"}</span><span className="school-year">{item.academicYear}</span></div>
   <div className="school-card-identity"><ProviderLogo item={item}/><div><h3>{item.name}</h3><p className="school-listing-provider">{item.provider}</p></div></div>
   <p className="school-listing-summary">{item.summary}</p>
   <div className="school-card-bottom"><div className="school-listing-meta"><span><MapPin size={14}/>{item.states.includes("All India")?"India-wide":item.states.join(", ")}</span><span>{item.grades.join(" · ")}</span></div><span className="school-card-open">Explore scholarship <ArrowUpRight size={16}/></span></div>
  </article></Link>)}</div>}
  <p className="school-catalogue-note">State and UT filters are available for domicile-based awards. A national scheme may also be available in your state. Confirm state-specific notices and current deadlines with the official provider.</p>
 </section>;
}
