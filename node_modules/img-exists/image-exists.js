/*! 
 * Image Exists, https://tpkn.me
 */
"use strict";
function ImageExists(input, options, complete){
   if(typeof input !== 'string' && !Array.isArray(input)){
      throw new TypeError('No input data');
   }
   if(typeof cb !== 'function' && typeof options !== 'function'){
      throw new TypeError('No callback function');
   }

   // Make 'options' optional
   if(typeof options === 'function'){
      complete = options;
   }


   function Request(url, options, next){
      let { timeout = 1000 } = options;

      let request = new XMLHttpRequest();
      request.timeout = timeout;
      request.open('HEAD', url);

      request.onreadystatechange = function(){
         if(request.readyState != 4) return;
         if(request.status != 200){
            next(true, url);
            return
         }
         
         next(null, url);
      }

      request.send();
   }

   if(Array.isArray(input)){
      let done = 0;
      let results = [];

      for (let i = 0, len = input.length; i < len; i++) {
         Request(input[i], options, (err, result) => {
            done++;
            if(!err){
               results.push(result);
            }
            if(done == input.length){
               complete(null, results);
            }
         });
      }

   }else{
      Request(input, options, complete);
   }
}


if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
   module.exports = ImageExists;
}else{
   if(typeof define === 'function' && define.amd){
      define([], function(){
         return ImageExists;
      });
   }else{
      window.ImageExists = ImageExists;
   }
}
