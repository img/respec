
// Module oasis/vocab
// Handle the RDF vocabulary properly.

define(
    ["handlebars",
     "core/utils",
     "tmpl!oasis/templates/vocab.html"],
    function (hb, utils, vocabTmpl) {
        return {
            run: function (conf, doc, cb, msg) {
                msg.pub("start", "oasis/vocab");
                
                msg.pub("end", "oasis/vocab");
                cb();
            },
            vocabToTable: function(util, content) {
                var fillHBJson = function(store, triples, map) {
    			    $.each(triples || [], function(i, it) {
    			    	$.each(map || [], function(n, nt) {
    				    	var results = store.find(it.subject, nt.predicate, null);
    				    	if (results.length > 0) {
    				    		if (nt.multiValue) {
    				    			it[nt.name] = results;    				    			
    				    		} else {
    				    			var o = results[0].object;
    				    			if (N3.Util.isLiteral(o)) {
    				    				o = N3.Util.getLiteralValue(o);
    				    			}
    				    			it[nt.name] = o;
    				    		}
    				    	}
    			    	});
    			    });           	
                };
            	var parser = N3.Parser();
            	var store = N3.Store();
            	parser.parse(function (error, triple, prefixes) {
				if (error) {
					console.log("Error: "+error);
				} else {
					triple && store.addTriple(triple);
				}
            	});
            	parser.addChunk(content);
            	parser.end();

//			    alert("Somehow I made it!");
			    
			    var owlOnto = "http://www.w3.org/2002/07/owl#Ontology";
			    var rdfsClass = "http://www.w3.org/2000/01/rdf-schema#Class";
			    var rdfProp = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";
			    var rdfDesc = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Description";
			    var rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
			    var rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label";
			    var rdfsComment = "http://www.w3.org/2000/01/rdf-schema#comment";
			    var rdfsSeeAlso = "http://www.w3.org/2000/01/rdf-schema#seeAlso";
			    var rdfsIsDefinedBy = "http://www.w3.org/2000/01/rdf-schema#isDefinedBy";
			    var dcDescription = "http://purl.org/dc/terms/description";
			    
			    var onto = store.find(null, rdfType, owlOnto);
			    if (onto.length != 1) { console.log("Can't locate owl:Ontology"); return null;}
			    var vocabSub = onto[0].subject;
			    var conf = {};
			    conf.vocabURI = vocabSub;
			    
			    var seeAlso = store.find(vocabSub, rdfsSeeAlso, null);
			    conf.seeAlso = seeAlso;
		
			    var classes = store.find(null, rdfType, rdfsClass);
			    conf.classes = classes;
			    
			    var inputMap = [{predicate: rdfsLabel, name: "name"}, 
			                    {predicate: rdfsComment, name: "comment"},
			                    {predicate: rdfsSeeAlso, name: "seeAlso", multiValue: true},
			                    {predicate: rdfsIsDefinedBy, name: "isDefinedBy"}];
			    fillHBJson(store, classes, inputMap);
			    
			    var props = store.find(null, rdfType, rdfProp);
			    conf.props = props;
			    fillHBJson(store, props, inputMap);
			    
			    var desc = store.find(null, rdfType, rdfDesc);
			    conf.desc = desc;
			    fillHBJson(store, desc, inputMap);
			    
			    //var template = hb.compile(vocabTmpl);
			    var html = vocabTmpl(conf);
		
				return html;
            }
        };
    }
);

