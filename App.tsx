import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Image } from "react-native";
import CustomSplash from "./src/CustomSplash";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react-native";
import outputs from "./amplify_outputs.json";
import MainScreen from "./src/MainScreen";

Amplify.configure(outputs);

function LogoImage() {
  return (
    <Image
      source={{
        uri: "https://storage.googleapis.com/artifym/image_2024-06-09_071912442.png",
      }}
      style={styles.logo}
    />
  );
}

const App = () => {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Authenticator.Provider>
      {splash ? (
        <CustomSplash />
      ) : (
        <Authenticator
          Container={(props) => (
            <Authenticator.Container {...props} style={styles.authContainer} />
          )}
          Header={LogoImage}
        >
          {/* <CustomSplash /> */}
          <MainScreen />
        </Authenticator>
      )}
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 800,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default App;
