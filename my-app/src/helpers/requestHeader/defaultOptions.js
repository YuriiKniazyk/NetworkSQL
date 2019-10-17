const defaultOptions = {
        
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    },
  };
  
  export default defaultOptions;