import { ChevronLeft, Edit, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import maxImage from "../../imports/cane-1.jpg";

export function PetProfile() {
  const navigate = useNavigate();
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const owner = {
    name: "Mario Rossi",
    email: "mario.rossi@email.com",
    phone: "+39 348 1234567",
    address: "Via Roma 123, Milano",
    memberSince: "Gen 2024",
  };

  const pets = [
    {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: "3 anni",
      emoji: "🐕",
      image: maxImage,
    },
    {
      id: "2",
      name: "Luna",
      breed: "Persiano",
      age: "2 anni",
      emoji: "🐱",
      image: null,
    },
  ];

  const currentPet = pets[currentPetIndex];
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
          <h2 className="text-white text-lg">Il mio profilo</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <Edit className="text-white" size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center text-white">
          <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center text-4xl mb-4">
            👤
          </div>
          <h1 className="text-2xl mb-1">{owner.name}</h1>
          <p className="text-sm text-white/70 mb-1">{owner.email}</p>
          <p className="text-xs text-white/60">Membro da {owner.memberSince}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-2">
        <div className="bg-card rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2>Informazioni personali</h2>
            {isEditing && (
              <button className="text-primary text-sm">Modifica</button>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-peach)] flex items-center justify-center">
                <Phone className="text-white" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Telefono</p>
                {isEditing ? (
                  <input type="tel" className="w-full px-2 py-1 rounded-lg bg-muted border-0 text-sm" defaultValue={owner.phone} />
                ) : (
                  <p className="text-sm">{owner.phone}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-blue)] flex items-center justify-center">
                <Mail className="text-white" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                {isEditing ? (
                  <input type="email" className="w-full px-2 py-1 rounded-lg bg-muted border-0 text-sm" defaultValue={owner.email} />
                ) : (
                  <p className="text-sm">{owner.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-mint)] flex items-center justify-center">
                <MapPin className="text-white" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Indirizzo</p>
                {isEditing ? (
                  <input type="text" className="w-full px-2 py-1 rounded-lg bg-muted border-0 text-sm" defaultValue={owner.address} />
                ) : (
                  <p className="text-sm">{owner.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-4">I tuoi pet</h2>

          <div className="relative">
            <button
              onClick={() => navigate(`/pet/${currentPet.id}`)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)] rounded-3xl p-6 text-white shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/30 flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden">
                  {currentPet.image ? (
                    <img
                      src={currentPet.image}
                      alt={currentPet.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">{currentPet.emoji}</span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl mb-1">{currentPet.name}</h3>
                  <p className="text-sm text-white/80">
                    {currentPet.breed} • {currentPet.age}
                  </p>
                </div>
                <div className="text-sm bg-white/20 px-4 py-2 rounded-xl">
                  Vedi profilo
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

        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white shadow-lg"
          >
            Salva modifiche
          </button>
        )}
      </div>
    </div>
  );
}
