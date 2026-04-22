import { useState, useEffect } from "react";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  isDefault: boolean;
}

const DEFAULT_ITEMS = ["Acqua fresca", "Cibo mattina", "Cibo sera", "Passeggiata", "Medicinali"];

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function storageKey(petId: string) {
  return `tailo_checklist_${petId}_${todayKey()}`;
}

function templateKey(petId: string) {
  return `tailo_checklist_template_${petId}`;
}

function getTemplate(petId: string): ChecklistItem[] {
  try {
    const stored = localStorage.getItem(templateKey(petId));
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_ITEMS.map((label, i) => ({
    id: `default-${i}`,
    label,
    done: false,
    isDefault: true,
  }));
}

export function useChecklist(petId: string) {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey(petId));
      if (stored) return JSON.parse(stored);
    } catch {}
    return getTemplate(petId);
  });

  useEffect(() => {
    localStorage.setItem(storageKey(petId), JSON.stringify(items));
  }, [items, petId]);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const addItem = (label: string) => {
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      label,
      done: false,
      isDefault: false,
    };
    setItems((prev) => {
      const updated = [...prev, newItem];
      // Save to template so it persists across days
      const template = updated.map((i) => ({ ...i, done: false }));
      localStorage.setItem(templateKey(petId), JSON.stringify(template));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      const template = updated.map((i) => ({ ...i, done: false }));
      localStorage.setItem(templateKey(petId), JSON.stringify(template));
      return updated;
    });
  };

  const completedCount = items.filter((i) => i.done).length;

  return { items, toggle, addItem, removeItem, completedCount };
}
