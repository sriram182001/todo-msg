const initialState={
   loggedIn: false,
   userDetails:null
};

const Reducer=(state=initialState,action)=>{
    switch(action.type){
      case "CHECK_LOGIN":
          return{
              ...state,
              loggedIn:action.loggedIn
          };
      default:
           return state
    };
};
export default Reducer;