import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
    render() {
        const { item } = this.props
        if (!item || !item.owner) return null
        let favoriteButton = <TouchableOpacity
            style={{ padding: 6 }}
            onPress={() => {
            }}
            underlayColor={'transparent'}
        >
            <FontAwesome
                name={'star-o'}
                size={26}
                style={{ color: 'red' }}
            />
        </TouchableOpacity>;
        return <TouchableOpacity
        onPress={this.props.onSelect}
        >
            <View style={styles.containerView}>
                <Text style={styles.title}> {item.full_name} </Text>
                <Text style={styles.description}> {item.description} </Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text> Author:</Text>
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={{ uri: item.owner.avatar_url }} />
                    </View>
                    <View style={styles.starView}>
                        <Text> Star: </Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>

        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        //  * @platform android side's shadow
        //  */
        elevation: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    starView: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
})
