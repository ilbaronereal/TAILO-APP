import { useState } from "react";
import { ChevronLeft, MapPin, Clock, Phone, Globe, Heart, Star, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { getServiceById } from "../data/services";
import { useFavorites } from "../hooks/useFavorites";
import { useReviews } from "../hooks/useReviews";

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange?.(n)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={18}
            className={n <= value ? "text-yellow-400 fill-yellow-400" : "text-muted"}
          />
        </button>
      ))}
    </div>
  );
}

function AddReviewModal({ onClose, onSave }: { onClose: () => void; onSave: (r: { author: string; rating: number; comment: string; petName?: string }) => void }) {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [petName, setPetName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3>Scrivi una recensione</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <X size={18} />
            </button>
          </div>

          <div className="flex justify-center mb-5">
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div className="space-y-3">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Il tuo nome *"
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm"
            />
            <input
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Nome del tuo pet (opzionale)"
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Racconta la tua esperienza..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm resize-none"
            />
            <button
              onClick={() => {
                if (!author || !comment) return;
                onSave({ author, rating, comment, petName: petName || undefined });
                onClose();
              }}
              disabled={!author || !comment}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white disabled:opacity-40"
            >
              Pubblica recensione
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { reviews, avgRating, addReview } = useReviews(serviceId || "");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const service = getServiceById(serviceId || "");

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">Servizio non trovato</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-2xl bg-[var(--pastel-orange)] text-white"
          >
            Torna indietro
          </button>
        </div>
      </div>
    );
  }

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(service.address)}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[var(--pastel-orange-dark)] pt-6 pb-8 px-6 rounded-b-[3rem] relative">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() => toggleFavorite(serviceId || "")}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart
              className={isFavorite(serviceId || "") ? "text-red-500 fill-red-500" : "text-white"}
              size={20}
            />
          </button>
        </div>

        <div className="flex flex-col items-center text-white">
          <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-5xl mb-4 border-4 border-white/40">
            {service.emoji}
          </div>
          <h1 className="text-2xl mb-2 text-center">{service.name}</h1>
          <div className="flex items-center gap-3">
            <p className="text-white/80 text-sm">{service.category}</p>
            {service.is24h && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">24h</span>
            )}
          </div>
          {reviews.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <Star size={15} className="text-yellow-300 fill-yellow-300" />
              <span className="text-white text-sm">{avgRating}</span>
              <span className="text-white/60 text-xs">({reviews.length} recensioni)</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        <div className="mb-6">
          <div className="space-y-3">
            {service.services.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {item.available && (
                    <div className="w-2 h-2 rounded-full bg-[var(--pastel-green)]"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <h3 className="mb-4">Contatti</h3>
          <div className="space-y-3">
            <a href={`tel:${service.phone}`} className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-peach)] flex items-center justify-center">
                <Phone className="text-white" size={18} />
              </div>
              <span>{service.phone}</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-mint)] flex items-center justify-center">
                <MapPin className="text-white" size={18} />
              </div>
              <span className="flex-1">{service.address}</span>
            </div>
            <a
              href={`https://${service.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--pastel-blue)] flex items-center justify-center">
                <Globe className="text-white" size={18} />
              </div>
              <span>{service.website}</span>
            </a>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <h3 className="mb-4">Orari di apertura</h3>
          <div className="space-y-2">
            {service.hours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{schedule.day}</span>
                <span>{schedule.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews section */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Recensioni</h3>
              {reviews.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1">
                  <StarRating value={Math.round(avgRating)} />
                  <span className="text-sm text-muted-foreground">{avgRating} su 5 ({reviews.length})</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-sm text-[var(--pastel-orange)] bg-[var(--pastel-orange)]/10 px-3 py-1.5 rounded-xl"
            >
              + Aggiungi
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">Nessuna recensione ancora.</p>
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-2 text-sm text-[var(--pastel-orange)]"
              >
                Sii il primo a recensire
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{review.author}</p>
                      {review.petName && (
                        <p className="text-xs text-muted-foreground">Pet: {review.petName}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StarRating value={review.rating} />
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--pastel-orange)] to-[var(--pastel-coral)] text-white shadow-lg text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <MapPin size={20} />
            <span>Ottieni indicazioni</span>
          </div>
        </a>
      </div>

      {showReviewModal && (
        <AddReviewModal
          onClose={() => setShowReviewModal(false)}
          onSave={(r) => addReview(r)}
        />
      )}
    </div>
  );
}
