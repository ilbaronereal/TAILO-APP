import { useNavigate } from "react-router";
import { ChevronLeft, Bell, Check, Trash2 } from "lucide-react";
import { useReminders, daysUntil } from "../hooks/useReminders";

export function Reminders() {
  const navigate = useNavigate();
  const { upcoming, toggleDone, deleteReminder } = useReminders();

  const urgencyColor = (days: number) => {
    if (days <= 0) return "bg-red-100 border-red-200";
    if (days <= 7) return "bg-red-50 border-red-100";
    if (days <= 30) return "bg-orange-50 border-orange-100";
    return "bg-card border-border";
  };

  const urgencyText = (days: number) => {
    if (days < 0) return `Scaduto da ${Math.abs(days)} giorni`;
    if (days === 0) return "Oggi";
    if (days === 1) return "Domani";
    return `Tra ${days} giorni`;
  };

  const grouped = upcoming.reduce<Record<string, typeof upcoming>>((acc, r) => {
    const key = r.petName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange-dark)] pt-6 pb-8 px-6 rounded-b-[3rem]">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <h1 className="text-2xl text-white">Reminder</h1>
        </div>
        <p className="text-white/70 text-sm ml-14">{upcoming.length} in arrivo</p>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        {upcoming.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={40} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nessun reminder impostato</p>
            <p className="text-sm text-muted-foreground mt-1">
              Aggiungili dal profilo del tuo pet
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([petName, reminders]) => (
              <div key={petName}>
                <h3 className="text-sm text-muted-foreground mb-3">{petName}</h3>
                <div className="space-y-2">
                  {reminders.map((r) => {
                    const days = daysUntil(r.dueDate);
                    return (
                      <div
                        key={r.id}
                        className={`flex items-center gap-3 p-4 rounded-2xl border ${urgencyColor(days)}`}
                      >
                        <Bell size={18} className="text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{r.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {urgencyText(days)} · {r.dueDate}
                            {r.recurrenceDays && " · Ricorrente"}
                          </p>
                          {r.notes && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => toggleDone(r.id)}
                            className="w-8 h-8 rounded-xl bg-white/60 border border-border flex items-center justify-center"
                            title="Segna come fatto"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => deleteReminder(r.id)}
                            className="w-8 h-8 rounded-xl bg-white/60 border border-border flex items-center justify-center"
                          >
                            <Trash2 size={13} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
