var ID3 = require('../id3');

var validSampleData = new Uint8Array([73,68,51,4,0,0,0,0,0,81,89,77,73,68,0,0,0,10,0,0,3,49,50,50,55,48,51,56,48,55,89,67,83,80,0,0,0,10,0,0,3,49,50,50,55,48,51,56,48,55,89,83,69,81,0,0,0,4,0,0,3,49,58,51,89,84,89,80,0,0,0,2,0,0,3,77,89,68,85,82,0,0,0,5,0,0,3,48,53,46,53,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255]);
var expectedProperties = [ 
    { YMID: '122703807' },
    { YCSP: '122703807' },
    { YSEQ: '1:3' },
    { YTYP: 'M' },
    { YDUR: '05.5' } 
];

describe("ID3 parser", function() {

    it("contains valid ID3 data", function() {
        expect(new ID3(validSampleData).getVersion()).toBe('ID3v2.4.0');        
    });

    it("contains 81 bytes of ID3 data", function() {
        expect(new ID3(validSampleData).getSize()).toBe(81);
    });

    it("has 5 properties", function() {
        expect(new ID3(validSampleData).getProperties()).toEqual(expectedProperties);
    });

    it("can be represented as a key/value object", function() {
        var id3obj = new ID3(validSampleData);
        var obj = id3obj.asObject();
        expect(obj.YMID).toBe('122703807');
    });
});
