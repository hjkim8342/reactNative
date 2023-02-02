import { StatusBar } from "expo-status-bar";
import { Fragment, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModalIsVisible(false);
  };

  const deleteGoalHandler = (deleteGoalId) => {
    setCourseGoals((prev) => prev.filter((goal) => goal.id !== deleteGoalId));
  };

  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          ></FlatList>
        </View>
        <View style={styles.button}>
          <Button
            title="목표 추가"
            color="#f1e7ff"
            onPress={startAddGoalHandler}
          />
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  goalContainer: {
    flex: 5,
    marginBottom: 50,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#004379",
  },
});
