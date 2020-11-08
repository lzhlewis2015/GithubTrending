import { createStackNavigator } from 'react-navigation-stack'
import FlatListPage from '../pages/FlatListPage'
import SectionListPage from '../pages/SectionListPage'
import WelcomePage from '../pages/WelcomePage'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import HomePage from '../pages/HomePage'
import DetailsPage from '../pages/DetailsPage'
import FetchDataDemoPage from '../pages/FetchDataDemoPage'

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage
        },
        DetailsPage: {
            screen: DetailsPage
        },
        FetchDataDemoPage: {
            screen: FetchDataDemoPage
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator
    }, {
        navigationOptions: {
            headerShown: false
        }
    }
    
))

