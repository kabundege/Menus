const { 
    REACT_APP_BASE_LAN_URL,
    // REACT_APP_BASE_WEB_URL 
} = process.env;

export const reqHandler = (url,method,payload,action) => {
    return async (dispatch,getState) => {
        let res ;
        
        dispatch({ type : 'Loading',action : {}})
    
        if(payload === undefined){
            res = fetch(`${REACT_APP_BASE_LAN_URL}${url}`,{ 
                method,
                headers: {
                    Accepted:'appication/json',
                    'Content-Type': 'application/json',
                    authorization : localStorage.getItem("token"),
                    },
             })
        }else{
            res = fetch(`${REACT_APP_BASE_LAN_URL}${url}`,{
                method,
                headers: {
                    Accepted:'appication/json',
                    'Content-Type': 'application/json',
                    authorization : localStorage.getItem("token"),
                    },
                body: JSON.stringify(payload)
            })
        }

        await res.then(res => res.json()).then(data=> {
            const { successStatus,actionName } = action;
        
            if(data.status !== successStatus){
                dispatch({ type : `${actionName}_Error`,action : data.message})
            }else{
                dispatch({ type :`${actionName}_Success`,action: data.data})
            } 
        });
    }
};