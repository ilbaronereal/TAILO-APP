import { useState, useEffect } from "react";

export interface Review {
  id: string;
  serviceId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  petName?: string;
}

const STORAGE_KEY = "tailo_reviews";

const SEED_REVIEWS: Review[] = [
  { id: "rv-1", serviceId: "vet-1", author: "Giulia M.", rating: 5, comment: "Ottima clinica, personale molto professionale. Max è stato curato benissimo!", date: "2026-03-15", petName: "Max" },
  { id: "rv-2", serviceId: "vet-1", author: "Luca P.", rating: 4, comment: "Tempi di attesa un po' lunghi ma la qualità è alta. Consigliato.", date: "2026-02-28", petName: "Birba" },
  { id: "rv-3", serviceId: "vet-1", author: "Sara C.", rating: 5, comment: "Il Dr. Bianchi è eccezionale. Sempre disponibile e molto attento.", date: "2026-01-10" },
  { id: "rv-4", serviceId: "vet-2", author: "Marco R.", rating: 5, comment: "Il dott. Rossi è il miglior veterinario di Milano. Luna lo adora.", date: "2026-03-20", petName: "Luna" },
  { id: "rv-5", serviceId: "grm-1", author: "Chiara L.", rating: 5, comment: "Mia cagnolina esce sempre bellissima! Staff gentilissimo.", date: "2026-03-18", petName: "Coco" },
  { id: "rv-6", serviceId: "grm-1", author: "Andrea F.", rating: 4, comment: "Buon servizio, prezzi onesti. Prenoto sempre qui.", date: "2026-02-05" },
  { id: "rv-7", serviceId: "dw-1", author: "Francesca B.", rating: 5, comment: "Max torna sempre stanco felice! Affidabilissimi.", date: "2026-04-01", petName: "Max" },
  { id: "rv-8", serviceId: "emg-1", author: "Roberto V.", rating: 5, comment: "Ci hanno salvato il gatto di notte. Professionali e tempestivi. Grazie infinite!", date: "2026-03-30", petName: "Tigre" },
  { id: "rv-9", serviceId: "emg-1", author: "Elena S.", rating: 5, comment: "Pronto soccorso fantastico, hanno operato il mio cane in 30 minuti dall'arrivo.", date: "2026-02-14", petName: "Rex" },
];

export function useReviews(serviceId: string) {
  const [allReviews, setAllReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_REVIEWS;
    } catch {
      return SEED_REVIEWS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
  }, [allReviews]);

  const reviews = allReviews.filter((r) => r.serviceId === serviceId);
  const avgRating = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const addReview = (review: Omit<Review, "id" | "serviceId" | "date">) => {
    setAllReviews((prev) => [
      ...prev,
      {
        ...review,
        id: `rv-${Date.now()}`,
        serviceId,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  return { reviews, avgRating, addReview };
}
