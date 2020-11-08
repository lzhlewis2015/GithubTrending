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
// import { FlatList } from 'react-native-gesture-handler';

type Props = {}

const CITY_NAMES = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨'];

export default class FlatListPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            dataArray: CITY_NAMES,
            isLoading: false
        }
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }

    getIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                animating={true}
                size='large'
                color='red'
            >
            </ActivityIndicator>
            <Text>正在加载中 </Text>
        </View>
    }

    loadData(refresh) {
        if (refresh) {
            this.setState({
                isLoading: true
            });
        }
        setTimeout(() => {
            let dataArray = [];
            if (refresh) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i])
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }
            this.setState({
                dataArray: dataArray,
                isLoading: false
            });
        }, 2000);
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={(data => this._renderItem(data))}
                        keyExtractor={(item) => item.id}
                        refreshing={this.state.isLoading}
                        // onRefresh = { () => {
                        //     this.loadData(true)
                        // }}
                        refreshControl={
                            <RefreshControl
                                title='refresh'
                                colors={['red']}
                                refreshing={this.state.isLoading}
                                onRefresh={() => {
                                    this.loadData(true)
                                }}
                            >
                            </RefreshControl>
                        }
                        ListFooterComponent={() => this.getIndicator()}
                        onEndReached={
                            () => { this.loadData(false) }
                        }
                    />

                </View>
            </>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
