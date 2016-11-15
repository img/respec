
// Module dng/style
// Inserts a link to the appropriate OASIS style for the specification's maturity level.
// CONFIGURATION
//  - specStatus: the short code for the specification's maturity level or type (required)

define(
    ["core/utils"],
    function (utils) {
        return {
            run:    function (conf, doc, cb, msg) {
                msg.pub("start", "dng/style");
                if (!conf.specStatus) msg.pub("error", "Configuration 'specStatus' is not set, required for dng/style");
            	var css = "/builds/dng/css/spec.css";
                utils.linkCSS(doc, css);
                utils.linkCSS(doc, '/builds/dng/css/default.css');
                msg.pub("end", "dng/style");
                cb();
            }
        };
    }
);
