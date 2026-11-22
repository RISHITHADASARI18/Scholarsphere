import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const allowedLevels = new Set(["School", "Intermediate", "Diploma", "Undergraduate", "Postgraduate", "Research"]);

export async function GET(request: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED", message: "Scholarship data is not connected yet." }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const level = params.get("level") || "School";
  if (!allowedLevels.has(level)) return NextResponse.json({ error: "INVALID_LEVEL" }, { status: 400 });

  const q = (params.get("q") || "").trim().slice(0, 120);
  const state = (params.get("state") || "").trim().slice(0, 80);
  const grade = (params.get("grade") || "").trim().slice(0, 30);
  const category = (params.get("category") || "").trim().slice(0, 60);
  const status = (params.get("status") || "").trim().slice(0, 30);
  const limit = Math.min(Math.max(Number(params.get("limit") || 50), 1), 100);

  try {
    const rows = await db`
      SELECT id, slug, name, provider, provider_type AS "providerType",
             education_levels AS "educationLevels", grades, states, categories,
             scholarship_type AS "scholarshipType", summary, benefits,
             amount_min_inr AS "amountMin", amount_max_inr AS "amountMax",
             amount_description AS "amountDescription", eligibility,
             required_documents AS "requiredDocuments", application_process AS "applicationProcess",
             official_application_url AS "officialApplicationUrl",
             official_source_url AS "officialSourceUrl", academic_year AS "academicYear",
             application_status AS "applicationStatus", application_open_date AS "applicationOpenDate",
             application_deadline AS "applicationDeadline", status_note AS "statusNote",
             source_last_checked_at AS "sourceLastCheckedAt"
      FROM scholarships
      WHERE published = TRUE
        AND verification_status = 'verified'
        AND education_levels @> ARRAY[${level}]::TEXT[]
        AND (${q} = '' OR name ILIKE '%' || ${q} || '%' OR provider ILIKE '%' || ${q} || '%' OR summary ILIKE '%' || ${q} || '%')
        AND (${state} = '' OR states @> ARRAY[${state}]::TEXT[] OR states @> ARRAY['All India']::TEXT[])
        AND (${grade} = '' OR grades @> ARRAY[${grade}]::TEXT[])
        AND (${category} = '' OR categories @> ARRAY[${category}]::TEXT[])
        AND (${status} = '' OR application_status = ${status})
      ORDER BY
        CASE application_status WHEN 'open' THEN 0 WHEN 'opening_soon' THEN 1 WHEN 'check_state_portal' THEN 2 WHEN 'verify_on_provider' THEN 3 ELSE 4 END,
        application_deadline ASC NULLS LAST,
        name ASC
      LIMIT ${limit}
    `;
    return NextResponse.json({ count: rows.length, academicYear: "2026-27", scholarships: rows });
  } catch (error) {
    console.error("Scholarship directory query failed", error);
    return NextResponse.json({ error: "DATABASE_QUERY_FAILED" }, { status: 500 });
  }
}
