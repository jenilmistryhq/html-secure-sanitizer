// test-automated.js
const sanitize = require('./index.js');
const assert = require('assert');

// --- Define Core Test Cases for CI ---
const tests = [
    // Test 1: Malicious Script Tag (Core XSS Test)
    {
        input: 'Hello, <script>alert("XSS")</script><b>World</b>',
        expected: 'Hello, <b>World</b>',
        description: 'Should remove script tags but keep safe HTML.'
    },
    // Test 2: Dangerous Attributes (XSS via event handlers)
    {
        input: '<img src=x onerror=alert(1)><a href="javascript:alert(1)">Link</a>',
        expected: '<img src="x"><a>Link</a>', // DOMPurify cleans up quotes/strips handlers/strips javascript: urls
        description: 'Should strip onerror attributes and javascript: URLs.'
    },
    // Test 3: Safe HTML Check
    {
        input: '<h2>A Safe Header</h2><p>A safe paragraph with <i>italics</i>.</p>',
        expected: '<h2>A Safe Header</h2><p>A safe paragraph with <i>italics</i>.</p>',
        description: 'Should keep standard, non-malicious tags.'
    }
];

// --- Run Tests ---
let failures = 0;
console.log('--- Running Automated CI Tests ---');

tests.forEach((test, index) => {
    // Trim the output to prevent issues with leading/trailing whitespace
    const actual = sanitize(test.input).trim(); 
    
    try {
        // Use Node's built-in assertion module to compare the clean output against the expected secure output
        assert.strictEqual(actual, test.expected, `\n\tExpected: ${test.expected}\n\tActual:   ${actual}`);
        console.log(`✅ Test ${index + 1} (${test.description}) Passed.`);
    } catch (error) {
        console.error(`❌ Test ${index + 1} (${test.description}) Failed:`);
        // Log only the failure reason
        console.error(error.message);
        failures++;
    }
});

console.log(`\n--- Test Summary ---`);
if (failures > 0) {
    console.error(`🔴 ${failures} test(s) FAILED. Automation Job will fail.`);
    // Exit code 1 tells the CI job to fail (show a red X on GitHub)
    process.exit(1); 
} else {
    console.log('🟢 All tests passed successfully! Automation Job will pass.');
    process.exit(0);
}