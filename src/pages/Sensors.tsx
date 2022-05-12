import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonButton,
  IonFooter,
  IonCol,
  IonRow,
  IonGrid,
  IonNote,
  useIonToast,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Page.css";
import { checkmarkCircle, walk, moon, speedometer } from "ionicons/icons";
import { Sahha, SahhaSensor, SahhaSensorStatus } from "sahha-capacitor";

const Motion: React.FC = () => {
  const [presentToast, dismissToast] = useIonToast();
  const [sleepSensorStatus, setSleepSensorStatus] = useState<SahhaSensorStatus>(
    SahhaSensorStatus.pending
  );
  const [pedometerSensorStatus, setPedometerSensorStatus] =
    useState<SahhaSensorStatus>(SahhaSensorStatus.pending);

  useEffect(() => {
    Sahha.getSensorStatus({ sensor: SahhaSensor.sleep })
      .then((data) => {
        console.log("sleep " + SahhaSensorStatus[data.status]);
        setSleepSensorStatus(data.status);
      })
      .catch((error: Error) => {
        console.error(error);
      });

    Sahha.getSensorStatus({ sensor: SahhaSensor.pedometer })
      .then((data) => {
        console.log("pedometer " + SahhaSensorStatus[data.status]);
        setPedometerSensorStatus(data.status);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sensors</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-text-center ion-margin-top">
          <IonIcon icon={speedometer} size="large"></IonIcon>
        </div>
      </IonContent>

      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonItem>
                <IonIcon icon={moon} size="large"></IonIcon>
                <IonLabel>Sleep</IonLabel>
                <IonNote>{SahhaSensorStatus[sleepSensorStatus]}</IonNote>
              </IonItem>
              <IonButton
                expand="block"
                onClick={() => {
                  Sahha.enableSensor({ sensor: SahhaSensor.sleep })
                    .then((data) => {
                      setSleepSensorStatus(data.status);
                      const status = SahhaSensorStatus[data.status];
                      console.log(status);
                      presentToast({
                        message: status,
                        duration: 2000,
                        icon: checkmarkCircle,
                      });
                    })
                    .catch((error: Error) => {
                      console.error(error);
                    });
                }}
              >
                ENABLE
              </IonButton>
              <IonItem></IonItem>
              <IonItem>
                <IonIcon icon={walk} size="large"></IonIcon>
                <IonLabel>Pedometer</IonLabel>
                <IonNote>{SahhaSensorStatus[pedometerSensorStatus]}</IonNote>
              </IonItem>
              <IonButton
                expand="block"
                onClick={() => {
                  Sahha.enableSensor({ sensor: SahhaSensor.pedometer })
                    .then((data) => {
                      setPedometerSensorStatus(data.status);
                      const status = SahhaSensorStatus[data.status];
                      console.log(status);
                      console.log(data.status);
                      presentToast({
                        message: status,
                        duration: 2000,
                        icon: checkmarkCircle,
                      });
                    })
                    .catch((error: Error) => {
                      console.error(error);
                    });
                }}
              >
                ENABLE
              </IonButton>
              <IonItem></IonItem>
              <IonButton
                expand="block"
                onClick={() => {
                  Sahha.openAppSettings();
                }}
              >
                OPEN APP SETTINGS
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonItem />
      </IonFooter>
    </IonPage>
  );
};

export default Motion;
