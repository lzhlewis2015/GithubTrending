import { step0 } from 'react-native/Libraries/Animated/src/Easing'
import Types from '../../action/types'

const defualtStates = {}

export default function onAction(state = defualtStates, action) {
    
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//此次要展示的数据
                    pageIndex: action.pageIndex
                }
            }
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }

            }
            
        case Types.POPULAR_REFEESHING:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            }
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex

                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                }
            }
        default:
            return state  
    }


}