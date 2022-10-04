import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Main from "./pages/Main";
import Authentication from "./pages/Authentication";
import Analyzation from "./pages/Analyzation";
import Sensors from "./pages/Sensors";
import Profile from "./pages/Profile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import {
  Sahha,
  SahhaSensor,
  SahhaSensorStatus,
  SahhaEnvironment,
  SahhaSettings,
} from "sahha-capacitor";

setupIonicReact();

const App: React.FC = () => {
  /*
  const settings: SahhaSettings = {
    environment: SahhaEnvironment.production,
    sensors: [SahhaSensor.sleep],
    postSensorDataManually: true,
  };
*/

  const settings: SahhaSettings = {
    environment: SahhaEnvironment.development,
  };

  Sahha.configure({ settings: settings })
    .then((data: any) => {
      console.log(`Success: ${data.success}`);
    })
    .catch((error: Error) => {
      console.error(error);
    });

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/main" />
            </Route>
            <Route path="/main" component={Main} />
            <Route path="/authentication" component={Authentication} />
            <Route path="/profile" component={Profile} />
            <Route path="/sensors" component={Sensors} />
            <Route path="/analyzation" component={Analyzation} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
