import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      
      <Text style={styles.emptyListText}>Nenhuma tarefa adicionada ainda.</Text>
      
    )}
    contentContainerStyle={styles.flatListContext}

    />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingTop:50, //ajuste para a barra de status
    paddingBottom: 15,
    borderBottomWidth:1,
    borderBottomColor:"rgba(0,0,0,0.1)"
  },
  topBarTitle:{
    fontSize:24,
    fontWeight: "bold",
  },
  card:{
    margin:20,
    borderRadius:15,
    padding:20,
    shadowOffset:{ width: 0, height: 4},
    shadowOpacity: 0.2,
    elevation: 10,
    shadowColor: "#000",
  },
  input:{
    borderWidth:1,
    borderRadius: 15,
    padding: 20,
    fontSize:18,
    marginBottom:10,
  },
  addButton:{
    paddingVertical:12,
    borderRadius:10,
    alignItems:"center"
  },
  buttonText:{
    color:"#fff",
    fontSize: 18,
    fontWeight:"bold",
  },
  flatListContext:{
    paddingBottom: 10, //espaçamento no final da lista
  },
  taskItem:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderRadius:10,
    padding:15,
    marginVertical:10,
    marginHorizontal:15,
    shadowOffset:{ width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",
    color: "#333",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
