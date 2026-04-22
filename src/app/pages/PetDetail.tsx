import { ChevronLeft, Edit, Heart, Ruler, Weight, MapPin, Activity } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import maxImage from "../../imports/cane-1.jpg";

export function PetDetail() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const pets = [
    {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: "3y 2m",
      image: maxImage,
      weight: "28 kg",
      height: "60 cm",
      color: "Dorato",
      description: "Max è un Golden Retriever affettuoso e giocherellone. Adora correre al parco e giocare a riporto con la palla. È molto socievole sia con le persone che con altri cani.",
      behavior: {
        personality: "Amichevole e giocoso",
        energy: "Energia moderata",
      },
      medicalInfo: {
        vet: "Dr. Marco Rossi",
        microchip: "380260001234567",
        insurance: "Attiva",
      },
    },
    {
      id: "2",
      name: "Luna",
      breed: "Persiano",
      age: "2y 1m",
      emoji: "🐱",
      image: null,
      weight: "4 kg",
      height: "25 cm",
      color: "Grigio chiaro",
      description: "Luna è una gatta Persiana elegante e tranquilla. Ama sonnecchiare al sole e farsi coccolare. È molto dolce ma un po' timida con gli estranei.",
      behavior: {
        personality: "Dolce e tranquilla",
        energy: "Energia bassa",
      },
      medicalInfo: {
        vet: "Dr. Marco Rossi",
        microchip: "380260007654321",
        insurance: "Attiva",
      },
    },
  ];

  const pet = pets.find((p) => p.id === petId) || pets[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-80 bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)]">
        <button
          onClick={() => navigate("/pet-profile")}
          className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <Heart
            className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
            size={20}
          />
        </button>

        <div className="absolute inset-0 flex items-center justify-center pb-8">
          {pet.image ? (
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-9xl">{pet.emoji}</div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-card rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl mb-2">{pet.name}</h1>
              <p className="text-muted-foreground">
                {pet.breed} • {pet.age}
              </p>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <Edit size={20} />
            </button>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[var(--pastel-orange)]" />
            <h2>About the pet</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 rounded-2xl bg-muted/30">
              <Weight size={20} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm">{pet.weight}</p>
              <p className="text-xs text-muted-foreground">Peso</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-muted/30">
              <Ruler size={20} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm">{pet.height}</p>
              <p className="text-xs text-muted-foreground">Altezza</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-muted/30">
              <div className={`w-5 h-5 rounded-full ${pet.id === "1" ? 'bg-[#DAA520]' : 'bg-gray-300'} mx-auto mb-2`} />
              <p className="text-sm text-xs">{pet.color}</p>
              <p className="text-xs text-muted-foreground">Colore</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {pet.description}
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-[var(--pastel-orange)]" />
            <h2>Pet's behavior</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Personalità</span>
              <span className="text-sm">{pet.behavior.personality}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Livello energia</span>
              <span className="text-sm">{pet.behavior.energy}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="mb-4">Informazioni mediche</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Veterinario</span>
              <span className="text-sm">{pet.medicalInfo.vet}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Microchip</span>
              <span className="text-sm font-mono text-xs">{pet.medicalInfo.microchip}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Assicurazione</span>
              <span className="text-sm text-[var(--pastel-green)]">{pet.medicalInfo.insurance}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/agenda")}
            className="py-4 rounded-2xl bg-[var(--pastel-peach)] text-white"
          >
            Agenda
          </button>
          <button className="py-4 rounded-2xl bg-[var(--pastel-mint)] text-white">
            Cartella clinica
          </button>
        </div>
      </div>
    </div>
  );
}
