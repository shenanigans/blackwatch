#!/usr/bin/env node

var path = require ('path');
var surveil = require ('surveil');
var handlebars = require ('handlebars');
var mkdirp = require ('mkdirp');
var fs = require ('fs-extra');
var async = require ('async');

var seed = require ('./seed');

var templates = {};
var sep = process.platform === 'win32' ? '\\' : '/';

handlebars.registerHelper ('caps', function (str) {
    return str.replace (/_/g, ' ').toUpperCase();
});

function compilePage (filepath) {
    mkdirp (path.parse (path.resolve ('./dist', filepath)).dir, function (err) {
        if (err) {
            console.log ('FAILED to create dir', path.parse (filepath).dir);
            console.log (err);
            return;
        }
        fs.readFile (path.resolve ('./site', filepath), function (err, buf) {
            if (err) {
                console.log ('FAILED to read page template', filepath);
                console.log (err);
                return;
            }
            var templateStr = buf.toString();
            templates[filepath] = templateStr;
            var generator = handlebars.compile (templateStr);
            var newFilepath = filepath.slice (0, -5) + '.html';
            var shortDir = path.parse (filepath).dir;
            seed.path = shortDir;
            seed.hero = shortDir.split (sep).slice (-1)[0];
            seed.title = seed.INFO.titles[seed.hero] ? seed.INFO.titles[seed.hero] : seed.hero;
            try {
                var html = generator (seed);
            } catch (err) {
                console.log ('FAILED to compile page', filepath);
                console.log (err);
                return;
            }
            fs.writeFile (path.resolve ('./dist', newFilepath), html, function (err) {
                if (err) {
                    console.log ('FAILED to write page template', filepath);
                    console.log (err);
                }
                console.log ('compiled page:', filepath);
            });
        });
    });
}

function recompileAllPages (callback) {
    for (var filepath in templates)
        compilePage (filepath);
}

function removePage (filepath) {

}

async.series ([
    function (callback) {
        // make dist directory
        mkdirp (path.resolve ('./dist', 'img'), callback);
    },
    function (callback) {
        var spy = surveil ('./img', { extensions:[ '.jpg', '.png', '.gif' ], recursive:true });
        function copyImg (name) {
            var dir = path.parse (name).dir;
            mkdirp (path.resolve ('./dist/img', dir), function (err) {
                if (err)
                    console.log (err);
                fs.copy (path.resolve ('./img', name), path.resolve ('./dist/img', name));
            });
        }
        spy.on ('child', copyImg);
        spy.on ('add', copyImg);
        spy.on ('change', copyImg);
        spy.on ('ready', callback);
    },
    function (callback) {
        var spy = surveil ('./site', { extensions:[ '.css' ], recursive:true });
        function copyCSS (name) {
            var dir = path.parse (name).dir;
            console.log ('copied css', path.resolve ('./dist', name));
            mkdirp (path.resolve ('./dist', dir), function (err) {
                if (err)
                    console.log (err);
                fs.copy (path.resolve ('./site', name), path.resolve ('./dist', name));
            });
        }
        spy.on ('child', copyCSS);
        spy.on ('add', copyCSS);
        spy.on ('change', copyCSS);
        spy.on ('ready', callback);
    },
    function (callback) {
        var partialSpy = surveil ('./partials/', { extensions:[ '.bars' ] });
        var pagesLoaded = false;
        var partialsInFlight = 0;
        function compilePartial (name) {
            partialsInFlight++;
            fs.readFile (path.resolve ('./partials', name), function (err, buf) {
                partialsInFlight--;
                if (err) {
                    console.log ('FAILED to read partial', name);
                    console.log (err);
                    if (partialsInFlight === 0) {
                        partialsInFlight = NaN;
                        callback();
                    }
                    return;
                }
                handlebars.registerPartial (name.slice (0, -5), buf.toString());
                console.log ('registered partial', name.slice (0, -5));
                if (pagesLoaded)
                    recompileAllPages();
                if (partialsInFlight === 0) {
                    partialsInFlight = NaN;
                    callback();
                }
            });
        }
        partialSpy.on ('child', compilePartial);
        partialSpy.on ('add', compilePartial);
        partialSpy.on ('change', compilePartial);

        partialSpy.on ('ready', function(){
            pagesLoaded = true;
            if (partialsInFlight === 0) {
                partialsInFlight = NaN;
                callback();
            }
        });
    },
    function (callback) {
        var spy = surveil ('./site', { extensions:[ '.bars' ], recursive:true });
        spy.on ('child', compilePage);
        spy.on ('add', compilePage);
        spy.on ('change', compilePage);
        spy.on ('ready', callback);
    }
], function(){
    console.log ('\n\nall set up');
});
