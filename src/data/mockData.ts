export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  status: "prospect" | "client" | "fidèle";
  lastAppointment?: string;
  unpaidBalance: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  service: string;
  status: "confirmé" | "en attente" | "annulé" | "terminé";
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "payé" | "en attente" | "en retard";
  items: { description: string; quantity: number; price: number }[];
}

export interface Message {
  id: string;
  clientId: string;
  clientName: string;
  type: "SMS" | "Email";
  subject?: string;
  content: string;
  date: string;
  status: "envoyé" | "délivré" | "lu" | "échoué";
  direction: "sortant" | "entrant";
}

export interface TimelineEvent {
  id: string;
  type: "appointment" | "message" | "payment" | "invoice";
  date: string;
  title: string;
  description: string;
  status?: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  type: "rappel_rdv" | "relance_facture" | "mail_post_prestation" | "rapport_hebdomadaire";
  enabled: boolean;
  template: string;
  trigger: string;
  timing: string;
}

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    phone: "06 12 34 56 78",
    email: "jean.dupont@email.fr",
    status: "fidèle",
    lastAppointment: "2025-10-20",
    unpaidBalance: 0,
    createdAt: "2024-06-15",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Leroy",
    phone: "06 87 65 43 21",
    email: "marie.leroy@email.fr",
    status: "client",
    lastAppointment: "2025-10-18",
    unpaidBalance: 120,
    createdAt: "2025-09-22",
  },
  {
    id: "3",
    firstName: "Karim",
    lastName: "Haddad",
    phone: "06 45 78 12 34",
    email: "karim.haddad@email.fr",
    status: "prospect",
    unpaidBalance: 0,
    createdAt: "2025-10-15",
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Martin",
    phone: "06 99 88 77 66",
    email: "sophie.martin@email.fr",
    status: "client",
    lastAppointment: "2025-10-10",
    unpaidBalance: 350,
    createdAt: "2025-03-10",
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Morel",
    phone: "06 11 22 33 44",
    email: "lucas.morel@email.fr",
    status: "fidèle",
    lastAppointment: "2025-10-22",
    unpaidBalance: 0,
    createdAt: "2024-11-01",
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "Jean Dupont",
    date: "2025-10-25",
    time: "09:00",
    service: "Plomberie - Réparation fuite",
    status: "confirmé",
    price: 85,
  },
  {
    id: "2",
    clientId: "2",
    clientName: "Marie Leroy",
    date: "2025-10-26",
    time: "14:00",
    service: "Soin visage",
    status: "en attente",
    price: 65,
  },
  {
    id: "3",
    clientId: "3",
    clientName: "Karim Haddad",
    date: "2025-10-25",
    time: "10:30",
    service: "Coupe + coloration",
    status: "confirmé",
    price: 95,
  },
  {
    id: "4",
    clientId: "4",
    clientName: "Sophie Martin",
    date: "2025-10-27",
    time: "08:00",
    service: "Entretien jardin",
    status: "confirmé",
    price: 150,
  },
  {
    id: "5",
    clientId: "5",
    clientName: "Lucas Morel",
    date: "2025-10-24",
    time: "15:30",
    service: "Consultation marketing",
    status: "terminé",
    price: 120,
  },
  {
    id: "6",
    clientId: "1",
    clientName: "Jean Dupont",
    date: "2025-10-22",
    time: "11:00",
    service: "Installation évier",
    status: "terminé",
    price: 180,
  },
  {
    id: "7",
    clientId: "2",
    clientName: "Marie Leroy",
    date: "2025-10-28",
    time: "16:00",
    service: "Épilation",
    status: "en attente",
    price: 45,
  },
  {
    id: "8",
    clientId: "4",
    clientName: "Sophie Martin",
    date: "2025-10-23",
    time: "09:30",
    service: "Taille haies",
    status: "terminé",
    price: 85,
  },
  {
    id: "9",
    clientId: "5",
    clientName: "Lucas Morel",
    date: "2025-10-29",
    time: "10:00",
    service: "Audit site web",
    status: "confirmé",
    price: 200,
  },
  {
    id: "10",
    clientId: "3",
    clientName: "Karim Haddad",
    date: "2025-10-30",
    time: "13:00",
    service: "Coupe homme",
    status: "en attente",
    price: 35,
  },
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "F-2025-001",
    clientId: "1",
    clientName: "Jean Dupont",
    amount: 180,
    date: "2025-10-22",
    dueDate: "2025-11-07",
    status: "payé",
    items: [{ description: "Installation évier", quantity: 1, price: 180 }],
  },
  {
    id: "2",
    number: "F-2025-002",
    clientId: "2",
    clientName: "Marie Leroy",
    amount: 120,
    date: "2025-10-18",
    dueDate: "2025-11-03",
    status: "en attente",
    items: [
      { description: "Soin visage", quantity: 1, price: 65 },
      { description: "Massage", quantity: 1, price: 55 },
    ],
  },
  {
    id: "3",
    number: "F-2025-003",
    clientId: "4",
    clientName: "Sophie Martin",
    amount: 350,
    date: "2025-10-10",
    dueDate: "2025-10-26",
    status: "en retard",
    items: [
      { description: "Entretien jardin", quantity: 2, price: 150 },
      { description: "Produits jardinage", quantity: 1, price: 50 },
    ],
  },
  {
    id: "4",
    number: "F-2025-004",
    clientId: "5",
    clientName: "Lucas Morel",
    amount: 120,
    date: "2025-10-24",
    dueDate: "2025-11-09",
    status: "payé",
    items: [{ description: "Consultation marketing", quantity: 1, price: 120 }],
  },
  {
    id: "5",
    number: "F-2025-005",
    clientId: "3",
    clientName: "Karim Haddad",
    amount: 95,
    date: "2025-10-21",
    dueDate: "2025-11-06",
    status: "payé",
    items: [{ description: "Coupe + coloration", quantity: 1, price: 95 }],
  },
  {
    id: "6",
    number: "F-2025-006",
    clientId: "4",
    clientName: "Sophie Martin",
    amount: 85,
    date: "2025-10-23",
    dueDate: "2025-11-08",
    status: "en attente",
    items: [{ description: "Taille haies", quantity: 1, price: 85 }],
  },
  {
    id: "7",
    number: "F-2025-007",
    clientId: "1",
    clientName: "Jean Dupont",
    amount: 85,
    date: "2025-09-15",
    dueDate: "2025-10-01",
    status: "payé",
    items: [{ description: "Réparation fuite", quantity: 1, price: 85 }],
  },
  {
    id: "8",
    number: "F-2025-008",
    clientId: "2",
    clientName: "Marie Leroy",
    amount: 45,
    date: "2025-09-28",
    dueDate: "2025-10-14",
    status: "payé",
    items: [{ description: "Épilation", quantity: 1, price: 45 }],
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "Jean Dupont",
    type: "SMS",
    content: "Bonjour Jean, petit rappel pour votre rendez-vous demain à 09:00. Répondez OK pour confirmer.",
    date: "2025-10-24T08:00:00",
    status: "délivré",
    direction: "sortant",
  },
  {
    id: "2",
    clientId: "1",
    clientName: "Jean Dupont",
    type: "SMS",
    content: "OK",
    date: "2025-10-24T08:15:00",
    status: "délivré",
    direction: "entrant",
  },
  {
    id: "3",
    clientId: "2",
    clientName: "Marie Leroy",
    type: "SMS",
    content: "Bonjour Marie, la facture n°F-2025-002 de 120€ est en attente depuis 7 jours. Paiement sécurisé : https://fluxa.fr/pay/F-2025-002",
    date: "2025-10-25T10:00:00",
    status: "délivré",
    direction: "sortant",
  },
  {
    id: "4",
    clientId: "4",
    clientName: "Sophie Martin",
    type: "Email",
    subject: "Relance facture F-2025-003",
    content: "Bonjour Sophie, nous vous rappelons que la facture n°F-2025-003 de 350€ est en retard. Merci de régulariser votre situation.",
    date: "2025-10-26T14:00:00",
    status: "lu",
    direction: "sortant",
  },
  {
    id: "5",
    clientId: "5",
    clientName: "Lucas Morel",
    type: "Email",
    subject: "Merci pour votre visite",
    content: "Bonjour Lucas, merci pour votre confiance. N'hésitez pas à nous laisser un avis : https://g.page/r/fluxa",
    date: "2025-10-24T16:00:00",
    status: "lu",
    direction: "sortant",
  },
  {
    id: "6",
    clientId: "3",
    clientName: "Karim Haddad",
    type: "SMS",
    content: "Bonjour Karim, petit rappel pour votre rendez-vous demain à 10:30. Répondez OK pour confirmer.",
    date: "2025-10-24T09:00:00",
    status: "délivré",
    direction: "sortant",
  },
  {
    id: "7",
    clientId: "3",
    clientName: "Karim Haddad",
    type: "SMS",
    content: "OK merci",
    date: "2025-10-24T09:10:00",
    status: "délivré",
    direction: "entrant",
  },
  {
    id: "8",
    clientId: "2",
    clientName: "Marie Leroy",
    type: "SMS",
    content: "Bonjour Marie, petit rappel pour votre rendez-vous demain à 14:00. Répondez OK pour confirmer.",
    date: "2025-10-25T08:00:00",
    status: "délivré",
    direction: "sortant",
  },
  {
    id: "9",
    clientId: "4",
    clientName: "Sophie Martin",
    type: "SMS",
    content: "Bonjour Sophie, petit rappel pour votre rendez-vous demain à 08:00. Répondez OK pour confirmer.",
    date: "2025-10-26T08:00:00",
    status: "délivré",
    direction: "sortant",
  },
  {
    id: "10",
    clientId: "4",
    clientName: "Sophie Martin",
    type: "SMS",
    content: "OK",
    date: "2025-10-26T08:05:00",
    status: "délivré",
    direction: "entrant",
  },
  {
    id: "11",
    clientId: "5",
    clientName: "Lucas Morel",
    type: "SMS",
    content: "Bonjour Lucas, petit rappel pour votre rendez-vous demain à 10:00. Répondez OK pour confirmer.",
    date: "2025-10-28T08:00:00",
    status: "envoyé",
    direction: "sortant",
  },
  {
    id: "12",
    clientId: "1",
    clientName: "Jean Dupont",
    type: "Email",
    subject: "Merci pour votre visite",
    content: "Bonjour Jean, merci pour votre confiance. Voici quelques conseils d'entretien pour votre installation.",
    date: "2025-10-22T12:00:00",
    status: "lu",
    direction: "sortant",
  },
  {
    id: "13",
    clientId: "3",
    clientName: "Karim Haddad",
    type: "Email",
    subject: "Bienvenue chez Fluxa",
    content: "Bonjour Karim, bienvenue ! Nous sommes ravis de vous compter parmi nos clients.",
    date: "2025-10-15T10:00:00",
    status: "lu",
    direction: "sortant",
  },
  {
    id: "14",
    clientId: "5",
    clientName: "Lucas Morel",
    type: "SMS",
    content: "Bonjour, je souhaiterais déplacer mon RDV du 29/10",
    date: "2025-10-23T14:00:00",
    status: "délivré",
    direction: "entrant",
  },
  {
    id: "15",
    clientId: "5",
    clientName: "Lucas Morel",
    type: "SMS",
    content: "Pas de souci Lucas, quelle date vous conviendrait ?",
    date: "2025-10-23T14:05:00",
    status: "délivré",
    direction: "sortant",
  },
];

// Mock Automations
export const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Rappel RDV (J-1)",
    description: "Envoi automatique d'un SMS de rappel 1 jour avant le rendez-vous",
    type: "rappel_rdv",
    enabled: true,
    template: "Bonjour {prenom}, petit rappel pour votre rendez-vous demain à {heure}. Répondez OK pour confirmer ou cliquez ici pour déplacer/annuler: {lien}",
    trigger: "24h avant RDV",
    timing: "08:00",
  },
  {
    id: "2",
    name: "Relance facture (J+7)",
    description: "Relance automatique par SMS pour les factures impayées après 7 jours",
    type: "relance_facture",
    enabled: true,
    template: "Bonjour {prenom}, la facture n°{numero} de {montant}€ est en attente depuis 7 jours. Paiement sécurisé : {lien}. Merci.",
    trigger: "7 jours après échéance",
    timing: "10:00",
  },
  {
    id: "3",
    name: "Mail post-prestation",
    description: "Email de remerciement envoyé automatiquement après chaque prestation",
    type: "mail_post_prestation",
    enabled: false,
    template: "Bonjour {prenom}, merci pour votre confiance. Voici quelques conseils pour entretenir votre {service}. Laissez-nous un avis : {lien}.",
    trigger: "Après RDV terminé",
    timing: "2h après",
  },
  {
    id: "4",
    name: "Rapport hebdomadaire",
    description: "Récapitulatif automatique de votre activité envoyé chaque début de semaine",
    type: "rapport_hebdomadaire",
    enabled: true,
    template: "📊 Votre semaine : {ca}€ de CA, {rdv_total} rendez-vous dont {rdv_confirmes} confirmés, {nouveaux_clients} nouveaux clients. Impayés : {impayes}€. Bon début de semaine !",
    trigger: "Chaque lundi",
    timing: "08:00",
  },
];

// KPI Data
export const mockKPIs = {
  weekRevenue: 820,
  newClients: 3,
  confirmedAppointments: 6,
  unpaid: 470,
  attendanceRate: 92,
  topServices: [
    { name: "Entretien jardin", count: 12 },
    { name: "Plomberie", count: 8 },
    { name: "Soins esthétiques", count: 7 },
    { name: "Coiffure", count: 6 },
    { name: "Consulting", count: 4 },
  ],
};

// Chart Data
export const mockRevenueData = [
  { day: "Lun", revenue: 120 },
  { day: "Mar", revenue: 180 },
  { day: "Mer", revenue: 95 },
  { day: "Jeu", revenue: 150 },
  { day: "Ven", revenue: 200 },
  { day: "Sam", revenue: 75 },
  { day: "Dim", revenue: 0 },
];
