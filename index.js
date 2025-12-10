const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Initialize DOMPurify with a fake window object created by JSDOM
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Sanitizes a dirty HTML string.
 * @param {string} dirtyHtml - The HTML string to be cleaned.
 * @param {object} options - (Optional) DOMPurify configuration options.
 * @returns {string} - The cleaned HTML.
 */
function sanitize(dirtyHtml, options = {}) {
    if (!dirtyHtml) return "";
    
    // Allow users to pass custom configuration, or use defaults
    return DOMPurify.sanitize(dirtyHtml, options);
}

module.exports = sanitize;
