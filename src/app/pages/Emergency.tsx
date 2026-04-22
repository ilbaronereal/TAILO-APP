import { useNavigate } from "react-router";
import { ChevronLeft, Phone, MapPin, Clock, AlertTriangle, Navigation } from "lucide-react";
import { getServicesByCategory } from "../data/services";
import { useGeolocation, calcDistanceKm, formatDistance } from "../hooks/useGeolocation";
import { useMemo } from "react";

const EMERGENCY_TIPS = [
  { icon: "🫁", title: "Non respira", text: "Rimuovi ostruzioni dal muso, inizia RCP se addestrato. Vai al PS immediatamente." },
  { icon: "🩸", title: "Emorragia grave", text: "Applica pressione con un panno pulito. Non rimuovere oggetti conficcati. Trasporta d'urgenza." },
  { icon: "☠️", title: "Avvelenamento", text: "Non indurre il vomito. Porta la confezione del veleno. Chiama il PS subito." },
  { icon: "🦴", title: "Frattura sospetta", text: "Immobilizza l'arto senza fasciare troppo. Trasporta su una superficie rigida." },
  { icon: "🌡️", title: "Colpo di calore", text: "Raffredda con acqua tiepida (non fredda). Non coprire con ghiaccio. Porta al PS." },
  { icon: "🤒", title: "Convulsioni", text: "Non toccare la bocca. Allontana oggetti pericolosi. Cronometra la durata e vai al PS." },
];

const POISON_CONTROL = "+39 02 6610 1029"; // Centro Antiveleni Milano

export function Emergency() {
  const navigate = useNavigate();
  const { lat, lng } = useGeolocation();

  const services = useMemo(() => {
    const raw = getServicesByCategory("emergency");
    if (!lat || !lng) return raw;
    return raw
      .map((s) => ({ ...s, distanceKm: calcDistanceKm(lat, lng, s.lat, s.lng) }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [lat, lng]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-red-500 to-red-600 pt-6 pb-8 px-6 rounded-b-[3rem]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-white" size={24} />
            <h1 className="text-2xl text-white">Pronto Soccorso</h1>
          </div>
          <div className="w-10" />
        </div>

        {/* Poison control hotline */}
        <a
          href={`tel:${POISON_CONTROL}`}
          className="block w-full bg-white/20 rounded-2xl p-4 mb-3 border border-white/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl">
              ☠️
            </div>
            <div className="flex-1">
              <p className="text-white text-xs mb-0.5">Centro Antiveleni Milano</p>
              <p className="text-white text-xl font-bold">{POISON_CONTROL}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center">
              <Phone className="text-white" size={18} />
            </div>
          </div>
        </a>

        <p className="text-white/70 text-xs text-center">Tocca un numero per chiamare direttamente</p>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6 space-y-6">

        {/* Emergency clinics */}
        <div>
          <h2 className="mb-3 text-red-600">Cliniche d'emergenza</h2>
          <div className="space-y-3">
            {services.map((service) => {
              const distanceLabel =
                lat && lng && "distanceKm" in service
                  ? formatDistance((service as typeof service & { distanceKm: number }).distanceKm)
                  : service.distance;
              const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(service.address)}`;

              return (
                <div
                  key={service.id}
                  className="bg-card rounded-3xl shadow-sm border border-red-100 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl flex-shrink-0">
                        {service.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm mb-1">{service.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Navigation size={12} />
                          <span>{distanceLabel}</span>
                          {service.is24h && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">24h</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span className="truncate">{service.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span>{service.hours[0].time}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${service.phone}`}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white text-sm font-medium"
                      >
                        <Phone size={16} />
                        Chiama ora
                      </a>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium"
                      >
                        <MapPin size={16} />
                        Indicazioni
                      </a>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <p className="text-xs text-muted-foreground">{service.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* First aid tips */}
        <div>
          <h2 className="mb-3">Primo soccorso</h2>
          <div className="grid grid-cols-1 gap-3">
            {EMERGENCY_TIPS.map((tip, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
