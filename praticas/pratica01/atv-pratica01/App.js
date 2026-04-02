import { StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DespesasRecente from "./screens/DespesasRecentes";
import TodasDespesas from "./screens/TodasDespesas";
import GerenciarDespesa from "./screens/GerenciarDespesas";
import { Ionicons } from '@expo/vector-icons';
import IconButton from "./components/IconButton";
import { useNavigation } from "expo-router";

export default function App(){

    //Navigator auxiliar, de bottom tab
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation;

    function BottomTabScreen (){
        return(
            <Tab.Navigator 
            screenOptions= {( {navigation} ) => ({ headerRight: () => 
            <IconButton icon="add" size={24} onPress={() => {
                navigation.navigate('GerenciarDespesa')
            }} /> }) }>

                <Tab.Screen name ="DespesasRecentes" component={DespesasRecente}
                    options={{tabBarIcon: ({color, size}) => (<Ionicons name ="hourglass"
                    size={size} color={color} />),
                    tabBarLabel: 'Recentes',
                    title: 'Despesas Recentes',
                    tabBarLabelStyle: {fontSize: 12}}}
                />
                <Tab.Screen name ="TodasDespesas" component={TodasDespesas}
                    options={{tabBarIcon: ({color, size}) => (<Ionicons name ="wallet-outline"
                    size={size} color={color} />),
                    tabBarLabel: 'Todas',
                    title: 'Todas as Despesas',
                    tabBarLabelStyle: {fontSize: 12}}}
                />
            </Tab.Navigator>
        );
    }

    //Navigator principal, de pilha
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name ="Despesas" component={BottomTabScreen} 
                    options = {{headerShown: false}}/>
                <Stack.Screen name ="GerenciarDespesas" component={GerenciarDespesa} />
            </Stack.Navigator>
        </NavigationContainer>
    );}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});