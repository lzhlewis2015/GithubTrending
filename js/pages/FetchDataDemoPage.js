import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import DataStore from '../expand/dao/DataStore'

export default class FetchDataDemoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
        this.value = ''
        this.dataDtore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataDtore.fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })

    }

    render() {
        console.log('render lala')
        return <View style={styles.container}>
                <View style = {styles.textInputView}>
                    <TextInput style= {styles.input}
                        placeholder= {'please enter your url'}
                        onChangeText = { (text) => {
                            this.value = text
                        }
                        }
                    />
                    <Button
                        title = {'Fetch'}
                        onPress = { ()=>{
                            this.loadData()
                        }
                        }
                    />
                </View>
                <Text>{this.state.showText} </Text>
            </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputView: {
        flexDirection: 'row'
    },
    input: {
        flex: 1
    }


})

