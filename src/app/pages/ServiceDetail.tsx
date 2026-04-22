import { ChevronLeft, MapPin, Clock, Phone, Globe, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { getServiceById } from "../data/services";

export function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const service = getServiceById(serviceId || "");

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">Servizio non trovato</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-2xl bg-[var(--pastel-orange)] text-white"
          >
            Torna indietro
          </button>
        </div>
      </div>
    );
  }

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(service.address)}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange-dark)] pt-6 pb-8 px-6 rounded-b-[3rem] relative">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart
              className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
              size={20}
            />
          </button>
        </div>

        <div className="flex flex-col items-center text-white">
          <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-5xl mb-4 border-4 border-white/40">
            {service.emoji}
          </div>
          <h1 className="text-2xl mb-2 text-center">{service.name}</h1>
          <p className="text-white/80 text-sm">{service.category}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        <div className="mb-6">
          <div className="space-y-3">
            {service.services.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {item.available && (
                    <div className="w-2 h-2 rounded-full bg-[var(--pastel-green)]"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <h3 className="mb-4">Contatti</h3>
          <div className="space-y-3">
            <a href={`tel:${service.phone}`} className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-peach)] flex items-center justify-center">
                <Phone className="text-white" size={18} />
              </div>
              <span>{service.phone}</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-mint)] flex items-center justify-center">
                <MapPin className="text-white" size={18} />
              </div>
              <span className="flex-1">{service.address}</span>
            </div>
            <a
              href={`https://${service.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-blue)] flex items-center justify-center">
                <Globe className="text-white" size={18} />
              </div>
              <span>{service.website}</span>
            </a>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <h3 className="mb-4">Orari di apertura</h3>
          <div className="space-y-2">
            {service.hours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{schedule.day}</span>
                <span>{schedule.time}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white shadow-lg text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <MapPin size={20} />
            <span>Ottieni indicazioni</span>
          </div>
        </a>
      </div>
    </div>
  );
}
