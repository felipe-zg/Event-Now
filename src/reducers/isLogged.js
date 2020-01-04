const isLoggedReducer = (state =  false, action)=>{
    switch(action.type){
        case 'LOGAR':
            return true;
        case 'DESLOGAR':
            return false;
        default:
            return state;
    }
}

export default isLoggedReducer;