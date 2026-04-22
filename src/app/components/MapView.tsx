import { useNavigate } from "react-router";
import { MapPin } from "lucide-react";

interface Service {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: string;
}

interface MapViewProps {
  services: Service[];
}

export function MapView({ services }: MapViewProps) {
  const navigate = useNavigate();

  if (services.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Nessun servizio trovato
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-t-3xl overflow-hidden bg-[#E8EAF0] relative">
      {/* Mappa stilizzata */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9CA3AF" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Strade stilizzate */}
        <div className="absolute top-1/4 left-0 right-0 h-2 bg-white/60"></div>
        <div className="absolute top-1/2 left-0 right-0 h-3 bg-white/80"></div>
        <div className="absolute top-3/4 left-0 right-0 h-2 bg-white/60"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-white/60"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-white/80"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-white/60"></div>

        {/* Parchi verdi */}
        <div className="absolute top-[15%] left-[60%] w-24 h-24 rounded-full bg-[#B8E0D4]/40"></div>
        <div className="absolute top-[55%] left-[15%] w-32 h-32 rounded-full bg-[#B8E0D4]/40"></div>
      </div>

      {/* Markers dei servizi */}
      <div className="absolute inset-0">
        {services.map((service, index) => {
          // Distribuisco i marker in modo più visivo sulla mappa
          const positions = [
            { top: '25%', left: '35%' },
            { top: '45%', left: '60%' },
            { top: '65%', left: '40%' },
          ];
          const position = positions[index % positions.length];

          return (
            <div
              key={service.id}
              className="absolute group cursor-pointer"
              style={position}
              onClick={() => navigate(`/service/${service.id}`)}
            >
              <div className="relative">
                {/* Pin marker */}
                <div className="w-12 h-12 rounded-full bg-[var(--pastel-orange)] shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-110 border-4 border-white">
                  <MapPin className="text-white" size={24} fill="white" />
                </div>

                {/* Popup al hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white rounded-2xl shadow-xl p-4 w-48 border border-border">
                    <h4 className="text-sm mb-2">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {service.distance}
                    </p>
                    <div className="text-xs bg-[var(--pastel-orange)] text-white px-3 py-2 rounded-lg text-center">
                      Vedi dettagli
                    </div>
                  </div>
                  {/* Freccia */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                    <div className="w-3 h-3 bg-white border-r border-b border-border rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lista servizi in basso */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border p-4 max-h-48 overflow-y-auto">
        <h3 className="text-sm mb-3">Servizi trovati ({services.length})</h3>
        <div className="space-y-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              className="w-full p-3 rounded-xl bg-muted/30 hover:bg-muted transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--pastel-orange)]" />
                <div className="flex-1">
                  <h4 className="text-sm">{service.name}</h4>
                  <p className="text-xs text-muted-foreground">{service.distance}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
