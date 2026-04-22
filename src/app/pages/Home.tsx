import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import {
  Stethoscope,
  Scissors,
  UtensilsCrossed,
  Home as HomeIcon,
  Footprints,
  Hotel,
  GraduationCap,
  ShoppingBag,
  Search,
  Bell,
} from "lucide-react";
import maxImage from "../../imports/cane-1.jpg";
import logoImage from "../../imports/Screenshot_2026-04-21_alle_23.14.42.png";

const categories = [
  {
    id: "veterinary",
    name: "Veterinario",
    icon: Stethoscope,
    color: "bg-[var(--pastel-orange)]",
  },
  {
    id: "grooming",
    name: "Toilettatura",
    icon: Scissors,
    color: "bg-[var(--pastel-coral)]",
  },
  {
    id: "nutrition",
    name: "Nutrizione",
    icon: UtensilsCrossed,
    color: "bg-[var(--pastel-green)]",
  },
  {
    id: "pet-sitting",
    name: "Pet Sitting",
    icon: HomeIcon,
    color: "bg-[var(--pastel-blue)]",
  },
  {
    id: "dog-walking",
    name: "Dog Walking",
    icon: Footprints,
    color: "bg-[var(--pastel-peach)]",
  },
  {
    id: "boarding",
    name: "Pensioni",
    icon: Hotel,
    color: "bg-[var(--pastel-lavender)]",
  },
  {
    id: "training",
    name: "Addestramento",
    icon: GraduationCap,
    color: "bg-[var(--pastel-mint)]",
  },
  {
    id: "shop",
    name: "Shop",
    icon: ShoppingBag,
    color: "bg-[var(--pastel-pink)]",
  },
];

const pets = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: "3 anni",
    emoji: "🐕",
    image: maxImage,
  },
  {
    id: 2,
    name: "Luna",
    breed: "Persiano",
    age: "2 anni",
    emoji: "🐱",
    image: null,
  },
];

export function Home() {
  const navigate = useNavigate();
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextPet = () => {
    setCurrentPetIndex((prev) => (prev + 1) % pets.length);
  };

  const prevPet = () => {
    setCurrentPetIndex((prev) => (prev - 1 + pets.length) % pets.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextPet() : prevPet();
    touchStartX.current = null;
  };

  const currentPet = pets[currentPetIndex];

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <img src={logoImage} alt="TAiLO" className="h-10 mb-3" />
            <p className="text-sm text-muted-foreground">Ciao</p>
            <h1 className="text-2xl">Mario</h1>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-card shadow-sm flex items-center justify-center">
            <Bell size={22} />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <button
              onClick={() => navigate("/pet-profile")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full p-5 rounded-3xl bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/30 flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                  {currentPet.image ? (
                    <img
                      src={currentPet.image}
                      alt={currentPet.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentPet.emoji
                  )}
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl mb-1">{currentPet.name}</h3>
                  <p className="text-sm text-white/80">
                    {currentPet.breed} • {currentPet.age}
                  </p>
                </div>
                <div className="text-sm bg-white/20 px-4 py-2 rounded-xl">
                  Profilo
                </div>
              </div>
            </button>

          </div>

          {pets.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {pets.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPetIndex
                      ? "w-6 bg-[var(--pastel-orange)]"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Prossimi appuntamenti</h2>
            <button
              onClick={() => navigate("/agenda")}
              className="text-sm text-primary"
            >
              Vedi tutti
            </button>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/agenda")}
              className="w-full p-5 rounded-3xl bg-card shadow-sm border border-border hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--pastel-peach)] flex flex-col items-center justify-center">
                  <span className="text-xs">Apr</span>
                  <span className="text-lg">24</span>
                </div>
                <div className="text-left flex-1">
                  <h4>Controllo veterinario</h4>
                  <p className="text-sm text-muted-foreground">
                    15:00 - Dr. Rossi • Max
                  </p>
                </div>
              </div>
            </button>
            <button
              onClick={() => navigate("/agenda")}
              className="w-full p-5 rounded-3xl bg-card shadow-sm border border-border hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--pastel-lavender)] flex flex-col items-center justify-center">
                  <span className="text-xs">Apr</span>
                  <span className="text-lg">26</span>
                </div>
                <div className="text-left flex-1">
                  <h4>Toilettatura Luna</h4>
                  <p className="text-sm text-muted-foreground">
                    10:30 - Pet Grooming • Luna
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h2 className="mb-4">Servizi</h2>
          <div className="mb-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                placeholder="Cerca servizi o strutture..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card shadow-sm border-0 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="p-6 rounded-3xl bg-card shadow-sm border border-border hover:shadow-md transition-all text-left"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-4`}
                  >
                    <Icon size={26} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm">{category.name}</h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
