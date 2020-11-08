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
                    items: action.items
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
                }
            }
        default:
            return state  
    }


}