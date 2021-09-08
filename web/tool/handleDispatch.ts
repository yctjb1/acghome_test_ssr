export const updateContext=(dispatch:any,obj:any)=>{
    if(!dispatch||!obj) return;
    dispatch({
        type: 'updateContext',
        payload: {
          ...obj
        }
      })
}