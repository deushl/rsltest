/*var page = require('webpage').create(),
var system = require("system");
// change the paper size to letter, add some borders
// add a footer callback showing page numbers
page.paperSize = {
  format: "Letter",
  orientation: "portrait",
  margin: {left:"1cm", right:"0.5cm", top:"0.5cm", bottom:"0.5cm"},
  footer: {
    height: "0.9cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<div style='text-align:center;'><small>" + pageNum +
        " / " + numPages + "</small></div>";
    })
  }
};
page.zoomFactor = 1;
// assume the file is local, so we don't handle status errors
page.open(system.args[1], function (status) {
  // export to target (can be PNG, JPG or PDF!)
  page.render(system.args[2]);
  phantom.exit();
});*/
var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 3 || system.args.length > 6) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log(' paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
} else {
    var cOrientation='portrait';
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 1000, height: 800 };
    if (system.args.length > 5) {
        cOrientation = system.args[5];
    }
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: cOrientation, margin: '0px',
                                               footer: {
                                                        height: "0.9cm",
                                                        contents: phantom.callback(function(pageNum, numPages) {
                                                          return "<div style='text-align:center;'><small>" + pageNum +
                                                            " / " + numPages + "</small></div>";
                                                        })
                                                      }
                                           };
    }
    if (system.args.length > 4) {
        page.zoomFactor = system.args[4];
    }
    
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 500);
        }
    });
}
