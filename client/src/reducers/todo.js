const InitialState={
    todos:[]
};

const TodoReducer=(state=InitialState,action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return{
                ...state,
                todos:action.payload,
                /* ids:[...state.ids,action.payload.id],
                completed:[...state,false] */
               };
        case 'DELETE_TODO':
            return{
                ...state,
                todos:state.todos.filter(todo=>todo.id!==action.payload.id)
    
            };
        default:
            return state
    }
}

export default TodoReducer;