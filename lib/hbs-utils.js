const Handlebars = require("handlebars");
const fs = require('fs');
const { format } = require("path");
const fhirpath = require('fhirpath.js');
var Fhir = require('fhir').Fhir;
var ParseConformance = require('fhir').ParseConformance;
var FhirVersions = require('fhir').Versions;

var handlebars = {
    hasEntryOverlay: Handlebars.registerHelper('hasEntryOverlay', function(resourcename) {
        return fs.existsSync(`./data/entryoverlay-partials/${resourcename}-entry.json`);
    }),
    
    hasFormatOverlay: Handlebars.registerHelper('hasFormatOverlay', function(resourcename) {
        return fs.existsSync(`./data/formatoverlay-partials/${resourcename}-format.json`);
    }),
    
    hasCharacterOverlay: Handlebars.registerHelper('hasCharacterOverlay', function(resourcename) {
        return fs.existsSync(`./data/characteroverlay-partials/${resourcename}-character.json`);
    }),
    
    hasInformationOverlay: Handlebars.registerHelper('hasInformationOverlay', function(resourcename) {
        return fs.existsSync(`./data/informationoverlay-partials/${resourcename}-info.json`);
    }),
    
    hasBITdefined: Handlebars.registerHelper('hasBITdefined', function (resourcename) {
        return fs.existsSync(`./data/bit-partials/${resourcename}.json`);
      }),
    
    getBITProperties: Handlebars.registerHelper('getBITProperties' , function(resourcename) {
        var jsonobj = fs.readFileSync(`./data/bit-partials/${resourcename}.json`);
        var bit_partial = JSON.parse(jsonobj);
        for(var i=0; i<bit_partial.pii_attributes.length; i++){
            bit_partial.pii_attributes[i] = new Handlebars.SafeString(`"${bit_partial.pii_attributes[i]}"`);
        }
        var list_with_quotes = bit_partial.pii_attributes.join(",");
        return list_with_quotes;
      }),
    
    getFormatOverlay: Handlebars.registerHelper('getFormatOverlay', function(resourcename) {
        var jsonobj = fs.readFileSync(`./data/formatoverlay-partials/${resourcename}-format.json`);
        var formatpartial = JSON.parse(jsonobj); 
        return new Handlebars.SafeString(JSON.stringify(formatpartial.attr_formats, null, 2));
    }),

    getEntryOverlay: Handlebars.registerHelper('getEntryOverlay', function(resourcename) {
        var jsonobj = fs.readFileSync(`./data/entryoverlay-partials/${resourcename}-entry.json`);
        var entrypartial = JSON.parse(jsonobj); 
        return new Handlebars.SafeString(JSON.stringify(entrypartial.attr_entries, null, 2));
    }),

    getEntryOverlay: Handlebars.registerHelper('getCharacterOverlay', function(resourcename) {
        var jsonobj = fs.readFileSync(`./data/characteroverlay-partials/${resourcename}-character.json`);
        var characterpartial = JSON.parse(jsonobj); 
        return new Handlebars.SafeString(JSON.stringify(characterpartial.attr_character_encoding, null, 2));
    }),

    getEntryOverlay: Handlebars.registerHelper('getInformationOverlay', function(resourcename) {
        var jsonobj = fs.readFileSync(`./data/informationoverlay-partials/${resourcename}-info.json`);
        var infopartial = JSON.parse(jsonobj); 
        return new Handlebars.SafeString(JSON.stringify(infopartial.attr_information, null, 2));
    }),

    getConformancePayload: Handlebars.registerHelper('getConformancePayload', function(context) {
        return new Handlebars.SafeString(JSON.stringify(context));
    })

};

module.exports = handlebars

