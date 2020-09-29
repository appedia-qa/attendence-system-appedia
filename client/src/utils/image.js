import { checkValidURL } from './strings';
import { baseUrl } from '../constants/urls';

/**
 * It accepts a parameter images
 * It can be JSON array, a single string or an array
 * It will always return an Array of images with valid url
 * 
 * @param {*} images 
 */
export const handleImageArray = (images) => {
 

  if(images) {
    try {
      if (typeof images === 'string') {

        images = JSON.parse(images);

        if (Array.isArray(images)) {
          return parseImageArray(images);
        }

        // There is a single image
        return validateImageURL(images);
      } else if (Array.isArray(images)) {
        return parseImageArray(images);
      }
    } catch(e) {
      return [validateImageURL(images)];      
    }
  }
  return [require('../assets/images/no-image.jpg')];
}

/**
 * It accepts an array of images and validate it
 * @param {Array} images 
 */

const parseImageArray = (images) => {
  return images.map(item => {
    return validateImageURL(item);
  })
}

export const validateImageURL = (url) => {
  if (!url) return require('../assets/images/no-image.jpg');
  if (checkValidURL(url)) { return url; }
  return `${baseUrl+'/products/'}` + url.replace(/\\/g, "")
}

