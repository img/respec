// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');

// setup middleware
var app = express();
// The following /tests and /js are to run the tests.
app.use("/tests", express.static(__dirname + "/tests"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/builds", express.static(__dirname + "/builds"));
var docsDir = process.env.RESPEC_DOCS_DIR || "c:/dev/workspaces/dng/Server API Docs/docs";
var vocabDir = process.env.RESPEC_VOCAB_DIR || "c:/dev/workspaces/dng/com.ibm.rdm.fronting.server/resources/vocabularies";

// change this on to location of docs folder in docs component
app.use("/docs", express.static(docsDir)); //setup static public directory

// change this to point to the vocabularies dir in services platform component
app.use("/vocabularies", express.static(vocabDir)); //setup static public directory

// There are many useful environment variables available in process.env,
// please refer to the following document for detailed description:
// http://ng.w3.bluemix.net/docs/FAQ.jsp#env_var

// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

