const initState = {
    userInfo:{
        role:null,
        token:null,
        origin_id:'',
        origin_type:null,
    },
    authError:null,
    loading:false,
}

const authReducer = (state = initState,action) => {
    const Action  = action.action;
    switch(action.type){
        case'Loading':
        return state = {
            ...state,
            loading:true
        }
        case 'Login_Error':
            return state = {
                ...state,
                authError: action.action,
                loading:false,
            }
        case 'Login_Success':
            localStorage.setItem("token",Action.token)
            return state = {
                userInfo: {...Action},
                authError:null,
                loading:false,
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
