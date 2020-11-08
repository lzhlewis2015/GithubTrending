

export default class NavigationUtils {

    static goPage(parmas, page) {
        const navigation = NavigationUtils.navigation
        if (!navigation) {
            console.warn('do not have glob navigation yet')
            return
        }
        navigation.navigate(page,
            {
                ...parmas
            })
    }

    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
} 