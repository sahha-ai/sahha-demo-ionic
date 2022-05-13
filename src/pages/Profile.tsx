import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonFooter,
  IonLabel,
  IonInput,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonPicker,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./Page.css";
import React, { useEffect, useState } from "react";
import { NativeStorage } from "@awesome-cordova-plugins/native-storage";
import { checkmarkCircle, closeCircle, person } from "ionicons/icons";
import { Sahha, SahhaDemographic } from "sahha-capacitor";

const Profile: React.FC = () => {
  const [presentToast, dismissToast] = useIonToast();
  const [presentPicker] = useIonPicker();
  const [age, setAge] = useState<string>("");
  const [ageNumber, setAgeNumber] = useState<number>();
  const [gender, setGender] = useState<string>("Male");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    console.log("profile");
    getPrefs();
  }, []);

  useEffect(() => {
    let ageInt = parseInt(age);
    if (ageInt) {
      setAgeNumber(ageInt);
    } else {
      setAge("");
    }
  }, [age]);

  const getPrefs = async () => {
    NativeStorage.getItem("@age").then(
      (data: string) => setAge(data),
      (error: Error) => console.error(error)
    );
    NativeStorage.getItem("@gender").then(
      (data: string) => setGender(data),
      (error: Error) => console.error(error)
    );
    NativeStorage.getItem("@country").then(
      (data: string) => setGender(data),
      (error: Error) => console.error(error)
    );
  };

  const setPrefs = async () => {
    console.log("set prefs");
    NativeStorage.setItem("@age", age).then(
      () => console.log("age set"),
      (error: Error) => console.error(error)
    );
    NativeStorage.setItem("@gender", gender).then(
      () => console.log("gender set"),
      (error: Error) => console.error(error)
    );
    NativeStorage.setItem("@country", country).then(
      () => console.log("country set"),
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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-text-center ion-margin-top">
          <IonIcon icon={person} size="large"></IonIcon>
        </div>
      </IonContent>

      <IonFooter>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonInput
            inputmode="numeric"
            maxlength={3}
            value={age}
            placeholder="Input a number"
            onIonChange={(e) => {
              setAge(e.detail.value!);
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>

        <IonItem></IonItem>

        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonSelect
            value={gender}
            placeholder="Select"
            onIonChange={(e) => setGender(e.detail.value)}
          >
            <IonSelectOption value="Male">Male</IonSelectOption>
            <IonSelectOption value="Female">Female</IonSelectOption>
            <IonSelectOption value="Gender Diverse">
              Gender Diverse
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem></IonItem>

        <IonItem>
          <IonLabel>Country Code</IonLabel>
          <IonInput
            inputmode="text"
            maxlength={2}
            value={country}
            placeholder="Input a 2 digit country code"
            onIonChange={(e) => {
              setCountry(e.detail.value!);
            }}
            clearInput={true}
            enterkeyhint="done"
          ></IonInput>
        </IonItem>
        <IonItem></IonItem>
        <IonButton
          expand="block"
          onClick={() => {
            if (age === "" || parseInt(age) === null) {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input a valid AGE",
              });
            } else if (gender === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to select a GENDER",
              });
            } else if (country === "") {
              presentToast({
                buttons: [{ text: "OK", handler: () => dismissToast() }],
                message: "You need to input a 2 digit COUNTRY CODE",
              });
            } else {
              setPrefs();
              presentToast({
                message: "Profile Saved",
                duration: 2000,
                icon: checkmarkCircle,
              });

              const demographic: SahhaDemographic = {
                age: parseInt(age),
                gender: gender,
                country: country,
              };

              Sahha.postDemographic({ demographic: demographic })
                .then((data) => {
                  console.log(`Success: ${data.success}`);
                })
                .catch((error: Error) => {
                  console.error(error);
                });
            }
          }}
        >
          SAVE
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => {
            Sahha.getDemographic()
              .then((data) => {
                console.log(data.value);
                presentToast({
                  message: data.value,
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
          FETCH
        </IonButton>
        <IonItem></IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
