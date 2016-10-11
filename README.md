[![Build Status](https://travis-ci.org/Eyevinn/id3.js.svg?branch=master)](https://travis-ci.org/Eyevinn/id3.js)

## Description
This is a simple ID3 parser library in Javascript. It parses ID3 data packed in an Uint8Array and
returns an array of properties. 

## Example

    // id3data is an Uint8Array
    var id3obj = new ID3(id3data);
    // properties is an array of key/value objects where key is ID3 frame id
    var properties = id3obj.getProperties();  
    // object contains all properties as one key/value object
    var object = id3obj.asObject();

## Browser version

A Browser version is available in the dist/ and can be included in a script tag

    <script src="id3.min.js"></script>

## Building

    npm install
    npm run build
