import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importando as telas
import DespesaRecentes from '../screens/DespesaRecentes';
import TodasDespesas from '../screens/TodasDespesas';
import GerenciarDespesa from '../screens/GerenciarDespesa';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Tela de Despesas Recentes */}
        <Tab.Screen name="DespesaRecentes" component={DespesaRecentes} />
        
        {/* Tela de Todas as Despesas */}
        <Tab.Screen name="TodasDespesas" component={TodasDespesas} />
        
        {/* Tela de Gerenciamento de Despesas */}
        <Tab.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
