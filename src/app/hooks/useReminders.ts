import { useState, useEffect } from "react";

export type ReminderType = "vaccine" | "antiparasitic" | "vet" | "medication" | "custom";

export interface Reminder {
  id: string;
  petId: string;
  petName: string;
  type: ReminderType;
  title: string;
  dueDate: string; // ISO date string
  done: boolean;
  recurrenceDays?: number;
  notes?: string;
}

const STORAGE_KEY = "tailo_reminders";

const TYPE_LABELS: Record<ReminderType, string> = {
  vaccine: "Vaccino",
  antiparasitic: "Antiparassitario",
  vet: "Visita veterinaria",
  medication: "Medicinale",
  custom: "Personalizzato",
};

const TYPE_ICONS: Record<ReminderType, string> = {
  vaccine: "💉",
  antiparasitic: "🦟",
  vet: "🩺",
  medication: "💊",
  custom: "🔔",
};

export { TYPE_LABELS, TYPE_ICONS };

const SEED_REMINDERS: Reminder[] = [
  {
    id: "seed-1",
    petId: "1",
    petName: "Max",
    type: "vaccine",
    title: "Vaccino Polivalente",
    dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    done: false,
    recurrenceDays: 365,
    notes: "Vaccinazione annuale obbligatoria",
  },
  {
    id: "seed-2",
    petId: "1",
    petName: "Max",
    type: "antiparasitic",
    title: "Antiparassitario mensile",
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    done: false,
    recurrenceDays: 30,
  },
  {
    id: "seed-3",
    petId: "2",
    petName: "Luna",
    type: "vet",
    title: "Controllo annuale",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    done: false,
    recurrenceDays: 365,
  },
  {
    id: "seed-4",
    petId: "2",
    petName: "Luna",
    type: "antiparasitic",
    title: "Trattamento pulci e zecche",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    done: false,
    recurrenceDays: 30,
  },
];

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export { daysUntil };

export function useReminders(petId?: string) {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_REMINDERS;
    } catch {
      return SEED_REMINDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  const filtered = petId ? reminders.filter((r) => r.petId === petId) : reminders;
  const upcoming = filtered
    .filter((r) => !r.done)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const addReminder = (reminder: Omit<Reminder, "id" | "done">) => {
    setReminders((prev) => [
      ...prev,
      { ...reminder, id: `rem-${Date.now()}`, done: false },
    ]);
  };

  const toggleDone = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (!r.done && r.recurrenceDays) {
          const nextDate = new Date(r.dueDate);
          nextDate.setDate(nextDate.getDate() + r.recurrenceDays);
          return { ...r, dueDate: nextDate.toISOString().split("T")[0] };
        }
        return { ...r, done: !r.done };
      })
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return { reminders: filtered, upcoming, addReminder, toggleDone, deleteReminder };
}
