import { useState } from "react";
import { supabase } from "../lib/supabase";

type GroupRow = {
  id: string;
  park_name: string;
  park_city: string;
  park_state: string;
  style: "salsa" | "bachata" | "blend";
  weekday: number;          // 0..6
  start_time: string;       // "HH:MM:SS"
  member_count: number;     // 0..n
  needed_to_three: number;  // 0..2
  distance_miles: number;
};

type ParkRow = {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  distance_miles: number;
  open_groups_here: number;
};

const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtTime(t: string) {
  // t is "HH:MM:SS" -> "H:MM am/pm"
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr.padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = ((h + 11) % 12) + 1; // 0->12, 13->1 etc
  return `${h}:${m} ${ampm}`;
}

function waitingText(count: number) {
  const needed = Math.max(0, 3 - count);
  if (needed <= 0) return "Active group";
  if (count === 0) return "Be the first to join";
  if (count === 1) return "1 person interested — waiting for 2 more";
  if (count === 2) return "2 people interested — waiting for 1 more";
  return `Waiting for ${needed} more`;
}

export default function ZipSearch() {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(15); // miles
  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [parks, setParks] = useState<ParkRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setGroups([]);
    setParks([]);
    if (!zip) return;

    setLoading(true);
    try {
      // 1) get centroid for this zip
      const { data: z, error: zErr } = await supabase
        .from("zip_centroids")
        .select("lat,lng")
        .eq("zip", zip)
        .single();

      if (zErr || !z) {
        setErr("ZIP not found. Try another.");
        setLoading(false);
        return;
      }

      // 2) nearby groups
      const { data: gData, error: gErr } = await supabase.rpc("nearby_groups", {
        lat: z.lat, lng: z.lng, miles: radius,
      });

      if (gErr) throw gErr;

      // 3) nearby parks
      const { data: pData, error: pErr } = await supabase.rpc("nearby_parks", {
        lat: z.lat, lng: z.lng, miles: radius,
      });

      if (pErr) throw pErr;

      setGroups((gData ?? []) as GroupRow[]);
      setParks((pData ?? []) as ParkRow[]);
    } catch (e: any) {
      console.error(e);
      setErr(e.message ?? "Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-3 items-end">
        <div>
          <label className="block text-sm font-medium">ZIP code</label>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value.trim())}
            placeholder="e.g. 90280"
            className="border rounded px-3 py-2"
            inputMode="numeric"
            maxLength={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Radius (mi)</label>
          <select
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value, 10))}
            className="border rounded px-3 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>
        <button
          type="submit"
          className="border rounded px-4 py-2"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {err && <p className="mt-3 text-red-600">{err}</p>}

      {/* Groups near you */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Groups near you</h2>
        {groups.length === 0 && !loading && (
          <p className="text-sm mt-2">No groups found yet. Start one below!</p>
        )}
        <div className="mt-3 grid gap-3">
          {groups.map((g) => (
            <div key={g.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {g.park_name} — {g.park_city}, {g.park_state}
                </div>
                <div className="text-xs opacity-70">
                  {g.distance_miles.toFixed(1)} mi
                </div>
              </div>
              <div className="text-sm mt-1">
                {g.style.toUpperCase()} • {WEEKDAYS[g.weekday]} • {fmtTime(g.start_time)}
              </div>
              <div className="text-sm mt-1">
                {waitingText(g.member_count)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parks near you (start a group) */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Parks near you (start a group)</h2>
        <div className="mt-3 grid gap-3">
          {parks.map((p) => (
            <div key={p.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {p.name} {p.city ? `— ${p.city}, ${p.state}` : ""}
                </div>
                <div className="text-xs opacity-70">
                  {p.distance_miles.toFixed(1)} mi
                </div>
              </div>
              {p.open_groups_here > 0 && (
                <div className="text-xs mt-1 opacity-80">
                  {p.open_groups_here} open group{p.open_groups_here > 1 ? "s" : ""} here
                </div>
              )}
              {/* Later: a "Start group here" button that opens the create form prefilled */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
