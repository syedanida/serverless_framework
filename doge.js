'use strict';
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp'); // Using Jimp for adding text to the image
const s3 = new AWS.S3();

module.exports.create = async (event, context, cb) => {
  try {
    // Doge images - full path to the image
    const dogeImages = ['doge.jpg', 'doge1.jpg', 'doge2.jpg', 'doge3.jpg', 'doge4.jpg'];
    const randomImage = dogeImages[Math.floor(Math.random() * dogeImages.length)];
    const imagePath = path.join(__dirname, randomImage);  // Full path to the image

    // Load the selected Doge image
    console.log(`Loading image: ${imagePath}`);
    const image = await Jimp.read(imagePath);

    // Array of Doge-style random texts
    const dogeTexts = [
      'Much Wow',
      'So Lambda',
      'Such Cloud',
      'Very Serverless',
      'Wow',
      'Much AWS',
      'So Fast'
    ];

    // Randomly select 3 texts
    const randomTexts = [];
    while (randomTexts.length < 3) {
      const randomText = dogeTexts[Math.floor(Math.random() * dogeTexts.length)];
      if (!randomTexts.includes(randomText)) {
        randomTexts.push(randomText);
      }
    }

    // Get image dimensions
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;

    // Add each text to a random position on the image
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // Load font
    randomTexts.forEach(text => {
      const x = Math.floor(Math.random() * (imageWidth - 100)); // Random x position
      const y = Math.floor(Math.random() * (imageHeight - 50)); // Random y position

      image.print(font, x, y, {
        text: text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, imageWidth, imageHeight);
    });

    // Save the image to the temporary directory
    const fileName = `/tmp/doge-meme.jpg`;
    await image.writeAsync(fileName); // Save the image

    // Read the image from the file and upload to S3
    const imgdata = fs.readFileSync(fileName);
    const s3params = {
      Bucket: 'doge-meme-images', // Ensure this matches your bucket name
      Key: `doge-meme-${Date.now()}.jpg`,
      Body: imgdata,
      ContentType: 'image/jpeg',
    };

    await s3.putObject(s3params).promise();

    // Return the public URL of the uploaded image
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Meme created successfully!',
        imageUrl: `https://${s3params.Bucket}.s3.amazonaws.com/${s3params.Key}`,
      }),
    };

    cb(null, response);

  } catch (err) {
    console.error('Error generating meme:', err);
    cb(err);
  }
};
