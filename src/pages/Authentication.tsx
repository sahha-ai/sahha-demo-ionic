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
  const [profileToken, setProfileToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    console.log("auth");
    getPrefs();
  }, []);

  const getPrefs = async () => {
    Preferences.get({ key: "@profileToken" }).then(
      (data: GetResult) => setProfileToken(data.value ?? ""),
      (error: Error) => console.error(error)
    );
    Preferences.get({ key: "@refreshToken" }).then(
      (data: GetResult) => setRefreshToken(data.value ?? ""),
      (error: Error) => console.error(error)
    );
  };

  const setPrefs = async () => {
    console.log("set prefs");
    Preferences.set({
      key: "@profileToken",
      value: profileToken,
    }).then(
      () => console.log("profileToken set"),
      (error: Error) => console.error(error)
    );
    Preferences.set({
      key: "@refreshToken",
      value: refreshToken,
    }).then(
      () => console.log("refreshToken set"),
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
          <IonLabel>Profile Token</IonLabel>
          <IonInput
            value={profileToken}
            placeholder="Input here"
            onIonChange={(e) => {
              setProfileToken(e.detail.value!);
              //Keyboard.hide();
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>
        <IonItem></IonItem>
        <IonItem>
          <IonLabel>Refresh Token</IonLabel>
          <IonInput
            value={refreshToken}
            placeholder="Input here"
            onIonChange={(e) => {
              setRefreshToken(e.detail.value!);
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
            if (profileToken === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input a PROFILE TOKEN",
              });
            } else if (refreshToken === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input a REFRESH TOKEN",
              });
            } else {
              setPrefs();
              Sahha.authenticate({
                profileToken: profileToken,
                refreshToken: refreshToken,
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
