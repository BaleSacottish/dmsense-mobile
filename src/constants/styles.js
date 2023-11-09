import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 30,
        marginBottom: 15,
        width: 70,
        height: 70,
        marginHorizontal: 10
    },
    underline: {
        flexDirection: 'row',
        borderBottomColor: '#FFD3E9',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25
    },
    dateStyle: {
        textAlign: 'right',
        fontWeight: '700',
        fontSize: 16,
        width: 150,
        color: '#809BD0',
        marginHorizontal: 110
    },
    textinputStyle: {
        textAlign: 'right',
        fontWeight: '700',
        fontSize: 16,
        width: 100,
        color: '#809BD0',
        marginHorizontal: 100,
        marginTop: -10

    },
    textStyle: {
        textAlign: 'left',
        fontWeight: '700',
        fontSize: 17,
        width: 150,
        color: '#809BD0'
    },
    itemStyle: {
        textAlign: 'left',
        fontWeight: '700',
        fontSize: 15,
        width: 150,
        color: '#809BD0'
    }
    ,
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
        placeholderTextColor: '#809BD0'
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#809BD0'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})

export default styles;