/**
 * Format date to locale string
 * @param {Date|string} date 
 * @param {string} locale 
 * @returns {string}
 */
export const formatDate = (date, locale = 'pt-BR') => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Format currency
 * @param {number} value 
 * @param {string} currency 
 * @param {string} locale 
 * @returns {string}
 */
export const formatCurrency = (value, currency = 'BRL', locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Capitalize first letter
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 * @param {Object} obj 
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj 
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
