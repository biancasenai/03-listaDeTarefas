import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  // serve para alterar o tema ao clicar
  const [dark, setDark] = useState(false);

  // estado para armazenar as tarefas
  const [task, setTask] = useState([]);

  // estado para o texto da tarefa
  const [newtask, setNewtask] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        savedTasks && setTask(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(task));
      } catch (error) {
        console.error("Erro ao salvar tarefas", error);
      }
    };
    saveTasks();
  }, [task]);

  const addtask = () => {
    if (newtask.trim().length > 0) {
      setTask((prevtask) => [
        ...prevtask,
        {
          id: Date.now().toString(),
          text: newtask.trim(),
          completed: false,
        },
      ]);
      setNewtask("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Atenção", "Por favor informe uma tarefa");
    }
  };

  const toggleCompleteted = (id) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir essa tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            setTask((prev) => prev.filter((task) => task.id !== id)),
        },
      ]
    );
  };

  const renderList = ({ item }) => (
    <View
      style={[
        styles.taskItem,
        { backgroundColor: dark ? "#000" : "#fff" }, //cores dos determinados fundos 
      ]}
      key={item.id}
    >
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleCompleteted(item.id)}
      >
        <Text
          style={[
            styles.taskText,
            { color: dark ? "#fff" : "#333" },//se o tema estiver branco o texto é preto e assim ao contrario tbm
            item.completed && styles.completedTaskItem,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={[styles.taskText, { color: dark ? "#fff" : "#333" }]}>
          🗑️
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: dark ? "#121212" : "#e0f7fa" }, 
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: dark ? "#1e1e1e" : "#fff" },
        ]}
      >
        <Text
          style={[
            styles.topBarTittle,
            { color: dark ? "#fff" : "#051650" }, //texto do cabeçalho
          ]}
        >
          Minhas Tarefas
        </Text>
        <TouchableOpacity onPress={() => setDark(!dark)}>
          
          {/* emojis */}
          <Text>{dark ? "☀️" : "🌛"}</Text> 
        </TouchableOpacity>
      </View>

      {/* Campo de adicionar tarefa */}
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? "#1e1e1e" : "#fff" }, //container maior do add tarefa
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: dark ? "#2c2c2c" : "#fcfcfc", // cor caixa do texto
              color: dark ? "#fff" : "#333",
            },
          ]}
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor={dark ? "#aaa" : "#999"}  //cor texto
          value={newtask}
          onChangeText={setNewtask}
          onSubmitEditing={addtask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addtask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        style={styles.flatList}
        data={task}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        ListEmptyComponent={() => (
          <Text
            style={[
              styles.emptyListText,
              { color: dark ? "#aaa" : "#9e9e9e" }, //cor itens da lista
            ]}
          >
            Nenhuma tarefa adicionada ainda
          </Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style={dark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.1)",
  },
  topBarTittle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    borderColor: "#b0bec5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#123499",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10,
  },
  taskItem: {
    borderColor: "rgba(0,0,0, 0.1)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    flexWrap: "wrap",
  },
  completedTaskItem: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
