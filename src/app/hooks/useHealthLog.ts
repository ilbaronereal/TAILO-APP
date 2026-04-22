import { useState, useEffect } from "react";

export type HealthEventType = "vet" | "weight" | "symptom" | "medication" | "note" | "vaccine";

export interface HealthEvent {
  id: string;
  petId: string;
  type: HealthEventType;
  date: string;
  title: string;
  description?: string;
  value?: number; // for weight in kg
}

const TYPE_ICONS: Record<HealthEventType, string> = {
  vet: "🩺",
  weight: "⚖️",
  symptom: "🤒",
  medication: "💊",
  note: "📝",
  vaccine: "💉",
};

const TYPE_LABELS: Record<HealthEventType, string> = {
  vet: "Visita vet",
  weight: "Peso",
  symptom: "Sintomo",
  medication: "Farmaco",
  note: "Nota",
  vaccine: "Vaccino",
};

export { TYPE_ICONS, TYPE_LABELS };

const STORAGE_KEY = "tailo_health_log";

const SEED_EVENTS: HealthEvent[] = [
  { id: "he-1", petId: "1", type: "vet", date: "2026-03-15", title: "Visita di controllo", description: "Tutto ok, denti perfetti. Prossimo vaccino tra 2 mesi." },
  { id: "he-2", petId: "1", type: "weight", date: "2026-03-15", title: "Peso registrato", value: 28.2 },
  { id: "he-3", petId: "1", type: "vaccine", date: "2026-01-10", title: "Vaccino polivalente", description: "Vaccinazione annuale completata." },
  { id: "he-4", petId: "1", type: "symptom", date: "2026-02-20", title: "Ha vomitato", description: "Episodio singolo dopo aver mangiato troppo velocemente. Risolto." },
  { id: "he-5", petId: "1", type: "weight", date: "2026-01-05", title: "Peso registrato", value: 27.8 },
  { id: "he-6", petId: "1", type: "weight", date: "2025-10-01", title: "Peso registrato", value: 27.0 },
  { id: "he-7", petId: "2", type: "vet", date: "2026-04-01", title: "Visita dermatologica", description: "Lieve irritazione al pelo. Prescritto shampoo medicato." },
  { id: "he-8", petId: "2", type: "weight", date: "2026-04-01", title: "Peso registrato", value: 4.1 },
  { id: "he-9", petId: "2", type: "weight", date: "2026-01-15", title: "Peso registrato", value: 3.9 },
  { id: "he-10", petId: "2", type: "medication", date: "2026-04-01", title: "Shampoo medicato", description: "Da usare 2 volte a settimana per 4 settimane." },
];

export function useHealthLog(petId: string) {
  const [events, setEvents] = useState<HealthEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_EVENTS;
    } catch {
      return SEED_EVENTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const petEvents = events
    .filter((e) => e.petId === petId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const weightHistory = petEvents
    .filter((e) => e.type === "weight" && e.value != null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const addEvent = (event: Omit<HealthEvent, "id" | "petId">) => {
    setEvents((prev) => [
      ...prev,
      { ...event, id: `he-${Date.now()}`, petId },
    ]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return { events: petEvents, weightHistory, addEvent, deleteEvent };
}
