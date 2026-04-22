export interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  phone: string;
  website: string;
  hours: { day: string; time: string }[];
  services: { name: string; description: string; icon: string; available: boolean }[];
  lat: number;
  lng: number;
  emoji: string;
  is24h?: boolean;
  isEmergency?: boolean;
}

const allServices: Service[] = [
  // Veterinario
  {
    id: "vet-1",
    name: "Clinica Veterinaria San Francesco",
    category: "veterinary",
    rating: 4.8,
    reviews: 156,
    distance: "1.2 km",
    address: "Via Roma 45, Milano",
    phone: "+39 02 1234567",
    website: "www.sanfrancesco-vet.it",
    hours: [
      { day: "Lun-Ven", time: "9:00 - 19:00" },
      { day: "Sabato", time: "9:00 - 13:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Visite generali", description: "Check-up completo", icon: "🩺", available: true },
      { name: "Vaccinazioni", description: "Piano vaccinale", icon: "💉", available: true },
      { name: "Chirurgia", description: "Interventi specializzati", icon: "⚕️", available: true },
      { name: "Radiologia", description: "Diagnostica per immagini", icon: "📷", available: true },
      { name: "Emergenze 24h", description: "Pronto soccorso", icon: "🚨", available: true },
    ],
    lat: 45.464, lng: 9.19, emoji: "🏥",
  },
  {
    id: "vet-2",
    name: "Veterinario Dr. Rossi",
    category: "veterinary",
    rating: 4.9,
    reviews: 203,
    distance: "2.5 km",
    address: "Corso Garibaldi 12, Milano",
    phone: "+39 02 7654321",
    website: "www.drrossi-vet.it",
    hours: [
      { day: "Lun-Sab", time: "8:30 - 20:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Visite generali", description: "Check-up completo", icon: "🩺", available: true },
      { name: "Dermatologia", description: "Cura della pelle", icon: "🔬", available: true },
      { name: "Ortopedia", description: "Ossa e articolazioni", icon: "🦴", available: true },
    ],
    lat: 45.471, lng: 9.188, emoji: "🏥",
  },
  {
    id: "vet-3",
    name: "Pet Care Vet",
    category: "veterinary",
    rating: 4.6,
    reviews: 89,
    distance: "3.8 km",
    address: "Via Verdi 78, Milano",
    phone: "+39 02 9876543",
    website: "www.petcarevet.it",
    hours: [
      { day: "Lun-Dom", time: "Aperto 24h" },
    ],
    services: [
      { name: "Emergenze", description: "Pronto soccorso h24", icon: "🚨", available: true },
      { name: "Ricovero", description: "Degenza e monitoraggio", icon: "🛏️", available: true },
    ],
    lat: 45.458, lng: 9.201, emoji: "🏥", is24h: true,
  },

  // Toilettatura
  {
    id: "grm-1",
    name: "Grooming Studio Miao & Bau",
    category: "grooming",
    rating: 4.7,
    reviews: 134,
    distance: "0.8 km",
    address: "Via Torino 22, Milano",
    phone: "+39 02 3456789",
    website: "www.miaoebau.it",
    hours: [
      { day: "Mar-Sab", time: "9:00 - 18:00" },
      { day: "Dom-Lun", time: "Chiuso" },
    ],
    services: [
      { name: "Bagno e asciugatura", description: "Shampoo e soffiatura", icon: "🛁", available: true },
      { name: "Taglio pelo", description: "Tosatura e rifinitura", icon: "✂️", available: true },
      { name: "Taglio unghie", description: "Cura degli artigli", icon: "💅", available: true },
      { name: "Pulizia orecchie", description: "Igiene auricolare", icon: "👂", available: true },
    ],
    lat: 45.462, lng: 9.185, emoji: "✂️",
  },
  {
    id: "grm-2",
    name: "Pet Spa Milano",
    category: "grooming",
    rating: 4.5,
    reviews: 98,
    distance: "1.9 km",
    address: "Viale Monza 56, Milano",
    phone: "+39 02 4567890",
    website: "www.petspamilano.it",
    hours: [
      { day: "Lun-Sab", time: "8:00 - 19:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Trattamento spa", description: "Trattamento premium", icon: "🌸", available: true },
      { name: "Tintura pelo", description: "Colori sicuri pet-friendly", icon: "🎨", available: true },
      { name: "Massaggio", description: "Relax e benessere", icon: "💆", available: true },
    ],
    lat: 45.475, lng: 9.205, emoji: "✂️",
  },

  // Nutrizione
  {
    id: "nut-1",
    name: "NutriPet Specialist",
    category: "nutrition",
    rating: 4.8,
    reviews: 72,
    distance: "2.1 km",
    address: "Via Brera 10, Milano",
    phone: "+39 02 5678901",
    website: "www.nutripet.it",
    hours: [
      { day: "Lun-Ven", time: "10:00 - 18:00" },
      { day: "Sabato", time: "10:00 - 13:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Consulenza nutrizionale", description: "Piani alimentari personalizzati", icon: "🥗", available: true },
      { name: "Diete terapeutiche", description: "Alimentazione per patologie", icon: "💊", available: true },
      { name: "Intolleranze alimentari", description: "Test e gestione", icon: "🔍", available: true },
    ],
    lat: 45.467, lng: 9.186, emoji: "🥩",
  },
  {
    id: "nut-2",
    name: "Cibo Naturale per Pet",
    category: "nutrition",
    rating: 4.6,
    reviews: 45,
    distance: "3.2 km",
    address: "Via Moscova 33, Milano",
    phone: "+39 02 6789012",
    website: "www.cibonaturalepet.it",
    hours: [
      { day: "Lun-Sab", time: "9:00 - 20:00" },
      { day: "Domenica", time: "10:00 - 14:00" },
    ],
    services: [
      { name: "Alimenti biologici", description: "Prodotti naturali certificati", icon: "🌿", available: true },
      { name: "BARF diet", description: "Alimentazione cruda bilanciata", icon: "🥩", available: true },
    ],
    lat: 45.47, lng: 9.192, emoji: "🥩",
  },

  // Pet Sitting
  {
    id: "ps-1",
    name: "Casa Dolce Casa Pet",
    category: "pet-sitting",
    rating: 4.9,
    reviews: 187,
    distance: "0.5 km",
    address: "Via Solferino 8, Milano",
    phone: "+39 347 1234567",
    website: "www.casadolcecasapet.it",
    hours: [
      { day: "Lun-Dom", time: "Disponibile 24h" },
    ],
    services: [
      { name: "Pet sitting in casa", description: "Il tuo pet a casa sua", icon: "🏠", available: true },
      { name: "Pet sitting a domicilio", description: "Andiamo da te", icon: "🚗", available: true },
      { name: "Visite di controllo", description: "1-3 visite al giorno", icon: "👁️", available: true },
    ],
    lat: 45.469, lng: 9.187, emoji: "🏠", is24h: true,
  },
  {
    id: "ps-2",
    name: "Happy Paws Sitter",
    category: "pet-sitting",
    rating: 4.7,
    reviews: 93,
    distance: "1.4 km",
    address: "Via Palestro 19, Milano",
    phone: "+39 348 9876543",
    website: "www.happypawssitter.it",
    hours: [
      { day: "Lun-Dom", time: "7:00 - 22:00" },
    ],
    services: [
      { name: "Pernottamento", description: "Il tuo pet dorme con noi", icon: "🌙", available: true },
      { name: "Custodia diurna", description: "Mentre sei al lavoro", icon: "☀️", available: true },
    ],
    lat: 45.473, lng: 9.197, emoji: "🏠",
  },

  // Dog Walking
  {
    id: "dw-1",
    name: "Urban Dog Walker",
    category: "dog-walking",
    rating: 4.8,
    reviews: 210,
    distance: "0.3 km",
    address: "Via Fatebenefratelli 5, Milano",
    phone: "+39 333 5678901",
    website: "www.urbandogwalker.it",
    hours: [
      { day: "Lun-Dom", time: "7:00 - 20:00" },
    ],
    services: [
      { name: "Passeggiata singola", description: "Solo il tuo cane, 1h", icon: "🦮", available: true },
      { name: "Passeggiata di gruppo", description: "Max 4 cani, 1h", icon: "🐕‍🦺", available: true },
      { name: "Escursione nel parco", description: "2h nel verde", icon: "🌳", available: true },
    ],
    lat: 45.465, lng: 9.189, emoji: "🦮",
  },
  {
    id: "dw-2",
    name: "Zampe Veloci",
    category: "dog-walking",
    rating: 4.6,
    reviews: 78,
    distance: "2.0 km",
    address: "Viale Argonne 42, Milano",
    phone: "+39 334 6789012",
    website: "www.zampeveloci.it",
    hours: [
      { day: "Lun-Sab", time: "8:00 - 18:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Passeggiata mattutina", description: "Prima di andare al lavoro", icon: "🌅", available: true },
      { name: "Jogging con il cane", description: "Per cani energici", icon: "🏃", available: true },
    ],
    lat: 45.456, lng: 9.208, emoji: "🦮",
  },

  // Pensioni
  {
    id: "brd-1",
    name: "Hotel 4 Zampe",
    category: "boarding",
    rating: 4.7,
    reviews: 162,
    distance: "4.1 km",
    address: "Via Padova 88, Milano",
    phone: "+39 02 8901234",
    website: "www.hotel4zampe.it",
    hours: [
      { day: "Lun-Dom", time: "8:00 - 20:00" },
    ],
    services: [
      { name: "Pernottamento standard", description: "Box confortevole", icon: "🛏️", available: true },
      { name: "Suite premium", description: "Camera con divano e TV", icon: "⭐", available: true },
      { name: "Toelettatura inclusa", description: "Bagno prima del ritorno", icon: "🛁", available: true },
      { name: "Webcam live", description: "Guarda il tuo pet in tempo reale", icon: "📹", available: true },
    ],
    lat: 45.479, lng: 9.212, emoji: "🏨", is24h: true,
  },
  {
    id: "brd-2",
    name: "Pensione La Cuccia Felice",
    category: "boarding",
    rating: 4.5,
    reviews: 88,
    distance: "5.3 km",
    address: "Via Padova 122, Milano",
    phone: "+39 02 9012345",
    website: "www.lacucciafelice.it",
    hours: [
      { day: "Lun-Dom", time: "7:30 - 21:00" },
    ],
    services: [
      { name: "Soggiorno in famiglia", description: "Ambiente casalingo", icon: "🏡", available: true },
      { name: "Giardino privato", description: "Spazio verde sicuro", icon: "🌿", available: true },
    ],
    lat: 45.482, lng: 9.215, emoji: "🏨",
  },

  // Addestramento
  {
    id: "trn-1",
    name: "Centro Cinofilo Milano",
    category: "training",
    rating: 4.9,
    reviews: 245,
    distance: "3.0 km",
    address: "Via Rubens 12, Milano",
    phone: "+39 02 0123456",
    website: "www.centrocinofilo.it",
    hours: [
      { day: "Lun-Sab", time: "9:00 - 18:00" },
      { day: "Domenica", time: "Chiuso" },
    ],
    services: [
      { name: "Obbedienza base", description: "Comandi fondamentali", icon: "🎓", available: true },
      { name: "Addestramento avanzato", description: "Tecniche professionali", icon: "🏆", available: true },
      { name: "Agility", description: "Percorsi ostacoli", icon: "🏅", available: true },
      { name: "Correzione comportamento", description: "Gestione aggressività", icon: "🧠", available: true },
    ],
    lat: 45.46, lng: 9.178, emoji: "🎓",
  },
  {
    id: "trn-2",
    name: "Dog Coach Pro",
    category: "training",
    rating: 4.7,
    reviews: 119,
    distance: "1.7 km",
    address: "Via Ampere 34, Milano",
    phone: "+39 02 1234560",
    website: "www.dogcoachpro.it",
    hours: [
      { day: "Mar-Dom", time: "8:00 - 17:00" },
      { day: "Lunedì", time: "Chiuso" },
    ],
    services: [
      { name: "Lezioni private", description: "1 a 1 con l'istruttore", icon: "👨‍🏫", available: true },
      { name: "Cuccioli 0-6 mesi", description: "Socializzazione precoce", icon: "🐾", available: true },
    ],
    lat: 45.468, lng: 9.199, emoji: "🎓",
  },

  // Shop
  {
    id: "shp-1",
    name: "PetShop Milano Centro",
    category: "shop",
    rating: 4.6,
    reviews: 301,
    distance: "0.6 km",
    address: "Corso Buenos Aires 7, Milano",
    phone: "+39 02 2345678",
    website: "www.petshopmilano.it",
    hours: [
      { day: "Lun-Sab", time: "9:00 - 20:00" },
      { day: "Domenica", time: "10:00 - 19:00" },
    ],
    services: [
      { name: "Alimenti premium", description: "Tutte le marche migliori", icon: "🥣", available: true },
      { name: "Accessori", description: "Guinzagli, cucce, giochi", icon: "🎾", available: true },
      { name: "Farmacia veterinaria", description: "Antiparassitari e integratori", icon: "💊", available: true },
      { name: "Abbigliamento", description: "Vestiti e cappottini", icon: "👗", available: true },
    ],
    lat: 45.467, lng: 9.204, emoji: "🛍️",
  },
  {
    id: "shp-2",
    name: "Zooplus Store",
    category: "shop",
    rating: 4.4,
    reviews: 178,
    distance: "2.3 km",
    address: "Via Vitruvio 43, Milano",
    phone: "+39 02 3456780",
    website: "www.zooplusstore.it",
    hours: [
      { day: "Lun-Dom", time: "9:30 - 21:00" },
    ],
    services: [
      { name: "Cibo naturale e bio", description: "Selezione premium biologica", icon: "🌿", available: true },
      { name: "Trasportini e gabbie", description: "Per ogni esigenza", icon: "🧳", available: true },
    ],
    lat: 45.474, lng: 9.202, emoji: "🛍️",
  },

  // Pronto Soccorso
  {
    id: "emg-1",
    name: "Pronto Soccorso Veterinario Milano",
    category: "emergency",
    rating: 4.9,
    reviews: 412,
    distance: "1.8 km",
    address: "Via Procaccini 54, Milano",
    phone: "+39 02 4400 6070",
    website: "www.psvet-milano.it",
    hours: [{ day: "Tutti i giorni", time: "Aperto 24h" }],
    services: [
      { name: "Pronto Soccorso", description: "Emergenze h24 7/7", icon: "🚨", available: true },
      { name: "Chirurgia d'urgenza", description: "Sala operatoria sempre attiva", icon: "⚕️", available: true },
      { name: "Terapia intensiva", description: "Monitoraggio continuo", icon: "🫀", available: true },
      { name: "Radiologia urgenza", description: "Diagnostica immediata", icon: "📷", available: true },
      { name: "Trasfusioni", description: "Banca del sangue pet", icon: "🩸", available: true },
    ],
    lat: 45.472, lng: 9.182, emoji: "🚨", is24h: true, isEmergency: true,
  },
  {
    id: "emg-2",
    name: "Clinica Veterinaria Notturna",
    category: "emergency",
    rating: 4.8,
    reviews: 287,
    distance: "3.1 km",
    address: "Corso XXII Marzo 15, Milano",
    phone: "+39 02 5518 2020",
    website: "www.vetnotturno.it",
    hours: [
      { day: "Lun-Ven", time: "20:00 - 8:00 (notte)" },
      { day: "Sab-Dom", time: "Aperto 24h" },
    ],
    services: [
      { name: "Urgenze notturne", description: "Copertura nelle ore serali", icon: "🌙", available: true },
      { name: "Ricovero urgenza", description: "Degenza d'emergenza", icon: "🛏️", available: true },
      { name: "Rianimazione", description: "Supporto vitale avanzato", icon: "💉", available: true },
    ],
    lat: 45.458, lng: 9.208, emoji: "🚨", is24h: true, isEmergency: true,
  },
  {
    id: "emg-3",
    name: "AmbulVet Milano — Veterinario a Domicilio",
    category: "emergency",
    rating: 4.7,
    reviews: 198,
    distance: "0 km",
    address: "Servizio a domicilio su tutta Milano",
    phone: "+39 02 8899 0011",
    website: "www.ambulvet.it",
    hours: [{ day: "Tutti i giorni", time: "7:00 - 23:00" }],
    services: [
      { name: "Visita a domicilio", description: "Il veterinario viene da te", icon: "🏠", available: true },
      { name: "Prelievi a domicilio", description: "Esami del sangue a casa", icon: "🩺", available: true },
      { name: "Eutanasia domiciliare", description: "In serenità a casa", icon: "🕊️", available: true },
    ],
    lat: 45.464, lng: 9.19, emoji: "🏠", isEmergency: true,
  },
];

export function getServicesByCategory(categoryId: string): Service[] {
  return allServices.filter((s) => s.category === categoryId);
}

export function getServiceById(id: string): Service | undefined {
  return allServices.find((s) => s.id === id);
}
