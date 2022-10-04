import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  useIonToast,
  IonFooter,
  IonLabel,
  IonToggle,
} from "@ionic/react";
import React, { useState } from "react";
import "./Page.css";
import { checkmarkCircle, analytics, closeCircle } from "ionicons/icons";
import { Sahha } from "sahha-capacitor";

const Analyzation: React.FC = () => {
  const [presentToast, dismissToast] = useIonToast();
  const [analysis, setAnalysis] = useState<string>("");
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Analyzation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-text-center ion-margin-top">
          <IonIcon icon={analytics} size="large"></IonIcon>
          <IonItem className="ion-margin"></IonItem>
          <IonLabel>A new analysis is available every 24 hours</IonLabel>
        </div>
        <div className="ion-text-center ion-margin-top">
          <IonItem className="ion-margin"></IonItem>
          <IonLabel>{analysis}</IonLabel>
        </div>
      </IonContent>

      <IonFooter>
        <IonItem>
          <IonLabel>Include source data in analysis</IonLabel>
          <IonToggle
            checked={isToggleOn}
            onIonChange={(e) => setIsToggleOn(e.detail.checked)}
          />
        </IonItem>
        <IonButton
          expand="block"
          onClick={() => {
            let endDate: Date = new Date();
            let days = endDate.getDate() - 7;
            var startDate = new Date();
            startDate.setDate(days);

            Sahha.analyze({
              startDate: startDate.getTime(),
              endDate: endDate.getTime(),
              includeSourceData: isToggleOn,
            })
              .then((data) => {
                console.log(data.value);
                setAnalysis(data.value);
                presentToast({
                  message: "Analysis OK",
                  duration: 2000,
                  icon: checkmarkCircle,
                });
              })
              .catch((error: Error) => {
                console.error(error);
                setAnalysis("");
                presentToast({
                  message: "Analysis Error",
                  duration: 2000,
                  icon: checkmarkCircle,
                });
              });
          }}
        >
          ANALYZE PREVIOUS WEEK
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => {
            Sahha.analyze({
              includeSourceData: isToggleOn,
            })
              .then((data) => {
                console.log(data.value);
                setAnalysis(data.value);
                presentToast({
                  message: "Analysis OK",
                  duration: 2000,
                  icon: checkmarkCircle,
                });
              })
              .catch((error: Error) => {
                console.error(error);
                setAnalysis("");
                presentToast({
                  message: "Analysis Error",
                  duration: 2000,
                  icon: closeCircle,
                });
              });
          }}
        >
          ANALYZE PREVIOUS DAY
        </IonButton>
        <IonItem></IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Analyzation;
