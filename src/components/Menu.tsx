import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  home,
  lockClosed,
  person,
  speedometer,
  analytics,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/main",
    icon: home,
  },
  {
    title: "Authentication",
    url: "/authentication",
    icon: lockClosed,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: person,
  },
  {
    title: "Sensors",
    url: "/sensors",
    icon: speedometer,
  },
  {
    title: "Analyzation",
    url: "/analyzation",
    icon: analytics,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
