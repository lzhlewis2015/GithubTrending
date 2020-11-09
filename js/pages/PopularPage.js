
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
    ActivityIndicator,
} from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import NavigationUtils from '../navigators/NavigationUtils'
import { connect } from 'react-redux'
import actions from '../action'
import PopularItem from '../common/PopularItem'
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

    _renderItem(data) {
        const item = data.item
        return <PopularItem
            item = {item}
            onSelect = { () => {
                console.log('tap on select')
            }
            }
        >
        </PopularItem>
    }

    render() {
        const { popular } = this.props

        let store = popular[this.storeName]
        if (!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return <View style={styles.container}>
                 <FlatList
                data = {store.items}
                renderItem = {data => this._renderItem(data)}
                keyExtractor = {item => "" + item.id} 
                refreshControl= {
                    <RefreshControl
                        title = {'Loading'}
                        titleColor= {THEME_COLOR}
                        colors = {THEME_COLOR}
                        isLoading = {store.isLoading}
                        tintColor = {THEME_COLOR}
                    />
                }
                />
            </View>
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
});

const PopularTabConnect = connect(mapStateToProps, mapDispatchToProps)(PopularPageTab)

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

