# Link-Slice - URL Shortener

## Project Description:
A simple web application for generating and resolving long URLs into short URLs.

## Languages and Tools used:

<h4>Frontend:</h4>
<p>
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
</p>

<h4>Backend:</h4>
<p>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white">
</p>

<h4>Others:</h4> 

<p>Figma, Thunderclient</p>

## Features:

<ul>
  <li>Allows users to input a long URL and generate a shortened version</li>
  <li>Validates the input URL to ensure correctness</li>
  <li>Generates a unique short URL for each input URL</li>
  <li>Resolves short URLs to their original long URLs</li>
</ul>

## Installation:

<ol>
  <li>Clone the repository: git clone https://github.com/Ju7ii/Link-Slice.git</li>
  <li>Navigate to the project directory: cd Link-Slice</li>
  <li>
    Install dependencies: look in folders <a href="https://github.com/Ju7ii/Link-Slice/tree/main/client">client</a> and <a href="https://github.com/Ju7ii/Link-Slice/tree/main/server">server</a> and download the dependencies from the package.json files
  </li>
  <li>Configure the database in <a href="https://github.com/Ju7ii/Link-Slice/blob/main/server/dbConfig.js">dbConfig.js</a></li>
  <li>Start the server: node server.js</li>
</ol>

## Usage:

<p>Utilize API endpoints to interact with the backend.</p>
<ul>
  <li>Use /shortenUrl endpoint to generate short URLs by sending a POST request with the original URL as a parameter.</li>
  <li>Use /:shortUrl endpoint to resolve short URLs by sending a GET request with the short URL as a parameter.</li>
</ul>

## License:
<p>This project is licensed under the MIT License. See LICENSE for more details.</p>
