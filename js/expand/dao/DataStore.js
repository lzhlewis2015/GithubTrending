import { AsyncStorage }from 'react-native'

export default class DataStore {

    static checkTimestampValid(timeStamp) {
        const currectDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timeStamp)
        if (currectDate.getMonth() !== targetDate.getMonth()) return false
        if (currectDate.getDate() !== targetDate.getDate()) return false
        if (currectDate.getHours() - targetDate.getHours() > 4) return false
        return true
    }

    fetchData(url) {
        return new Promise((resolve, reject) =>{
            this.fetchLocalData(url)
            .then ((wrapData) =>{
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    
                    resolve(wrapData)
                } else {
                    this.fetchNetworkData(url).then((data) => {
                        resolve(this._wrapData(data))
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    }

    fetchNetworkData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('network response is not ok')
                }).then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData)
                })
                .catch ((error) => {
                    reject(error)
                })
        })
    }

    _wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    saveData(url, data, callback) {
        if (!url || !data) return
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    fetchLocalData(url) {
        return new Promise((resolve, rejct) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (error) {
                        reject(error)
                    }
                } else {
                    reject(error)
                    console.log(error)
                }

            })
        })
    }

}