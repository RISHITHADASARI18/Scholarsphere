import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

type SeedRecord = {
  slug:string; name:string; provider:string; providerType:string; educationLevels:string[]; grades:string[];
  states:string[]; categories:string[]; scholarshipType:string; summary:string; benefits?:string;
  amountMin?:number; amountMax?:number; eligibility:Record<string,unknown>; requiredDocuments:string[];
  applicationProcess:string; officialApplicationUrl:string; officialSourceUrl:string; academicYear:string;
  applicationStatus:string; applicationOpenDate?:string; applicationDeadline?:string; statusNote?:string;
  sourceLastChecked:string; verificationStatus:string; published:boolean;
};

async function main(){
  const url=process.env.DATABASE_URL;
  if(!url) throw new Error("DATABASE_URL is missing. Add the Neon pooled connection string before seeding.");
  const sql=neon(url);
  const files=["school-seed.json","intermediate-seed.json","diploma-seed.json"];
  const records:SeedRecord[]=[];
  for(const name of files){const file=resolve(process.cwd(),"data/scholarships",name);records.push(...JSON.parse(await readFile(file,"utf8")) as SeedRecord[]);}
  for(const r of records){
    await sql`
      INSERT INTO scholarships (
        slug,name,provider,provider_type,education_levels,grades,states,categories,scholarship_type,
        summary,benefits,amount_min_inr,amount_max_inr,eligibility,required_documents,application_process,
        official_application_url,official_source_url,academic_year,application_status,application_open_date,
        application_deadline,status_note,source_last_checked_at,verification_status,published
      ) VALUES (
        ${r.slug},${r.name},${r.provider},${r.providerType},${r.educationLevels},${r.grades},
        ${r.states},${r.categories},${r.scholarshipType},${r.summary},${r.benefits||null},
        ${r.amountMin??null},${r.amountMax??null},${JSON.stringify(r.eligibility)},${r.requiredDocuments},
        ${r.applicationProcess},${r.officialApplicationUrl},${r.officialSourceUrl},${r.academicYear},
        ${r.applicationStatus},${r.applicationOpenDate??null},${r.applicationDeadline??null},
        ${r.statusNote??null},${r.sourceLastChecked},${r.verificationStatus},${r.published}
      )
      ON CONFLICT (slug) DO UPDATE SET
        name=EXCLUDED.name,provider=EXCLUDED.provider,provider_type=EXCLUDED.provider_type,
        education_levels=EXCLUDED.education_levels,grades=EXCLUDED.grades,states=EXCLUDED.states,
        categories=EXCLUDED.categories,scholarship_type=EXCLUDED.scholarship_type,summary=EXCLUDED.summary,
        benefits=EXCLUDED.benefits,amount_min_inr=EXCLUDED.amount_min_inr,amount_max_inr=EXCLUDED.amount_max_inr,
        eligibility=EXCLUDED.eligibility,required_documents=EXCLUDED.required_documents,
        application_process=EXCLUDED.application_process,official_application_url=EXCLUDED.official_application_url,
        official_source_url=EXCLUDED.official_source_url,academic_year=EXCLUDED.academic_year,
        application_status=EXCLUDED.application_status,application_open_date=EXCLUDED.application_open_date,
        application_deadline=EXCLUDED.application_deadline,status_note=EXCLUDED.status_note,
        source_last_checked_at=EXCLUDED.source_last_checked_at,
        verification_status=EXCLUDED.verification_status,published=EXCLUDED.published,updated_at=NOW()
    `;
    console.log("Seeded:",r.slug);
  }
  console.log(`Imported ${records.length} scholarship records across school, intermediate and diploma.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
