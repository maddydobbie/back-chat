import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor:'#FCA311',
    },
    logoLogin: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    icon: {
        width: 50,
        height: 50,
    },
    titleLogin: {
        fontSize: 35,
        color: '#14213D',
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#FCA311',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        textAlign: "center",
        justifyContent: "center",
        lineHeight: 25,
    },
    buttonForgotPwdText: {
        fontSize: 25,
        color: '#14213D',
        textAlign: "center",
        justifyContent: "center",
        marginTop: 15,
        lineHeight: 25,
        textDecorationLine: 'underline'
    },
    logoHome: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    title: {
        fontSize: 50,
        color: '#14213D',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 15,
        color: '#14213D',
        textAlign: "center",
    },
    buttonMain: {
        backgroundColor: '#14213D',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
    },
    buttonMainPress: {
        backgroundColor: '#0d1729',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
    },
    buttonLoginText: {
        fontSize: 25,
        color: 'white',
        textAlign: "center",
        justifyContent: "center",
        lineHeight: 25,
    },
    buttonHyperlink: {
        fontSize: 20,
        color: '#14213D',
        textAlign: "center",
        justifyContent: "center",
        marginTop: 15,
        lineHeight: 25,
        textDecorationLine: 'underline'
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginTop: 5,
        marginLeft: 36,
        marginRight: 36,
        marginBottom: 5,
    },
    formInput: {
        backgroundColor: '#E5E5E5',
        borderColor: '#14213D',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5,
        paddingVertical: 10,
    },
    buttonStartScreen: {
        backgroundColor: '#14213D',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
        width: 300,
    },
    chatBotBackground: {
        backgroundColor: '#14213D',
        marginTop: 30,
        width: 375,
        height: 600,
        borderRadius: 10,
    },
    chatBotItems: {
        backgroundColor: '#E5E5E5',
    },
    userTextItems: {
        backgroundColor: '#E5E5E5',

    },
    chatBotItem: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 5,
        width: '80%',
    },
    userItem: {
        backgroundColor: '#029cb8',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 5,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    chatBotText: {
        color: '#14213D',
        fontSize: 20,
    },
    chatBotContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    responseItemInner: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    responseContainer: {
        height: 60,
        width: 360,
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },
    responseItem: {
        backgroundColor: '#14213D',
        flex: 1,
        borderRadius: 10,
        marginRight:5,
        marginLeft: 5,
    },
    responseText: {
        color: '#E5E5E5',
    },
    responseButton: {
        backgroundColor: '#14213D',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    errorMsgContainer: {
        height: 20,
        width: 200
    }

});