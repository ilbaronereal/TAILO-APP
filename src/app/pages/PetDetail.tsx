import { ChevronLeft, Edit, Weight, Ruler, Activity, Plus, Check, Trash2, X, Bell, BellOff } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import maxImage from "../../imports/cane-1.jpg";
import { useChecklist } from "../hooks/useChecklist";
import { useReminders, TYPE_LABELS as REMINDER_LABELS, TYPE_ICONS as REMINDER_ICONS, ReminderType, daysUntil } from "../hooks/useReminders";
import { useHealthLog, TYPE_ICONS as HEALTH_ICONS, TYPE_LABELS as HEALTH_LABELS, HealthEventType } from "../hooks/useHealthLog";

const pets = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "3 anni 2 mesi",
    image: maxImage,
    weight: "28 kg",
    height: "60 cm",
    color: "Dorato",
    description: "Max è un Golden Retriever affettuoso e giocherellone. Adora correre al parco e giocare a riporto con la palla.",
    behavior: { personality: "Amichevole e giocoso", energy: "Energia moderata" },
    medicalInfo: { vet: "Dr. Marco Rossi", microchip: "380260001234567", insurance: "Attiva" },
  },
  {
    id: "2",
    name: "Luna",
    breed: "Persiano",
    age: "2 anni 1 mese",
    emoji: "🐱",
    image: null,
    weight: "4 kg",
    height: "25 cm",
    color: "Grigio chiaro",
    description: "Luna è una gatta Persiana elegante e tranquilla. Ama sonnecchiare al sole e farsi coccolare.",
    behavior: { personality: "Dolce e tranquilla", energy: "Energia bassa" },
    medicalInfo: { vet: "Dr. Marco Rossi", microchip: "380260007654321", insurance: "Attiva" },
  },
];

type Tab = "profile" | "checklist" | "health" | "documents";

// ---------- Checklist Tab ----------
function ChecklistTab({ petId }: { petId: string }) {
  const { items, toggle, addItem, removeItem, completedCount } = useChecklist(petId);
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const pct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3>Checklist di oggi</h3>
          <span className="text-sm text-muted-foreground">{completedCount}/{items.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 group"
            >
              <button
                onClick={() => toggle(item.id)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  item.done
                    ? "bg-[var(--pastel-orange)] text-white"
                    : "border-2 border-muted-foreground/30"
                }`}
              >
                {item.done && <Check size={14} strokeWidth={3} />}
              </button>
              <span className={`flex-1 text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>
                {item.label}
              </span>
              {!item.isDefault && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center transition-opacity"
                >
                  <Trash2 size={12} className="text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>

        {adding ? (
          <div className="flex gap-2 mt-3">
            <input
              autoFocus
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newLabel.trim()) {
                  addItem(newLabel.trim());
                  setNewLabel("");
                  setAdding(false);
                }
              }}
              placeholder="Nome voce..."
              className="flex-1 px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm"
            />
            <button
              onClick={() => {
                if (newLabel.trim()) addItem(newLabel.trim());
                setNewLabel("");
                setAdding(false);
              }}
              className="px-3 py-2 rounded-xl bg-[var(--pastel-orange)] text-white text-sm"
            >
              Aggiungi
            </button>
            <button onClick={() => { setAdding(false); setNewLabel(""); }} className="w-9 rounded-xl bg-muted flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 mt-3 text-sm text-[var(--pastel-orange)]"
          >
            <Plus size={16} />
            Aggiungi voce
          </button>
        )}
      </div>

      {pct === 100 && items.length > 0 && (
        <div className="text-center py-3 bg-green-50 rounded-2xl text-green-700 text-sm">
          🎉 Tutto completato per oggi!
        </div>
      )}
    </div>
  );
}

// ---------- Reminders section inside Health ----------
function RemindersSection({ petId, petName }: { petId: string; petName: string }) {
  const { upcoming, addReminder, toggleDone, deleteReminder } = useReminders(petId);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "vaccine" as ReminderType, title: "", dueDate: "", recurrenceDays: "365", notes: "" });

  const urgencyColor = (days: number) => {
    if (days <= 7) return "bg-red-100 border-red-200 text-red-700";
    if (days <= 30) return "bg-orange-100 border-orange-200 text-orange-700";
    return "bg-blue-50 border-blue-100 text-blue-700";
  };

  return (
    <div className="bg-card rounded-3xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-[var(--pastel-orange)]" />
          <h3>Reminder</h3>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="text-sm text-[var(--pastel-orange)]">
          <Plus size={18} />
        </button>
      </div>

      {showAdd && (
        <div className="bg-muted/30 rounded-2xl p-4 mb-4 space-y-3">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as ReminderType })}
            className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
          >
            {(Object.keys(REMINDER_LABELS) as ReminderType[]).map((t) => (
              <option key={t} value={t}>{REMINDER_ICONS[t]} {REMINDER_LABELS[t]}</option>
            ))}
          </select>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titolo reminder"
            className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
          />
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
          />
          <select
            value={form.recurrenceDays}
            onChange={(e) => setForm({ ...form, recurrenceDays: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
          >
            <option value="">Nessuna ricorrenza</option>
            <option value="30">Ogni mese</option>
            <option value="90">Ogni 3 mesi</option>
            <option value="180">Ogni 6 mesi</option>
            <option value="365">Ogni anno</option>
          </select>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Note (opzionale)"
            rows={2}
            className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!form.title || !form.dueDate) return;
                addReminder({ ...form, petId, petName, recurrenceDays: form.recurrenceDays ? parseInt(form.recurrenceDays) : undefined });
                setShowAdd(false);
                setForm({ type: "vaccine", title: "", dueDate: "", recurrenceDays: "365", notes: "" });
              }}
              className="flex-1 py-2 rounded-xl bg-[var(--pastel-orange)] text-white text-sm"
            >
              Salva
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-muted text-sm">
              Annulla
            </button>
          </div>
        </div>
      )}

      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">Nessun reminder impostato</p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((r) => {
            const days = daysUntil(r.dueDate);
            return (
              <div key={r.id} className={`flex items-center gap-3 p-3 rounded-2xl border ${urgencyColor(days)} group`}>
                <span className="text-xl flex-shrink-0">{REMINDER_ICONS[r.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-xs opacity-70">
                    {days === 0 ? "Oggi!" : days < 0 ? `Scaduto da ${Math.abs(days)} giorni` : `Tra ${days} giorni`}
                    {r.recurrenceDays && ` • Ricorrente`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleDone(r.id)}
                    className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center"
                    title="Segna come fatto"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => deleteReminder(r.id)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- Health Tab ----------
function HealthTab({ petId, petName }: { petId: string; petName: string }) {
  const { events, weightHistory, addEvent } = useHealthLog(petId);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "note" as HealthEventType, date: new Date().toISOString().split("T")[0], title: "", description: "", value: "" });

  const latestWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1] : null;
  const prevWeight = weightHistory.length > 1 ? weightHistory[weightHistory.length - 2] : null;
  const weightDiff = latestWeight && prevWeight ? (latestWeight.value! - prevWeight.value!).toFixed(1) : null;

  return (
    <div className="space-y-4">
      {/* Weight mini chart */}
      {weightHistory.length > 0 && (
        <div className="bg-card rounded-3xl p-5 shadow-sm border border-border">
          <h3 className="mb-3">Peso nel tempo</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl">{latestWeight?.value} kg</span>
            {weightDiff !== null && (
              <span className={`text-sm mb-1 ${parseFloat(weightDiff) > 0 ? "text-orange-500" : "text-green-600"}`}>
                {parseFloat(weightDiff) > 0 ? "▲" : "▼"} {Math.abs(parseFloat(weightDiff))} kg
              </span>
            )}
          </div>
          <div className="flex items-end gap-1 h-16">
            {weightHistory.map((e, i) => {
              const vals = weightHistory.map((x) => x.value!);
              const min = Math.min(...vals) * 0.98;
              const max = Math.max(...vals) * 1.02;
              const pct = ((e.value! - min) / (max - min)) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-sm transition-all ${i === weightHistory.length - 1 ? "bg-[var(--pastel-orange)]" : "bg-muted"}`}
                    style={{ height: `${Math.max(pct, 10)}%` }}
                  />
                  <span className="text-xs text-muted-foreground" style={{ fontSize: "9px" }}>
                    {e.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reminders */}
      <RemindersSection petId={petId} petName={petName} />

      {/* Timeline */}
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3>Diario della salute</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="text-sm text-[var(--pastel-orange)]">
            <Plus size={18} />
          </button>
        </div>

        {showAdd && (
          <div className="bg-muted/30 rounded-2xl p-4 mb-4 space-y-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as HealthEventType })}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
            >
              {(Object.keys(HEALTH_LABELS) as HealthEventType[]).map((t) => (
                <option key={t} value={t}>{HEALTH_ICONS[t]} {HEALTH_LABELS[t]}</option>
              ))}
            </select>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
            />
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={form.type === "weight" ? "es. Peso registrato" : "Titolo *"}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
            />
            {form.type === "weight" && (
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder="Peso in kg (es. 28.5)"
                step="0.1"
                className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm"
              />
            )}
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Note (opzionale)"
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!form.title) return;
                  addEvent({ type: form.type, date: form.date, title: form.title, description: form.description || undefined, value: form.value ? parseFloat(form.value) : undefined });
                  setShowAdd(false);
                  setForm({ type: "note", date: new Date().toISOString().split("T")[0], title: "", description: "", value: "" });
                }}
                className="flex-1 py-2 rounded-xl bg-[var(--pastel-orange)] text-white text-sm"
              >
                Salva
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-muted text-sm">
                Annulla
              </button>
            </div>
          </div>
        )}

        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nessun evento registrato</p>
        ) : (
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={e.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center text-lg flex-shrink-0">
                    {HEALTH_ICONS[e.type]}
                  </div>
                  {i < events.length - 1 && <div className="w-0.5 flex-1 bg-muted/40 mt-1" />}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium">{e.title}</p>
                    <span className="text-xs text-muted-foreground">{e.date}</span>
                  </div>
                  {e.value != null && (
                    <p className="text-sm text-[var(--pastel-orange)]">{e.value} kg</p>
                  )}
                  {e.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{e.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Documents Tab ----------
function DocumentsTab() {
  const [docs, setDocs] = useState([
    { id: "d1", name: "Libretto sanitario.pdf", type: "pdf", date: "2026-01-10" },
    { id: "d2", name: "Vaccino polivalente.jpg", type: "photo", date: "2026-01-10" },
    { id: "d3", name: "Assicurazione 2026.pdf", type: "pdf", date: "2026-01-01" },
  ]);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3>Documenti e foto</h3>
        </div>

        <div className="bg-muted/30 rounded-2xl p-4 flex flex-col items-center gap-2 border-2 border-dashed border-muted mb-4">
          <span className="text-2xl">📎</span>
          <p className="text-sm text-muted-foreground text-center">
            Carica documenti o foto<br />
            <span className="text-xs">(PDF, JPG, PNG)</span>
          </p>
          <button className="text-sm text-[var(--pastel-orange)] bg-[var(--pastel-orange)]/10 px-4 py-2 rounded-xl mt-1">
            Sfoglia file
          </button>
        </div>

        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-blue)]/20 flex items-center justify-center text-xl">
                {doc.type === "pdf" ? "📄" : "🖼️"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.date}</p>
              </div>
              <button
                onClick={() => setDocs((prev) => prev.filter((d) => d.id !== doc.id))}
                className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export function PetDetail() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { upcoming: allUpcoming } = useReminders(petId || "1");

  const pet = pets.find((p) => p.id === petId) || pets[0];
  const urgentReminders = allUpcoming.filter((r) => daysUntil(r.dueDate) <= 30).length;

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "profile", label: "Profilo" },
    { id: "checklist", label: "Checklist" },
    { id: "health", label: "Salute", badge: urgentReminders || undefined },
    { id: "documents", label: "Documenti" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-64 bg-gradient-to-br from-[var(--pastel-orange)] to-[var(--pastel-coral)]">
        <button
          onClick={() => navigate("/pet-profile")}
          className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          {pet.image ? (
            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-8xl">{(pet as typeof pet & { emoji?: string }).emoji}</div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-10 relative z-10">
        {/* Header card */}
        <div className="bg-card rounded-3xl shadow-lg p-5 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl mb-1">{pet.name}</h1>
              <p className="text-muted-foreground text-sm">{pet.breed} • {pet.age}</p>
            </div>
            <button className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">
              <Edit size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-2xl p-1 shadow-sm mb-5 border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs transition-all relative ${
                activeTab === tab.id
                  ? "bg-[var(--pastel-orange)] text-white shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="bg-card rounded-3xl shadow-sm border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-[var(--pastel-orange)]" />
                <h2>Dati fisici</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-2xl bg-muted/30">
                  <Weight size={18} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">{pet.weight}</p>
                  <p className="text-xs text-muted-foreground">Peso</p>
                </div>
                <div className="text-center p-3 rounded-2xl bg-muted/30">
                  <Ruler size={18} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">{pet.height}</p>
                  <p className="text-xs text-muted-foreground">Altezza</p>
                </div>
                <div className="text-center p-3 rounded-2xl bg-muted/30">
                  <div className={`w-4 h-4 rounded-full ${pet.id === "1" ? "bg-[#DAA520]" : "bg-gray-300"} mx-auto mb-2`} />
                  <p className="text-xs">{pet.color}</p>
                  <p className="text-xs text-muted-foreground">Colore</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">{pet.description}</p>
            </div>

            <div className="bg-card rounded-3xl shadow-sm border border-border p-5">
              <h3 className="mb-3">Comportamento</h3>
              <div className="space-y-2">
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

            <div className="bg-card rounded-3xl shadow-sm border border-border p-5">
              <h3 className="mb-3">Informazioni mediche</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
                  <span className="text-sm text-muted-foreground">Veterinario</span>
                  <span className="text-sm">{pet.medicalInfo.vet}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
                  <span className="text-sm text-muted-foreground">Microchip</span>
                  <span className="text-xs font-mono">{pet.medicalInfo.microchip}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-muted/30">
                  <span className="text-sm text-muted-foreground">Assicurazione</span>
                  <span className="text-sm text-green-600">{pet.medicalInfo.insurance}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/agenda")}
                className="py-4 rounded-2xl bg-[var(--pastel-peach)] text-white text-sm"
              >
                Agenda
              </button>
              <button
                onClick={() => setActiveTab("health")}
                className="py-4 rounded-2xl bg-[var(--pastel-mint)] text-white text-sm"
              >
                Cartella clinica
              </button>
            </div>
          </div>
        )}

        {activeTab === "checklist" && <ChecklistTab petId={pet.id} />}
        {activeTab === "health" && <HealthTab petId={pet.id} petName={pet.name} />}
        {activeTab === "documents" && <DocumentsTab />}
      </div>
    </div>
  );
}
