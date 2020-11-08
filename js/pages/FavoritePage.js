
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import NavigationUtils from '../navigators/NavigationUtils'

type Props = {}

export default class FavoritePage extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Button
                    title='修改tintColor主题'
                    onPress={() => {
                        navigation.setParams(
                            {
                                theme: {
                                    tintColor: 'red',
                                    updateTime: new Date().getTime()
                                }
                            }
                        )
                    }}
                />
                <Button
                    title={'跳转到FetchData页'}
                    onPress={() => {
                        NavigationUtils.goPage({
                            navigation: this.props.navigation
                        }, "FetchDataDemoPage")
                    }}></Button>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        height: 200,
        backgroundColor: '#169',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
