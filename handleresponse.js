global.handleResponse=(req,res,status,err,result)=>{
   
    switch(status){
      case 200:  return res.status(200).result(result);
                 
      case 400:  return res.status(400).result(err);
                 
    }

}