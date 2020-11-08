import React, { Component } from 'react';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { createAppContainer } from 'react-navigation'
import PopularPage from '../pages/PopularPage';
import TrendingPage from '../pages/TrendingPage';
import FavoritePage from '../pages/FavoritePage';
import MyPage from '../pages/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux'

type Props = {};

const TABS = {//在这里配置页面的路由
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    TrendingPage:
    {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    }
    ,
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    }
    ,
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    }
};

class DynamicTabNavigator extends Component {

    constructor(props) {
        super(props)
        console.disableYellowBox = true
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs
        }
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tab = { PopularPage, TrendingPage, FavoritePage, MyPage }
        return this.Tabs = createAppContainer(createBottomTabNavigator(
            tab, {
            tabBarComponent: props => {
                return <TabBarComponenet
                    {...props} theme={this.props.theme} />
            }
        }
        ))
    }

    render() {
        const Tab = this._tabNavigator()
        return <Tab />
    }
}

class TabBarComponenet extends Component {

    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        const { routes, index } = this.props.navigation.state
        if (routes[index].params) {
            const { theme } = routes[index].params
            //
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme
            }
        }
        // {...this.props} 把之前TintColor 赋值给它， 然后单独覆盖activeTinColor的属性

        return <BottomTabBar
            {...this.props}
            activeTintColor={
                this.props.theme
            }
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)