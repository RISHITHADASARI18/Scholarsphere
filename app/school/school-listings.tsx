"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, RefreshCw, Search, ShieldCheck } from "lucide-react";

type Scholarship = {
  id:string; slug:string; name:string; provider:string; summary:string; benefits:string|null;
  grades:string[]; states:string[]; categories:string[]; applicationStatus:string;
  applicationDeadline:string|null; statusNote:string|null; officialApplicationUrl:string|null;
  officialSourceUrl:string; academicYear:string; sourceLastCheckedAt:string;
};
const statusLabels:Record<string,string>={open:"Applications open",opening_soon:"Opening soon",closed:"Application closed",check_state_portal:"Check state portal",verify_on_provider:"Confirm with provider"};

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
    <div className="eyebrow dark-eyebrow">RESEARCHED OPPORTUNITIES · 2026–27</div>
    <div className="school-listings-heading"><div><h2>School scholarships<br/><em>to explore.</em></h2><p>Records include their official source and the date the information was checked.</p></div><span className="school-verified-badge"><ShieldCheck size={16}/> Source checked</span></div>
    <div className="school-listing-filters">
      <label><span>Search</span><div><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Scholarship or provider"/></div></label>
      <label><span>Class</span><select value={grade} onChange={e=>setGrade(e.target.value)}><option value="">All classes</option>{["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map(g=><option key={g}>{g}</option>)}</select></label>
      <label><span>State</span><select value={state} onChange={e=>setState(e.target.value)}><option value="">All states</option>{["Telangana","Andhra Pradesh","Karnataka","Kerala","Rajasthan","Maharashtra","Tamil Nadu","Delhi"].map(s=><option key={s}>{s}</option>)}</select></label>
      <label><span>Support type</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">All types</option>{["Merit-based","Means-cum-merit","Need-based","Targeted support"].map(s=><option key={s}>{s}</option>)}</select></label>
    </div>
    {loading?<div className="school-listing-state"><RefreshCw size={20}/> Loading verified records…</div>:error?<div className="school-listing-state school-listing-error"><h3>Scholarship database not connected yet</h3><p>{error} The research and database schema are in the repository; the live database connection still needs to be provisioned.</p></div>:items.length===0?<div className="school-listing-state"><h3>No matching verified records</h3><p>Try removing a filter. We do not display unverified scholarship claims.</p></div>:<div className="school-listing-grid">{items.map(item=><article className="school-listing-card" key={item.id}>
      <div className="school-listing-card-top"><span className={"school-status status-"+item.applicationStatus}>{statusLabels[item.applicationStatus]||"Check provider"}</span><span className="school-year">{item.academicYear}</span></div>
      <h3>{item.name}</h3><p className="school-listing-provider">{item.provider}</p><p className="school-listing-summary">{item.summary}</p>
      {item.benefits&&<div className="school-benefit"><b>Support</b><span>{item.benefits}</span></div>}
      <div className="school-listing-meta"><span><MapPin size={14}/>{item.states.includes("All India")?"India-wide":item.states.join(", ")}</span><span>{item.grades.slice(0,4).join(" · ")}</span></div>
      {item.applicationDeadline&&<div className="school-deadline"><CalendarDays size={15}/> Student application deadline: {new Date(item.applicationDeadline+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>}
      {item.statusNote&&<p className="school-status-note">{item.statusNote}</p>}
      <div className="school-listing-actions"><a href={item.officialApplicationUrl||item.officialSourceUrl} target="_blank" rel="noreferrer">Official portal <ArrowUpRight size={15}/></a><a href={item.officialSourceUrl} target="_blank" rel="noreferrer">Source details</a></div>
      <small className="school-checked-date">Source checked {new Date(item.sourceLastCheckedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</small>
    </article>)}</div>}
  </section>;
}
