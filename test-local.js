const sanitize = require('./index.js');

// Grab the input from the command line (arguments start at index 2)
const inputString = process.argv[2];

if (!inputString) {
    console.error("❌ Error: Please provide an HTML string to sanitize.");
    console.log("Usage: node test-local.js '<script>alert(1)</script><h1>Hello</h1>'");
    process.exit(1);
}

console.log("--- Frontend Sanitizer Test ---");
console.log(`Input (Dirty):  ${inputString}`);

// We can also test passing options (e.g., allowing specific tags)
// For this test, we stick to default secure settings.
const cleanHtml = sanitize(inputString);

console.log(`Output (Clean): ${cleanHtml}`);
console.log("-------------------------------");