import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft,
  List,
  MapPin,
  Star,
  Clock,
  Phone,
  Navigation,
} from "lucide-react";
import { MapView } from "../components/MapView";
import { getServicesByCategory } from "../data/services";

export function CategoryList() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const categoryNames: Record<string, string> = {
    veterinary: "Veterinario",
    grooming: "Toilettatura",
    nutrition: "Nutrizione",
    "pet-sitting": "Pet Sitting",
    "dog-walking": "Dog Walking",
    boarding: "Pensioni",
    training: "Addestramento",
    shop: "Shop",
  };

  const services = getServicesByCategory(categoryId || "");

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange)] pt-6 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
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

        <div className="flex gap-2 bg-white/20 p-1 rounded-2xl">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              viewMode === "list" ? "bg-white text-foreground" : "text-white"
            }`}
          >
            <List size={18} />
            <span className="text-sm">Lista</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
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
          <p className="text-sm text-muted-foreground">{services.length} risultati trovati</p>
          {services.map((service) => (
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
                  <h3 className="mb-2">{service.name}</h3>
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[var(--pastel-coral)] fill-[var(--pastel-coral)]" />
                      <span>{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Navigation size={14} />
                      <span>{service.distance}</span>
                    </div>
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
          ))}
        </div>
      ) : (
        <div className="h-[calc(100vh-220px)]">
          <MapView services={services} />
        </div>
      )}
    </div>
  );
}
