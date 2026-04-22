import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft,
  List,
  MapPin,
  Star,
  Clock,
  Navigation,
  Locate,
  Search,
  X,
} from "lucide-react";
import { MapView } from "../components/MapView";
import { getServicesByCategory } from "../data/services";
import { useGeolocation, calcDistanceKm, formatDistance } from "../hooks/useGeolocation";

type Filter = "open_now" | "nearby" | "top_rated" | "h24" | "new_clients";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "open_now", label: "Aperti ora" },
  { id: "nearby", label: "Vicini a me" },
  { id: "top_rated", label: "Meglio votati" },
  { id: "h24", label: "24h" },
  { id: "new_clients", label: "Accetta nuovi" },
];

function isOpenNow(hours: { day: string; time: string }[]): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const current = hour * 60 + minute;
  const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  const today = dayNames[now.getDay()];

  for (const h of hours) {
    if (h.time.toLowerCase().includes("24h") || h.time.toLowerCase().includes("24 h")) return true;
    if (h.time.toLowerCase() === "chiuso") continue;
    const dayStr = h.day.toLowerCase();
    const matchesDay =
      dayStr.includes(today.toLowerCase()) ||
      dayStr.includes("lun-dom") ||
      dayStr.includes("tutti") ||
      (dayStr.includes("lun-ven") && now.getDay() >= 1 && now.getDay() <= 5) ||
      (dayStr.includes("lun-sab") && now.getDay() >= 1 && now.getDay() <= 6) ||
      (dayStr.includes("mar-sab") && now.getDay() >= 2 && now.getDay() <= 6) ||
      (dayStr.includes("mar-dom") && (now.getDay() >= 2 || now.getDay() === 0));
    if (!matchesDay) continue;
    const timeParts = h.time.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
    if (!timeParts) continue;
    const open = parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
    const close = parseInt(timeParts[3]) * 60 + parseInt(timeParts[4]);
    if (current >= open && current <= close) return true;
  }
  return false;
}

export function CategoryList() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const { lat, lng, loading: geoLoading, error: geoError } = useGeolocation();

  const categoryNames: Record<string, string> = {
    veterinary: "Veterinario",
    grooming: "Toilettatura",
    nutrition: "Nutrizione",
    "pet-sitting": "Pet Sitting",
    "dog-walking": "Dog Walking",
    boarding: "Pensioni",
    training: "Addestramento",
    shop: "Shop",
    emergency: "Pronto Soccorso",
  };

  const toggleFilter = (f: Filter) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const services = useMemo(() => {
    let raw = getServicesByCategory(categoryId || "");

    if (!lat || !lng) return raw;
    return raw
      .map((s) => ({ ...s, distanceKm: calcDistanceKm(lat, lng, s.lat, s.lng) }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [categoryId, lat, lng]);

  const filtered = useMemo(() => {
    let result = [...services];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.services.some((sv) => sv.name.toLowerCase().includes(q))
      );
    }

    if (activeFilters.includes("open_now")) {
      result = result.filter((s) => isOpenNow(s.hours));
    }
    if (activeFilters.includes("nearby")) {
      result = result.filter((s) => {
        if (!("distanceKm" in s)) return true;
        return (s as typeof s & { distanceKm: number }).distanceKm <= 2;
      });
    }
    if (activeFilters.includes("top_rated")) {
      result = result.filter((s) => s.rating >= 4.7);
    }
    if (activeFilters.includes("h24")) {
      result = result.filter((s) => s.is24h);
    }
    if (activeFilters.includes("new_clients")) {
      result = result.filter((s) => s.rating >= 4.5);
    }

    return result;
  }, [services, search, activeFilters]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange)] pt-6 pb-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <h1 className="text-2xl text-white flex-1 text-center">
            {categoryNames[categoryId || ""] || "Servizi"}
          </h1>
          <div className="w-10" />
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca nome, indirizzo, servizio..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/20 text-white placeholder-white/60 border-0 focus:ring-2 focus:ring-white/30 text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={16} className="text-white/60" />
            </button>
          )}
        </div>

        <div className="flex gap-2 bg-white/20 p-1 rounded-2xl">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              viewMode === "list" ? "bg-white text-foreground" : "text-white"
            }`}
          >
            <List size={18} />
            <span className="text-sm">Lista</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              viewMode === "map" ? "bg-white text-foreground" : "text-white"
            }`}
          >
            <MapPin size={18} />
            <span className="text-sm">Mappa</span>
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="p-6 space-y-4">
          {/* Filter chips in white area */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => toggleFilter(f.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                  activeFilters.includes(f.id)
                    ? "bg-[var(--pastel-orange)] text-white border-transparent"
                    : "bg-card text-muted-foreground border-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} risultat{filtered.length === 1 ? "o" : "i"}
              {activeFilters.length > 0 && (
                <button onClick={() => setActiveFilters([])} className="ml-2 text-[var(--pastel-orange)] underline">
                  Rimuovi filtri
                </button>
              )}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Locate size={13} />
              {geoLoading ? "Ricerca posizione..." : geoError ? "Posizione non disponibile" : "Per distanza"}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-muted-foreground">Nessun risultato trovato</p>
              <button
                onClick={() => { setSearch(""); setActiveFilters([]); }}
                className="mt-2 text-sm text-[var(--pastel-orange)]"
              >
                Rimuovi filtri
              </button>
            </div>
          ) : (
            filtered.map((service) => {
              const distanceLabel =
                lat && lng && "distanceKm" in service
                  ? formatDistance((service as typeof service & { distanceKm: number }).distanceKm)
                  : service.distance;
              const openNow = isOpenNow(service.hours);

              return (
                <button
                  key={service.id}
                  onClick={() => navigate(`/service/${service.id}`)}
                  className="w-full p-5 rounded-3xl bg-card shadow-sm border border-border hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)] flex items-center justify-center text-2xl flex-shrink-0">
                      {service.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="flex-1 pr-2">{service.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          openNow ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          {openNow ? "Aperto" : "Chiuso"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-[var(--pastel-coral)] fill-[var(--pastel-coral)]" />
                          <span>{service.rating}</span>
                          <span className="text-muted-foreground">({service.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Navigation size={14} />
                          <span>{distanceLabel}</span>
                        </div>
                        {service.is24h && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">24h</span>
                        )}
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span className="truncate">{service.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{service.hours[0].day} {service.hours[0].time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : (
        <div className="h-[calc(100vh-260px)]">
          <MapView services={filtered} />
        </div>
      )}
    </div>
  );
}
