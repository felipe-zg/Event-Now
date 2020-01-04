const uidReducer = (state =  '', action)=>{
    switch(action.type){
        case 'SETAR_UID':
            state = action.payLoad;
            return state;
        case 'RESETAR_UID':
            state = '';
            return state;
        default:
            return state;
    }
}

export default uidReducer;