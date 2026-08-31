import {
  fetchFullCatalog as fetchFullCatalogRaw,
  fetchActiveDistricts as fetchActiveDistrictsRaw
} from "./data-fetcher";
import { cache } from "react";

// Global in-memory cache for the server process to bypass Next.js 2MB unstable_cache limit
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
let cachedDistricts = null;
let cachedDistrictsTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    console.log(`[data-fetcher-server] Serving catalog from server memory cache (${((now - cachedCatalogTimestamp) / 1000).toFixed(1)}s old)`);
    return cachedCatalog;
  }

  console.log("[data-fetcher-server] Server memory cache miss or expired. Fetching raw catalog from Firestore...");
  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  const start = performance.now();
  const products = await getCachedCatalog();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog took ${(end - start).toFixed(2)}ms`);
  return products;
});

async function getCachedDistricts() {
  const now = Date.now();
  if (cachedDistricts && (now - cachedDistrictsTimestamp) < CACHE_TTL) {
    console.log(`[data-fetcher-server] Serving districts from server memory cache (${((now - cachedDistrictsTimestamp) / 1000).toFixed(1)}s old)`);
    return cachedDistricts;
  }

  console.log("[data-fetcher-server] Server memory cache miss or expired. Fetching active districts from Firestore...");
  const data = await fetchActiveDistrictsRaw();
  cachedDistricts = data;
  cachedDistrictsTimestamp = now;
  return data;
}

export const fetchActiveDistricts = cache(async () => {
  const start = performance.now();
  const districts = await getCachedDistricts();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchActiveDistricts took ${(end - start).toFixed(2)}ms`);
  return districts;
});

