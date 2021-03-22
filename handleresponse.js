exports.handleResponse=(req,res,status,message,result)=>{
   
    switch(status){
      case 200:  return res.status(200).send(result);
                 
      case 400:  return res.status(400).send(message);
                 
    }

}