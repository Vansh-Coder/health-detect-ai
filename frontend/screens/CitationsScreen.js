import { View, Text, StyleSheet, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";

const modelSourceLink = "https://huggingface.co/openai/clip-vit-base-patch32";

const CitationsScreen = () => {
  const SOURCES_DISEASE = {
    acne: {
      label: "Acne",
      url: "https://www.mayoclinic.org/diseases-conditions/acne/symptoms-causes/syc-20368047",
    },
    eczema: {
      label: "Eczema",
      url: "https://medlineplus.gov/eczema.html",
    },
    psoriasis: {
      label: "Psoriasis",
      url: "https://www.aad.org/public/diseases/psoriasis/what",
    },
    rash: {
      label: "Rash",
      url: "https://medlineplus.gov/rashes.html",
    },
    infection: {
      label: "Infection",
      url: "https://medlineplus.gov/skininfections.html",
    },
    "allergic reaction": {
      label: "Allergic Reaction",
      url: "https://medlineplus.gov/ency/article/000869.htm",
    },
  };

  const SOURCES_INJURY = {
    bruise: {
      label: "Bruise",
      url: "https://www.mayoclinic.org/first-aid/first-aid-bruise/basics/art-20056663",
    },
    cut: {
      label: "Cut",
      url: "https://medlineplus.gov/ency/article/000043.htm",
    },
    laceration: {
      label: "Laceration",
      url: "https://medlineplus.gov/ency/imagepages/19616.htm",
    },
    swelling: {
      label: "Swelling",
      url: "https://medlineplus.gov/ency/article/003103.htm",
    },
    abrasion: {
      label: "Abrasion",
      url: "https://www.healthline.com/health/abrasion",
    },
    hematoma: {
      label: "Hematoma",
      url: "https://medlineplus.gov/ency/article/000713.htm",
    },
    burn: {
      label: "Burn",
      url: "https://www.mayoclinic.org/first-aid/first-aid-burns/basics/art-20056649",
    },
  };

  const showToast = (text) => {
    Toast.show({
      type: "info",
      text1: text,
      position: "top",
      topOffset: 60,
      text1Style: {
        fontSize: RFValue(13),
        fontWeight: "600",
      },
    });
  };

  const handleSourceLink = async (sourceLink) => {
    try {
      const supported = await Linking.canOpenURL(sourceLink);

      if (supported) {
        await Linking.openURL(sourceLink);
      } else {
        showToast("Error opening link, try again later !");
      }
    } catch (error) {
      showToast("Error opening link, try again later !");
      console.log("Error occured:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Citations</Text>
        </View>
        <View style={styles.modelCitationContainer}>
          <Text style={styles.modelCitationTitleText}>
            Model :{" "}
            <Text style={styles.modelCitationContentText}>
              Zero-Shot Image Classifier powered by OpenAI's CLIP
              (ViT-Base-Patch32)
            </Text>
          </Text>
          <Text style={styles.modelCitationTitleText}>
            Paper :{" "}
            <Text style={styles.modelCitationContentText}>
              Radford et al., "Learning Transferable Visual Models From Natural
              Language Supervision," ICML 2021
            </Text>
          </Text>
          <Text style={styles.modelCitationTitleText}>
            Code & Weights :{" "}
            <Text
              style={styles.sourceLink}
              onPress={() => handleSourceLink(modelSourceLink)}
            >
              Hugging Face - openai/clip-vit-base-patch32
            </Text>
          </Text>
        </View>
        <View style={styles.sourceTitleContainer}>
          <Text style={styles.sourceTitleText}>Source Links</Text>
        </View>
        <View style={styles.sourceColumnContainer}>
          <View style={styles.sourceColumn}>
            {Object.values(SOURCES_DISEASE).map((src) => (
              <Text
                key={src.label}
                style={styles.sourceLink}
                onPress={() => handleSourceLink(src.url)}
              >
                {src.label}
              </Text>
            ))}
          </View>
          <View style={styles.sourceColumn}>
            {Object.values(SOURCES_INJURY).map((src) => (
              <Text
                key={src.label}
                style={styles.sourceLink}
                onPress={() => handleSourceLink(src.url)}
              >
                {src.label}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  modelCitationContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modelCitationTitleText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    marginBottom: 15,
  },
  modelCitationContentText: {
    fontSize: RFValue(15),
    fontWeight: "500",
  },
  sourceTitleContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  sourceTitleText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginVertical: 20,
  },
  sourceColumnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  sourceColumn: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sourceLink: {
    fontSize: RFValue(15),
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "blue",
    marginBottom: 5,
  },
});

export default CitationsScreen;
