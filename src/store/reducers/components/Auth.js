const initState = {
    userInfo:{
        role:null,
        token:null,
        origin_id:'',
        origin_type:null,
    },
    authError:null,
    loading:false,
    userCreated:false,
    Network_Error:false,
}

const authReducer = (state = initState,Action) => {
    const { type,action } = Action;
    switch(type){
        case'Loading':
            return state = {
                ...state,
                loading:true,
                userCreated:false,
                Network_Error:false
            }
        case'Stop_Loading':
            return state = {
                ...state,
                loading:false
            }
        case'Network_Error':
            return state = {
                ...state,
                loading:false,
                Network_Error:true
            }
        case 'CreateUser_Error':
            return state = {
                ...state,
                authError:action
            }
        case 'Login_Error':
            return state = {
                ...state,
                authError: action,
            }
        case 'Login_Success':
            localStorage.setItem("token",action.token)
            return state = {
                userInfo: {...action},
                authError:null,
            }
        case 'CreateUser_Success':
            return state = {
                ...state,
                authError:null,
                userCreated:true
            }
        case 'Logout':
            localStorage.removeItem("token")
            sessionStorage.removeItem("table")
            return state = {
                userInfo:{
                    role:null,
                    token:null,
                    origin_id:null,
                    origin_type:null,
                },
                authError:null,
                loading:false,
            }
        default:
            return state
    }
}

export default authReducer
