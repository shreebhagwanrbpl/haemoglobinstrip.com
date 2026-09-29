import { NextResponse } from "next/server";
import { getDocument, getDocuments, queryDocuments } from "@/lib/sqliteDb";
import { WEBSITE_ID, normalizeWebsiteId, isVisibleForWebsite } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" };
function response(data, status = 200) { return NextResponse.json(data, { status, headers }); }

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("districts") === "1") {
      const rows = queryDocuments({ likePath: "websites/%/%/districts/%" });
      return response(rows.map((r) => ({ id: r.doc_id, ...(r.data || {}) })));
    }
    const collection = searchParams.get("collection");
    if (collection) {
      const rows = getDocuments(collection);
      return response(rows.filter((r) => isVisibleForWebsite(r.data || {}, WEBSITE_ID)).map((r) => ({ id: r.doc_id, data: r.data })));
    }
    let p = searchParams.get("path") || "";
    if (!p) return response(null);

    // 1. Exact match in SQLite documents
    let row = getDocument(p);
    if (row?.data && Object.keys(row.data).length > 0) return response(row.data);

    // 2. Normalize and resolve __website__/ or websites/ patterns
    const normalized = normalizeWebsiteId(WEBSITE_ID);
    let subPath = p;
    if (subPath.startsWith("__website__/")) {
      subPath = subPath.replace("__website__/", "");
    } else if (subPath.startsWith("websites/")) {
      const parts = subPath.split("/");
      if (parts.length === 4) {
        subPath = `${parts[2]}/${parts[3]}`; // pages/contact or districts/jaipur
      } else if (parts.length === 5) {
        subPath = `${parts[3]}/${parts[4]}`; // pages/contact or districts/jaipur
      } else if (parts.length === 3) {
        subPath = `${parts[1]}/${parts[2]}`; // pages/contact
      }
    }

    const rows = queryDocuments({ likePath: `websites/%/%/${subPath}` });
    const hit = rows.find((r) => {
      const parts = String(r.path).split("/");
      return parts.length >= 4 && normalizeWebsiteId(parts[2]) === normalized;
    }) || rows[0];

    if (hit?.data) return response(hit.data);

    // 3. Check for district lookup fallback
    if (subPath.startsWith("districts/")) {
      const distId = subPath.replace("districts/", "");
      const allDistricts = queryDocuments({ likePath: "websites/%/%/districts/%" });
      const distHit = allDistricts.find((r) => normalizeWebsiteId(r.doc_id) === normalizeWebsiteId(distId));
      if (distHit?.data) return response(distHit.data);
    }

    return response(row?.data || null);
  } catch (e) { return response({ error: e.message }, 500); }
}

