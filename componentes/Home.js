import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc, QuerySnapshot } from "firebase/firestore";

export default function Home({ navigation }) {

    const [criptos, setCriptos] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, "tb_moeda", id));
            Alert.alert("A criptomoeda foi deletada.")
        } catch (erro) {
            console.erro("Erro ao deletar.", error)
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'tb_moeda'), (QuerySnapshot) => {
            const lista =[];
            QuerySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            })
            setCriptos(lista);
        })
        return () => unsubcribe();
    }, []);

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.TituloAPP}>Lista de Criptomoedas</Text>
            </View>
            <FlatList
                data={criptos}
                renderItem={({ item }) => {
                    return (
                        <View style={estilo.CardCripto}>
                            <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                id: item.id,
                                nomeCripto: item.nomeCripto,
                                siglaCripto: item.siglaCripto,
                                valorCripto: item.valorCripto
                            })}>
                                <View>
                                    <Text style={estilo.textCripto}>Criptomoeda: <Text>{item.nomeCripto}</Text></Text>
                                    <Text style={estilo.textCripto}>Sigla: <Text>{item.siglaCripto}</Text></Text>
                                    <Text style={estilo.textCripto}>Valor: R$ <Text>{item.valorCripto}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => {deleteCripto(item.id) }}>
                                <Text>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")}>
            <Text>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TituloAPP: {
        marginTop: 50,
        fontSize: 30,
        color: '#77059F',
    },
    CardCripto: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    titulocriptos: {
        fontSize: 15,
        fontWeight: "bold"
    },
    criptos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#0000cd',
        borderRadius: 10
    },
    botaodeletar: {
        textAlignVertical: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        position: 'absolute',
        left: 20,
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})