import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, Phone, MapPin, Calendar, Search, X, Camera } from "lucide-react";
import { useLostPets, LostPet, LostPetType } from "../hooks/useLostPets";

function LostPetCard({ pet }: { pet: LostPet }) {
  const bgColor = pet.type === "lost" ? "border-orange-200 bg-orange-50/30" : "border-green-200 bg-green-50/30";
  const badgeColor = pet.type === "lost"
    ? "bg-orange-100 text-orange-700"
    : "bg-green-100 text-green-700";

  return (
    <div className={`rounded-3xl border ${bgColor} overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
              {pet.type === "lost" ? "SMARRITO" : "TROVATO"}
            </span>
            {pet.reward && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                💰 Ricompensa: {pet.reward}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{pet.date}</span>
        </div>

        <div className="flex gap-3">
          {pet.imageUrl ? (
            <img
              src={pet.imageUrl}
              alt={pet.petName}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-muted/40 flex items-center justify-center text-3xl flex-shrink-0">
              {pet.species === "Gatto" ? "🐱" : "🐕"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-base">{pet.petName}</h3>
              <span className="text-sm text-muted-foreground">{pet.species}</span>
            </div>
            {pet.breed && <p className="text-xs text-muted-foreground mb-1">{pet.breed}</p>}
            <p className="text-xs text-muted-foreground mb-1">
              <span className="font-medium">Colore:</span> {pet.color}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} />
              <span>{pet.area}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{pet.description}</p>

        <a
          href={`tel:${pet.contact}`}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--pastel-orange)] text-white text-sm"
        >
          <Phone size={15} />
          {pet.contact}
        </a>
      </div>
    </div>
  );
}

function CreateAdModal({ onClose, onSave }: { onClose: () => void; onSave: (pet: Omit<LostPet, "id" | "date">) => void }) {
  const [type, setType] = useState<LostPetType>("lost");
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("Gatto");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [reward, setReward] = useState("");

  const handleSubmit = () => {
    if (!petName || !color || !area || !contact) return;
    onSave({ type, petName, species, breed: breed || undefined, color, area, description, contact, reward: reward || undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Crea annuncio</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-2 mb-5">
            {(["lost", "found"] as LostPetType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm transition-all ${
                  type === t
                    ? t === "lost" ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {t === "lost" ? "🔍 Smarrito" : "✅ Trovato"}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="bg-muted/30 rounded-2xl p-4 flex items-center gap-3 border-2 border-dashed border-muted">
              <Camera size={20} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Aggiungi foto (opzionale)</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Nome pet *</label>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="es. Micio"
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Specie</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                >
                  <option>Gatto</option>
                  <option>Cane</option>
                  <option>Coniglio</option>
                  <option>Altro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Razza</label>
                <input
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="es. Europeo"
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Colore *</label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="es. Grigio a strisce"
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Zona / Quartiere *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="es. Navigli, Milano"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Descrizione</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrivi segni particolari, collare, microchip, dove è scomparso..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Contatto *</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+39 333 1234567"
                  type="tel"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                />
              </div>
            </div>

            {type === "lost" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Ricompensa (opzionale)</label>
                <input
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="es. 50€"
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm"
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!petName || !color || !area || !contact}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white text-sm font-medium disabled:opacity-40 mt-2"
            >
              Pubblica annuncio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LostPets() {
  const navigate = useNavigate();
  const { lostPets, addLostPet } = useLostPets();
  const [tab, setTab] = useState<"all" | "lost" | "found">("all");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = lostPets.filter((p) => {
    if (tab === "lost" && p.type !== "lost") return false;
    if (tab === "found" && p.type !== "found") return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.petName.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)] pt-6 pb-8 px-6 rounded-b-[3rem]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <h1 className="text-2xl text-white">Smarrimenti</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <Plus className="text-white" size={22} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per zona, razza, colore..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/20 text-white placeholder-white/60 border-0 focus:ring-2 focus:ring-white/30 text-sm"
          />
        </div>

        <div className="flex gap-2">
          {([["all", "Tutti"], ["lost", "Smarriti"], ["found", "Trovati"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setTab(val)}
              className={`flex-1 py-2 rounded-xl text-sm transition-all ${
                tab === val ? "bg-white text-foreground" : "text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{filtered.length} annunci</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={13} />
            <span>Più recenti prima</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-muted-foreground mb-2">Nessun annuncio trovato</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-sm text-[var(--pastel-orange)]"
            >
              Crea il primo annuncio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((pet) => (
              <LostPetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateAdModal
          onClose={() => setShowCreate(false)}
          onSave={(pet) => addLostPet(pet)}
        />
      )}
    </div>
  );
}
