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
  useIonToast,
  IonInput,
  IonLabel,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import "./Page.css";
import React, { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { Preferences, GetResult } from "@capacitor/preferences";
import { checkmarkCircle, closeCircle, lockClosed } from "ionicons/icons";
import { Sahha } from "sahha-capacitor";

const Authentication: React.FC = (keyboard) => {
  const [presentToast, dismissToast] = useIonToast();
  const [appId, setAppId] = useState<string>("");
  const [appSecret, setAppSecret] = useState<string>("");
  const [externalId, setExternalId] = useState<string>("");

  useEffect(() => {
    console.log("auth");
    getPrefs();
  }, []);

  const getPrefs = async () => {
    Preferences.get({ key: "@appId" }).then(
      (data: GetResult) => setAppId(data.value ?? ""),
      (error: Error) => console.error(error)
    );
    Preferences.get({ key: "@appSecret" }).then(
      (data: GetResult) => setAppSecret(data.value ?? ""),
      (error: Error) => console.error(error)
    );
    Preferences.get({ key: "@externalId" }).then(
      (data: GetResult) => setExternalId(data.value ?? ""),
      (error: Error) => console.error(error)
    );
  };

  const setPrefs = async () => {
    console.log("set prefs");
    Preferences.set({
      key: "@appId",
      value: appId,
    }).then(
      () => console.log("appId set"),
      (error: Error) => console.error(error)
    );
    Preferences.set({
      key: "@appSecret",
      value: appSecret,
    }).then(
      () => console.log("appSecret set"),
      (error: Error) => console.error(error)
    );
    Preferences.set({
      key: "@externalId",
      value: externalId,
    }).then(
      () => console.log("externalId set"),
      (error: Error) => console.error(error)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Authentication</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-text-center ion-margin-top">
          <IonIcon icon={lockClosed} size="large"></IonIcon>
        </div>
      </IonContent>

      <IonFooter>
        <IonItem>
          <IonLabel>App ID</IonLabel>
          <IonInput
            value={appId}
            placeholder="Input here"
            onIonChange={(e) => {
              setAppId(e.detail.value!);
              //Keyboard.hide();
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>
        <IonItem></IonItem>
        <IonItem>
          <IonLabel>App Secret</IonLabel>
          <IonInput
            value={appSecret}
            placeholder="Input here"
            onIonChange={(e) => {
              setAppSecret(e.detail.value!);
              //Keyboard.hide();
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>
        <IonItem></IonItem>
        <IonItem>
          <IonLabel>External ID</IonLabel>
          <IonInput
            value={externalId}
            placeholder="Input here"
            onIonChange={(e) => {
              setExternalId(e.detail.value!);
              //Keyboard.hide();
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>

        <IonItem></IonItem>

        <IonButton
          expand="block"
          onClick={() => {
            if (appId === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input an APP ID",
              });
            } else if (appSecret === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input an APP SECRET",
              });
            } else if (externalId === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input an EXTERNAL ID",
              });
            } else {
              setPrefs();
              Sahha.authenticate({
                appId: appId,
                appSecret: appSecret,
                externalId: externalId
              })
                .then((data) => {
                  console.log(`Success: ${data.success}`);
                  presentToast({
                    message: "Authentication Saved",
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
            }
          }}
        >
          SAVE
        </IonButton>
        <IonItem></IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Authentication;
