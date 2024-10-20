# Doge Meme Generator - Serverless Application

This is a simple serverless application that generates Doge memes by randomly selecting images and adding random text to them. The application uses AWS Lambda, API Gateway, and S3 to store and serve the generated meme images.

## Overview

This project demonstrates how to deploy a serverless application using the Serverless Framework. The core functionality of the application is to:

- Randomly select a Doge image from a predefined set.
- Add randomly selected Doge-style texts (e.g., "Much Wow", "Very Serverless") to the image at random positions.
- Upload the generated meme image to an S3 bucket.
- Return the URL of the uploaded image for public access.

### Technologies Used:

- **AWS Lambda**: For serverless function execution.
- **AWS API Gateway**: To expose the Lambda function via a REST API.
- **AWS S3**: For storing and serving the generated images.
- **Jimp**: An image manipulation library for adding text to the images.

## How It Works

1. The Lambda function selects a random Doge image from a list.
2. Random text is added to the image using the Jimp library.
3. The modified image is saved locally in the Lambda environment and uploaded to the specified S3 bucket.
4. The Lambda function returns the URL of the uploaded image.

## Setup Instructions

1. **Install Dependencies**:  
   Clone the repository and run the following command to install dependencies:
   ```bash
   npm install
   
2. **Deploy the Application**:  
   Deploy the serverless application using the Serverless Framework:
   ```bash
   serverless deploy

3. **API Gateway URL**:
Once deployed, the API Gateway URL will be displayed. You can use this URL to trigger the Lambda function and generate Doge memes.

4. **Check the Generated Meme**:
The function will return a URL pointing to the generated meme in your S3 bucket. You can open the URL in your browser to view the meme.
