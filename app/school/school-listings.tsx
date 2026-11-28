"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, RefreshCw, Search, ShieldCheck, Sparkles } from "lucide-react";

type Scholarship = {
  id:string; slug:string; name:string; provider:string; summary:string; benefits:string|null;
  grades:string[]; states:string[]; categories:string[]; applicationStatus:string;
  applicationDeadline:string|null; statusNote:string|null; officialApplicationUrl:string|null;
  officialSourceUrl:string; academicYear:string; sourceLastCheckedAt:string;
};
const statusLabels:Record<string,string>={open:"Applications open",opening_soon:"Opening soon",closed:"Application closed",check_state_portal:"Check state portal",verify_on_provider:"Confirm with provider"};
const providerDomains:[RegExp,string][]=[
  [/Ministry of Education|School Education/i,"education.gov.in"],
  [/Social Justice/i,"socialjustice.gov.in"],
  [/Tribal Affairs/i,"tribal.nic.in"],
  [/Empowerment of Persons with Disabilities/i,"depwd.gov.in"],
  [/HDFC/i,"hdfcbank.com"],
  [/Labour/i,"labour.gov.in"],
  [/CBSE|Central Board of Secondary Education/i,"cbse.gov.in"],
  [/Government of Telangana|Telangana/i,"telangana.gov.in"]
];
function logoFor(provider:string,source:string){
  const domain=providerDomains.find(([pattern])=>pattern.test(provider))?.[1]||new URL(source).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}
function ProviderLogo({item}:{item:Scholarship}){
  const [failed,setFailed]=useState(false);
  const initials=item.provider.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  return <span className="school-provider-logo">{failed?<span>{initials}</span>:<img src={logoFor(item.provider,item.officialSourceUrl)} alt={item.provider+" logo"} onError={()=>setFailed(true)}/>}</span>;
}

export default function SchoolListings(){
  const [items,setItems]=useState<Scholarship[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [q,setQ]=useState("");
  const [grade,setGrade]=useState("");
  const [state,setState]=useState("");
  const [category,setCategory]=useState("");
  const query=useMemo(()=>new URLSearchParams({level:"School",...(q?{q}:{}),...(grade?{grade}:{}),...(state?{state}:{}),...(category?{category}:{})}),[q,grade,state,category]);

  useEffect(()=>{
    let active=true;
    setLoading(true);setError("");
    fetch("/api/scholarships?"+query.toString(),{cache:"no-store"})
      .then(async r=>{const data=await r.json();if(!r.ok)throw new Error(data.message||"Scholarship records are temporarily unavailable.");return data;})
      .then(data=>{if(active)setItems(data.scholarships||[]);})
      .catch(e=>{if(active)setError(e.message||"Could not load scholarship records.");})
      .finally(()=>{if(active)setLoading(false);});
    return()=>{active=false;};
  },[query]);

  return <section className="school-listings" id="verified-school-scholarships">
    <div className="eyebrow school-dark-eyebrow">RESEARCHED OPPORTUNITIES · SCHOOL LEVEL</div>
    <div className="school-listings-heading"><div><h2>Find support for<br/><em>your next step.</em></h2><p>Explore a short introduction, then open any scholarship card to read its full eligibility, benefits and official application instructions.</p></div><span className="school-verified-badge"><ShieldCheck size={16}/> Verification status shown</span></div>
    <div className="school-listing-filters">
      <label><span>Search opportunities</span><div><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Scholarship, organisation or keyword"/></div></label>
      <label><span>Class</span><select value={grade} onChange={e=>setGrade(e.target.value)}><option value="">All classes</option>{["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map(g=><option key={g}>{g}</option>)}</select></label>
      <label><span>State</span><select value={state} onChange={e=>setState(e.target.value)}><option value="">All states</option>{["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"].map(s=><option key={s}>{s}</option>)}</select></label>
      <label><span>Support type</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">All types</option>{["Merit-based","Means-cum-merit","Merit-cum-need","Need-based","Targeted support","Welfare-based"].map(s=><option key={s}>{s}</option>)}</select></label>
    </div>
    <div className="school-results-line"><span>{loading?"Loading opportunities…":error?"Catalogue status":`${items.length} opportunities listed`}</span><span><Sparkles size={14}/> Open a card to explore details</span></div>
    {loading?<div className="school-listing-state"><RefreshCw size={20}/> Loading catalogue entries…</div>:error?<div className="school-listing-state school-listing-error"><h3>Scholarship database not connected yet</h3><p>{error} The school catalogue is available from the verified research records while the live database is being provisioned.</p></div>:items.length===0?<div className="school-listing-state"><h3>No matching scholarships found</h3><p>Try removing a filter. Try another search or remove a filter. Some catalogue entries are awaiting provider verification.</p></div>:<div className="school-listing-grid">{items.map(item=><Link className="school-listing-card-link" href={"/scholarships/"+item.slug} key={item.id||item.slug} aria-label={`View full details for ${item.name}`}>
      <article className="school-listing-card">
        <div className="school-listing-card-top"><span className={"school-status status-"+item.applicationStatus}>{statusLabels[item.applicationStatus]||"Check provider"}</span><span className="school-year">{item.academicYear}</span></div>
        <div className="school-card-identity"><ProviderLogo item={item}/><div><h3>{item.name}</h3><p className="school-listing-provider">{item.provider}</p></div></div>
        <p className="school-listing-summary">{item.summary}</p>
        <div className="school-card-bottom"><div className="school-listing-meta"><span><MapPin size={14}/>{item.states.includes("All India")?"India-wide":item.states.join(", ")}</span><span>{item.grades.slice(0,4).join(" · ")}{item.grades.length>4?" + more":""}</span></div><span className="school-card-open">Explore scholarship <ArrowUpRight size={16}/></span></div>
      </article>
    </Link>)}</div>}
    <p className="school-catalogue-note">Scholarship dates and eligibility can change. Always confirm the latest details on the organisation’s official website before applying.</p>
  </section>;
}
