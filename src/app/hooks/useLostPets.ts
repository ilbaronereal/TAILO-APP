import { useState, useEffect } from "react";

export type LostPetType = "lost" | "found";

export interface LostPet {
  id: string;
  type: LostPetType;
  petName: string;
  species: string;
  breed?: string;
  color: string;
  area: string;
  description: string;
  contact: string;
  date: string;
  imageUrl?: string;
  reward?: string;
}

const STORAGE_KEY = "tailo_lost_pets";

const SEED_LOST: LostPet[] = [
  {
    id: "lp-1",
    type: "lost",
    petName: "Micio",
    species: "Gatto",
    breed: "Europeo",
    color: "Grigio a strisce nere",
    area: "Navigli, Milano",
    description: "Gatto maschio sterilizzato, con collare rosso. Scomparso la notte del 20 aprile dal cortile di Via Savona.",
    contact: "+39 339 1234567",
    date: "2026-04-20",
    reward: "50€",
  },
  {
    id: "lp-2",
    type: "found",
    petName: "Sconosciuto",
    species: "Cane",
    breed: "Meticcio",
    color: "Marrone e bianco",
    area: "Parco Sempione, Milano",
    description: "Trovato cucciolo di circa 6 mesi, molto docile. Ha il microchip ma il numero non risulta. È al sicuro da noi.",
    contact: "+39 347 9876543",
    date: "2026-04-21",
  },
  {
    id: "lp-3",
    type: "lost",
    petName: "Bella",
    species: "Gatto",
    breed: "Persiano",
    color: "Bianco con macchie arancioni",
    area: "Isola, Milano",
    description: "Gatta femmina di 3 anni, molto timida. Porta una targhetta con il nome. Scomparsa dalla finestra del 3° piano.",
    contact: "+39 380 5556789",
    date: "2026-04-19",
    reward: "100€",
  },
  {
    id: "lp-4",
    type: "found",
    petName: "Sconosciuto",
    species: "Gatto",
    breed: "Siamese",
    color: "Crema con punte scure",
    area: "Porta Venezia, Milano",
    description: "Gatto Siamese adulto trovato sotto la pioggia in Via Mozart. Sembra ben curato, probabilmente è sfuggito di casa.",
    contact: "+39 335 1112233",
    date: "2026-04-22",
  },
];

export function useLostPets() {
  const [lostPets, setLostPets] = useState<LostPet[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_LOST;
    } catch {
      return SEED_LOST;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lostPets));
  }, [lostPets]);

  const addLostPet = (pet: Omit<LostPet, "id" | "date">) => {
    setLostPets((prev) => [
      {
        ...pet,
        id: `lp-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const lost = lostPets.filter((p) => p.type === "lost");
  const found = lostPets.filter((p) => p.type === "found");

  return { lostPets, lost, found, addLostPet };
}
