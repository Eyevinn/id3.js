(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ID3 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2016 Eyevinn Technology. All rights reserved
// Use of this source code is governed by a MIT License
// license that can be found in the LICENSE file.
// Author: Jonas Birme (Eyevinn Technology)

var ID3 = function(data) {
    offset = 0;
    if (!(data[0] == 0x49 && data[1] == 0x44 && data [2] == 0x33)) {
        // Should be "ID3"
        throw new Error('Invalid ID3 payload');
    }
    this.version = "ID3v2." + data[3] + "." + data[4];
    // %abc00000
    // a - Unsynchronisation
    // b - Extended header
    // c - Experimental indicator
    flags = data[5];
    this.uses_synch = (flags & 0x80) !== 0 ? true : false;
    this.has_extended_hdr = (flags & 0x40) !== 0 ? true : false;
    // 4 bytes (4 * %0xxxxxxx) MSB is set to zero in every byte
    this.size = (data[9] & 0xFF) | ((data[8] & 0xFF) << 7) | ((data[7] & 0xFF) << 14);
    offset += 10; // Headersize is 10 bytes

    if (this.uses_synch) {
        throw new Error('Uses Synch not supported yet');
    }
    if (this.has_extended_hr) {
        throw new Error('Has extended hdr not supportet yet');
    }
    // TODO: add support for extended hdr
    // TODO: add support for uses_synch

    this.frames = [];
    var frameHeaderSize = data[3] < 3 ? 6 : 10;

    // Parse tag
    while(offset < data.length) {
        if (offset > this.size + 10) break;
        var frameId = _byteToStr(data.slice(offset, offset+4));
        var frameSize = (data[offset+7] & 0xFF) | ((data[offset+6] & 0xFF) << 8) | ((data[offset+5] & 0xFF) << 16) | ((data[offset+4]) << 24);
        if (frameSize > 0) {
            var frame = {
                id: frameId,
                size: frameSize,
                value: _byteToStr(data.slice(offset+11, offset+frameSize+frameHeaderSize))
            };
            this.frames.push(frame);
        }
        offset += frameSize + frameHeaderSize;
    }

    function _byteToStr(bytearray) {
        var s = '';
        for (var i=0; i<bytearray.length; i++) {
            s += String.fromCharCode(bytearray[i]);
        }
        return s;
    }
};

ID3.prototype.getVersion = function() {
    return this.version;
};

ID3.prototype.getSize = function() {
    return this.size;
};

ID3.prototype.getProperties = function() {
    var properties = [];
    this.frames.forEach(function(f) {
        var p = {};
        p[f.id] = f.value; 
        properties.push(p);
    });
    return properties;
};

ID3.prototype.asObject = function() {
    var properties = this.getProperties();
    var obj = {};
    properties.forEach(function(f) {
        var key = Object.keys(f)[0];
        obj[key] = f[key];
    });
    return obj;
};

module.exports = ID3;

},{}]},{},[1])(1)
});