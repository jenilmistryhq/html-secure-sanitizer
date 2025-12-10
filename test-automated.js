const sanitize = require('./index.js');
const assert = require('assert');

console.log("--- Running Automated CI Tests ---");

// Test 1: Simple XSS script
const dirty1 = '<script>alert("XSS")</script><h1>Safe</h1>';
const expected1 = '<h1>Safe</h1>';
assert.strictEqual(sanitize(dirty1), expected1, "Test 1 Failed: Script tag removal");

// Test 2: Malicious attribute
const dirty2 = '<div onclick="fail()">Content</div>';
const expected2 = '<div>Content</div>';
assert.strictEqual(sanitize(dirty2), expected2, "Test 2 Failed: Attribute removal");

console.log("🟢 All automated tests passed successfully!");