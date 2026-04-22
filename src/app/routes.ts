import { createHashRouter } from "react-router";
import { Home } from "./pages/Home";
import { PetProfile } from "./pages/PetProfile";
import { PetDetail } from "./pages/PetDetail";
import { CategoryList } from "./pages/CategoryList";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Agenda } from "./pages/Agenda";
import { Emergency } from "./pages/Emergency";
import { LostPets } from "./pages/LostPets";
import { Reminders } from "./pages/Reminders";
import { Layout } from "./components/Layout";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "pet-profile", Component: PetProfile },
      { path: "pet/:petId", Component: PetDetail },
      { path: "category/:categoryId", Component: CategoryList },
      { path: "service/:serviceId", Component: ServiceDetail },
      { path: "agenda", Component: Agenda },
      { path: "emergency", Component: Emergency },
      { path: "lost-pets", Component: LostPets },
      { path: "reminders", Component: Reminders },
    ],
  },
]);
