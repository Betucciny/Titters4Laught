import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { genders, nationalities, mainColor, ages } from "./data";
import { getCurrentUser } from "aws-amplify/auth";
import { Image } from "expo-image";
import { generate } from "./functions";

interface ButtonProps {
  generateTweet(): void;
}

const Buttons = ({ generateTweet }: ButtonProps) => {
  const { signOut } = useAuthenticator();
  return (
    <View style={styles.signOutButton}>
      <Button
        title="Generate Tweet"
        onPress={generateTweet}
        color={mainColor.primary}
      />
      <Button title="Sign Out" color={mainColor.primary} onPress={signOut} />
    </View>
  );
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function MainScreen() {
  const [nationality, setNationality] = useState<string>(nationalities[0]);
  const [gender, setGender] = useState<string>(genders[0]);
  const [age, setAge] = useState<string>(ages[0]);
  const [tweet, setTweet] = useState<string>("Here will be a funny tweet!");

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      console.log(user.userId);
    };
    getUser();
  }, []);

  const generateTweet = () => {
    const tweet = generate(nationality, gender, age);
    setTweet(tweet);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: "https://storage.googleapis.com/artifym/image_2024-06-09_071912442.png"}}
        style={styles.logo}
        placeholder={{ blurhash }}
        contentFit="cover"
      />
      <View style={styles.tweetBox}>
        <Text style={styles.tweetText}>{tweet}</Text>
      </View>
      <View style={styles.preferenceSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.label}>Nationality:</Text>
        <Picker
          selectedValue={nationality}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) =>
            setNationality(itemValue)
          }
        >
          {nationalities.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) =>
            setGender(itemValue)
          }
        >
          {genders.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Text style={styles.label}>Age:</Text>
        <Picker
          selectedValue={age}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) =>
            setAge(itemValue)
          }
        >
          {ages.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Buttons generateTweet={generateTweet} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    alignSelf: "stretch",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tweetBox: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    maxWidth: 800,
    backgroundColor: "#f9f9f9",
  },
  tweetText: {
    fontSize: 16,
    textAlign: "center",
  },
  preferenceSection: {
    width: "100%",
    maxWidth: 800,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    maxWidth: 800,
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    padding: 10,
  },
  signOutButton: {
    alignSelf: "flex-end",
    rowGap: 10,
  },
});

export default MainScreen;
