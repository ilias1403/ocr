# Image Exists [![npm Package](https://img.shields.io/npm/v/img-exists.svg)](https://www.npmjs.org/package/img-exists)
Check if remote image exists

## Features
 - Ping single remote image or an array of images
 - **Does not consume time and traffic downloading the whole image**
 - Cross browser (after Babel), pure vanilla js


## API

```javascript
ImageExists(input[, options], complete)
```

### input   
**Type**: _String_ | _Array_  
Single url, or an array of urls


### options.timeout   
**Type**: _Number_  
**Default**: `1000` ms   
Wait for a server response


### complete   
**Type**: _Function_  
Callback function   


## Usage   
```javascript
let images = [
   'https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png', 
   'https://assets.nationalgeographic.com/styleguide/stable/logos/ng-logo-2fl.svg', 
   'https://royalmail.com/sites/all/themes/royalmail2017/img/royalmail-logo.png',
   'https://avatars3.githubusercontent.com/u/18248992?s=40&v=4'
];

ImageExists(images, { timeout: 1000 }, (err, result) => {
   if(err){
      // ...
   }

   // ...
});
```
