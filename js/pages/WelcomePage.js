import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NavigationUtils from '../navigators/NavigationUtils'

export default class WelcomePage extends React.Component {

    componentDidMount() {
        this.timer = setTimeout(()=> {
            NavigationUtils.resetToHomePage(this.props)
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return <View style= {styels.container}>
                <Text> Welcome to our app </Text>
            </View>
    }
}

const styels = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

