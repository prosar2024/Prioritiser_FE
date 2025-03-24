class HTTPUtil {
    static async request(url : string, method : string = "POST", body : any = null, add_header : boolean = true ) {
      const headers = {};
  
      headers['Content-Type'] = 'application/json';
      if (add_header) {
        let token = localStorage.getItem('token')
        let email = localStorage.getItem('email')
        if(token == undefined || token == "" || token == null || email == undefined || email == "" || email == null){
          console.log("No token / email. Inn=valid Session")
          window.location.href = '/login?msg=Invalid Session. Please Login';
          return; // Prevent further processing
        }else{
          headers['token'] = token;
          headers['email'] = email;
        }
      }
  
      const options = {
        method,
        headers,
      };
  
      if (body && method == "POST") {
        options.body = body;
      }
  
      try {
        const response = await fetch(url, options);
  
        if (response.status === 401) {
          console.log("Session Expired. Notified from Backend. Status:401")
          window.location.href = '/login?msg=Invalid Session. Please Login';
          return; // Prevent further processing
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }
  
  export default HTTPUtil;
  