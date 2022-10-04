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
import {
  checkmarkCircle,
  walk,
  moon,
  speedometer,
  closeCircle,
} from "ionicons/icons";
import { Sahha, SahhaSensor, SahhaSensorStatus } from "sahha-capacitor";

const Motion: React.FC = () => {
  const [presentToast, dismissToast] = useIonToast();
  const [sensorStatus, setSensorStatus] = useState<SahhaSensorStatus>(
    SahhaSensorStatus.pending
  );

  useEffect(() => {
    Sahha.getSensorStatus()
      .then((data: any) => {
        console.log("sensor status " + SahhaSensorStatus[data.status]);
        setSensorStatus(data.status);
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
                <IonLabel>Status</IonLabel>
                <IonNote>{SahhaSensorStatus[sensorStatus]}</IonNote>
              </IonItem>
              <IonButton
                expand="block"
                onClick={() => {
                  Sahha.enableSensors()
                    .then((data: any) => {
                      setSensorStatus(data.status);
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
              <IonButton
                expand="block"
                onClick={() => {
                  Sahha.openAppSettings();
                }}
              >
                OPEN APP SETTINGS
              </IonButton>
              <IonItem></IonItem>
              <IonButton
                expand="block"
                onClick={() => {
                  //Sahha.postSensorData({ sensors: [SahhaSensor.pedometer] })
                  Sahha.postSensorData()
                    .then((data: any) => {
                      console.log(`Success: ${data.success}`);
                      presentToast({
                        message: "Post Sensor Data OK",
                        duration: 2000,
                        icon: checkmarkCircle,
                      });
                    })
                    .catch((error: Error) => {
                      console.error(error);
                      presentToast({
                        message: error.message,
                        duration: 2000,
                        icon: closeCircle,
                      });
                    });
                }}
              >
                POST SENSOR DATA
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
