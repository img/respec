/*global respecVersion */

// this is only set in a build, not at all in the dev environment
var requireConfig = {
    shim:   {
        "shortcut": {
            exports:    "shortcut"
        },
        "n3-browser.min": {
        	exports: "N3"
        }
    }
};
if ("respecVersion" in window && respecVersion) {
    requireConfig.paths = {
        "ui": "https://raw.github.com/darobin/respec/gh-pages/js/ui",
    };
}

require.config(requireConfig);

define([
            "domReady"
        ,   "core/base-runner"
        ,   "core/ui"
        ,   "core/override-configuration"
        ,   "core/default-root-attr"
        ,   "core/markdown"
        ,   "core/style"
        ,   "dng/style"
        ,   "dng/headers"
/*        ,   "dng/abstract" */
        ,   "dng/conformance"
        ,   "core/data-transform"
        ,   "core/data-include"
        ,   "core/inlines"
        ,   "core/examples"
        ,   "core/issues-notes"
        ,   "core/requirements"
        ,   "core/highlight"
        ,   "core/best-practices"
        ,   "core/figures"
        ,   "core/biblio"
        ,   "core/rdfa"
        ,   "core/webidl-oldschool"
        ,   "core/dfn"
        ,   "core/fix-headers"
        ,   "core/structure"
        ,   "dng/informative"
        ,   "core/id-headers"
        ,   "dng/aria"
        ,   "dng/vocab"        
        ,   "dng/shape"        
        ,   "core/shiv"
        ,   "core/remove-respec"
        ,   "core/location-hash"
        ],
        function (domReady, runner, ui) {
            var args = Array.prototype.slice.call(arguments);
            domReady(function () {
                ui.addCommand("Save Snapshot", "ui/save-html", "Ctrl+Shift+Alt+S");
                ui.addCommand("About ReSpec", "ui/about-respec", "Ctrl+Shift+Alt+A");
                runner.runAll(args);
            });
        }
);

function vocabToSpec(util, content, uri) {
	var vocab = require("dng/vocab");
	return vocab.vocabToSpec(util, content, uri);
}

function shapeToSpec(util, content, uri) {
	var shape = require("dng/shape");
	return shape.shapeToSpec(util, content, uri);
}


