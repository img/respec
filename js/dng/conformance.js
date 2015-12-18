
// Module dng/conformance
// Handle the conformance section properly.

define(
    ["tmpl!dng/templates/conformance.html"],
    function (confoTmpl) {
        return {
            run:    function (conf, doc, cb, msg) {
                msg.pub("start", "dng/conformance");
                var $confo = $("#conformance");
                if ($confo.length) $confo.prepend(confoTmpl(conf));
                msg.pub("end", "dng/conformance");
                cb();
            }
        };
    }
);
