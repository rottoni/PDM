import {View, Text} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import DespesaItem from './DespesaItem'

function renderDespesaLista(itemData){

    return (
        <View>
            <Text>{itemData.item.descricao}</Text>
            <Text>{itemData.item.valor}</Text>
        </View>
    )
}

function DespesaLista({despesas}){

    return (
        <FlatList data={despesas}
        renderItem={DespesaItem}
        keyExtractor={(item) => item.id} />
    )
}

export default DespesaLista
