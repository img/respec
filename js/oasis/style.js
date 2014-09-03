
// Module oasis/style
// Inserts a link to the appropriate OASIS style for the specification's maturity level.
// CONFIGURATION
//  - specStatus: the short code for the specification's maturity level or type (required)

define(
    ["core/utils"],
    function (utils) {
        return {
            run:    function (conf, doc, cb, msg) {
                msg.pub("start", "oasis/style");
                if (!conf.specStatus) msg.pub("error", "Configuration 'specStatus' is not set, required for oasis/style");
                var css = "http://sspeiche.github.io/respec/js/oasis/css/" + conf.specStatus + ".css";
                utils.linkCSS(doc, css);
                msg.pub("end", "oasis/style");
                cb();
            }
        };
    }
);
