import {Text} from 'react-native'
import DespesaSaida from '../components/despesa/DespesaSaida';

function DespesasRecentes(){

    function filtrarUltimo7Dias(despesas) {
        const hoje = new Date();
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(hoje.getDate() - 7);

        return despesas.filter(despesa => {
            return despesa.data >= seteDiasAtras && despesa.data <= hoje;
        });
    }

    const TesteDeDespesas = [
        {
            id: '1',
            descricao: 'Conta de Luz',
            valor: 100.99,
            data: new Date(2025,2,11)
        },
        {
            id: '2',
            descicao: 'Conta de Água',
            valor: 40.99,
            data: new Date(2025,4,10)
        }
    ]

    return (
        <DespesaSaida despesas={filtrarUltimo7Dias(TesteDeDespesas)} periodo={'Ultimos 7 dias'}/>
    );
}

export default DespesasRecentes