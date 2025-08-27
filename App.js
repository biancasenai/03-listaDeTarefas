import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.topBarTitle}>Minhas tarefas</Text>
        <TouchableOpacity>
          <Text> 🌛</Text>
        </TouchableOpacity>
      </View>
      {/* local onde o usuario insere as tarefas */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* lista de tarefa do usuario */}
      <FlatList
        style={styles.FlatList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma tarefa adicionada ainda.
          </Text>
        )}
        contentContainerStyle={styles.flatListContext}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: " #e0f7fa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    backgroundColor: "#fff ",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50, //ajuste para a barra de status
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  topBarTitle: {
    color: " #00796b",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor:"#fff",
    color: "#000",
    shadowColor: "#000",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: "#000",
  },
  input: {
    backgroundColor:" #fcfcfc ",
    color:"#333",
    borderColor:"#b0bec5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor:" #009608",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContext: {
    paddingBottom: 10, //espaçamento no final da lista
  },
  taskItem: {
    backgroundColor: "#fff",
    color: "#333",
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
  },
  taskTextContainer:{
    flex: 1, //permite que o texto ocupe o espaço dispponivel
    marginRight: 10,
  },
  taskText:{
    color:"#333",
    fontSize: 18,
    flexWrap: "wrap" //permite que o texto quebre linha
  },
  completedTaskItem:{
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  deleteButton:{
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText:{
   color: "#fff",
    fontSize: 22,
    fontWeight:"bold"
  },
  emptyListText:{
    color:" #9e9e9e",
    textAlign:"center",
    marginTop:50,
    fontSize:16,
  },

});
