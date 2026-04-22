import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

export function Agenda() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(24);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventType, setEventType] = useState<"appointment" | "reminder">("appointment");

  const appointments = [
    {
      id: 1,
      date: "24 Apr 2026",
      time: "15:00",
      title: "Controllo veterinario",
      location: "Clinica San Francesco",
      type: "veterinary",
      color: "bg-[var(--pastel-orange)]",
    },
    {
      id: 2,
      date: "26 Apr 2026",
      time: "10:30",
      title: "Toilettatura",
      location: "Pet Grooming Studio",
      type: "grooming",
      color: "bg-[var(--pastel-coral)]",
    },
    {
      id: 3,
      date: "28 Apr 2026",
      time: "16:00",
      title: "Lezione addestramento",
      location: "Centro Cinofilo",
      type: "training",
      color: "bg-[var(--pastel-mint)]",
    },
  ];

  const days = Array.from({ length: 7 }, (_, i) => ({
    day: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"][i % 7],
    date: 22 + i,
  }));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange-dark)] pt-6 pb-8 px-6 rounded-b-[3rem]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-white">Agenda</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <Plus className="text-white" size={24} />
          </button>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-1">
          <div className="flex items-center justify-between p-4">
            <button className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <ChevronLeft className="text-white" size={18} />
            </button>
            <span className="text-white">Aprile 2026</span>
            <button className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 p-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`flex flex-col items-center py-3 rounded-2xl transition-all ${
                  selectedDate === day.date
                    ? "bg-white text-foreground"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="text-xs mb-1">{day.day}</span>
                <span className="text-lg">{day.date}</span>
                {(day.date === 24 || day.date === 26 || day.date === 28) && (
                  <div className="w-1 h-1 rounded-full bg-[var(--pastel-orange)] mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2>Prossimi appuntamenti</h2>
          <span className="text-sm text-muted-foreground">{appointments.length} eventi</span>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-5 rounded-3xl bg-card shadow-sm border border-border"
            >
              <div className="flex gap-4">
                <div className={`w-16 h-16 rounded-2xl ${appointment.color} flex flex-col items-center justify-center text-white flex-shrink-0`}>
                  <span className="text-xs">Apr</span>
                  <span className="text-xl">{appointment.date.split(" ")[0]}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{appointment.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[var(--pastel-coral)] to-[var(--pastel-peach)] text-center">
          <h3 className="mb-2">📅 Promemoria Vaccini</h3>
          <p className="text-sm text-muted-foreground">
            Il vaccino per la Parvovirosi scadrà tra 2 mesi
          </p>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-[60]" onClick={() => setShowAddModal(false)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl p-6 pb-10 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2>Aggiungi evento</h2>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Tipo</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEventType("appointment")}
                    className={`p-4 rounded-xl transition-all ${
                      eventType === "appointment"
                        ? "bg-[var(--pastel-orange)] text-white"
                        : "bg-muted"
                    }`}
                  >
                    Appuntamento
                  </button>
                  <button
                    onClick={() => setEventType("reminder")}
                    className={`p-4 rounded-xl transition-all ${
                      eventType === "reminder"
                        ? "bg-[var(--pastel-orange)] text-white"
                        : "bg-muted"
                    }`}
                  >
                    Reminder
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Titolo</label>
                <input
                  id="event-title"
                  type="text"
                  placeholder={
                    eventType === "appointment"
                      ? "es. Visita veterinaria"
                      : "es. Vaccino antirabbia"
                  }
                  className="w-full px-4 py-3 rounded-xl bg-muted border-0"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">
                  {eventType === "appointment" ? "Data e ora" : "Data"}
                </label>
                <input
                  id="event-datetime"
                  type={eventType === "appointment" ? "datetime-local" : "date"}
                  className="w-full px-4 py-3 rounded-xl bg-muted border-0"
                />
              </div>

              {eventType === "appointment" && (
                <div>
                  <label className="text-sm text-muted-foreground mb-3 block">Luogo</label>
                  <input
                    id="event-location"
                    type="text"
                    placeholder="es. Clinica Veterinaria"
                    className="w-full px-4 py-3 rounded-xl bg-muted border-0"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Animale</label>
                <select id="event-pet" className="w-full px-4 py-3 rounded-xl bg-muted border-0">
                  <option>Max</option>
                  <option>Luna</option>
                </select>
              </div>

              {eventType === "reminder" && (
                <div>
                  <label className="text-sm text-muted-foreground mb-3 block">Note</label>
                  <textarea
                    id="event-notes"
                    placeholder="es. Portare libretto sanitario"
                    className="w-full px-4 py-3 rounded-xl bg-muted border-0 min-h-[80px]"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    const title = (document.getElementById("event-title") as HTMLInputElement)?.value;
                    const datetime = (document.getElementById("event-datetime") as HTMLInputElement)?.value;

                    if (title && datetime) {
                      // Aggiungi al calendario del telefono
                      const date = new Date(datetime);
                      const startTime = date.toISOString().replace(/-|:|\.\d+/g, '');
                      const endTime = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');
                      const location = eventType === "appointment" ? (document.getElementById("event-location") as HTMLInputElement)?.value : "";
                      const notes = eventType === "reminder" ? (document.getElementById("event-notes") as HTMLTextAreaElement)?.value : "";

                      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(notes || "")}&location=${encodeURIComponent(location || "")}`;

                      window.open(calendarUrl, '_blank');
                      setShowAddModal(false);
                    } else {
                      alert("Compila tutti i campi obbligatori");
                    }
                  }}
                  className="w-full py-4 rounded-2xl bg-[var(--pastel-blue)] text-white shadow-lg mb-3"
                >
                  Aggiungi al calendario
                </button>

                <button
                  onClick={() => {
                    // Qui salveresti l'evento nell'app
                    setShowAddModal(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white shadow-lg"
                >
                  Salva nell'app
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
