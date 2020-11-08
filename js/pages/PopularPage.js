
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

import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import NavigationUtils from '../navigators/NavigationUtils'
import { connect } from 'react-redux'
import actions from '../action'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

type Props = {}

const tabs = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP']

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
    }

    _getTabs() {
        let tab = {}
        console.log('come here ma')
        tabs.forEach((value, index) => {
            tab[`tab${index}`] = {
                screen: (props) => <PopularTabConnect {...props} tabLabel={value} />,
                navigationOptions: {
                    title: value
                }
            }
        })
        return tab
    }
    render() {
        const { navigation } = this.props
        const Tab = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#678'
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                }
            }
        ))

        return <Tab />
    }
};

class PopularPageTab extends React.Component {

    constructor(props) {
        super(props)
        const { tabLabel } = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const { onLoadPopularData } = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url)
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    render() {

        // const { popular } = this.props
        console.log('popular~~', this)
        // const name = popular[this.storeName]
        return <View style={styles.container}>
            <Text> tabbar label {name} </Text>
            <Text onPress={() => {
                // NavigationUtils.goPage({
                //     navigation: this.props.navigation
                // }, "DetailsPage")
            }}>跳转到详情页</Text>

        </View>
    }
}

// const mapStateToProps = state => ({
//     popular: state.popular
// });
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
});

const PopularTabConnect = connect(null, mapDispatchToProps)(PopularPageTab)

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
    },

    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6

    }
});

