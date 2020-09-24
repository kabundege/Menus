const initState = {
    userInfo:{
        role:null,
        token:null,
        origin_id:'',
        origin_type:null,
    },
    authError:null,
    loading:false,
    userCreated:false
}

const authReducer = (state = initState,action) => {
    const Action  = action.action;
    switch(action.type){
        case'Loading':
            return state = {
                ...state,
                loading:true,
                userCreated:false,
            }
        case'Stop_Loading':
            return state = {
                ...state,
                loading:false
            }
        case 'CreateUser_Error':
            return state = {
                ...state,
                authError:Action
            }
        case 'Login_Error':
            return state = {
                ...state,
                authError: action.action,
            }
        case 'Login_Success':
            localStorage.setItem("token",Action.token)
            return state = {
                userInfo: {...Action},
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
            sessionStorage.removeItem("cart")
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
