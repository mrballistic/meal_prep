const { createCanvas } = require('canvas');
const fs = require('fs');

// Create a 32x32 canvas
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Set white background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 32, 32);

// Draw the emoji
ctx.font = '28px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('🍴', 16, 16);

// Add a border
ctx.strokeStyle = '#666';
ctx.lineWidth = 1;
ctx.strokeRect(0, 0, 32, 32);

// Convert to PNG buffer
const buffer = canvas.toBuffer('image/png');

// Save the PNG
fs.writeFileSync('public/favicon.png', buffer);

console.log('Favicon PNG generated');
