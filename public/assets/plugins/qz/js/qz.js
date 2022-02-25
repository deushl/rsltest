/**
 * Re-use the new WebSockets deployment if available.  If not, fallback on the Oracle deployment
 */
window["deployQZ"] = typeof(deployQZ) == "function" ? deployQZ : deployQZApplet;

function deployQZApplet() {
    console.log('Starting deploy of qz applet');

    var attributes = {id: "qz", code:'qz.PrintApplet.class',
        archive:'assets/plugins/qz/qz-print.jar', width:1, height:1};
    var parameters = {jnlp_href: './assets/plugins/qz/qz-print_jnlp.jnlp',
        cache_option:'plugin', disable_logging:'false',
        initial_focus:'false', separate_jvm:'true'};
    if (deployJava.versionCheck("1.7+") == true) {}
    else if (deployJava.versionCheck("1.6.0_45+") == true) {}
    else if (deployJava.versionCheck("1.6+") == true) {
        delete parameters['jnlp_href'];
    }

    // Disable java download redirects
    deployJava.installJRE = function(version, ignore) { console.log("Java " + version + " NPAPI plugin not available"); }
    deployJava.runApplet(attributes, parameters, '1.6');
}

/**
 * Deploy tray version of QZ, or
 * Optionally used to deploy multiple versions of the applet for mixed
 * environments.  Oracle uses document.write(), which puts the applet at the
 * top of the page, bumping all HTML content down.
 */
deployQZApplet();

function getCertificate(callback) {
    /*
    $.ajax({
        method: 'GET',
        url: 'assets/auth/digital-certificate.txt',
        async: false,
        success: callback // Data returned from ajax call should be the site certificate
    });
    */

    //Non-ajax method, only include public key and intermediate key
    callback("-----BEGIN CERTIFICATE-----\n" +
        "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\n" +
        "-----END CERTIFICATE-----\n" +
        "--START INTERMEDIATE CERT--\n" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\n" +
        "MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\n" +
        "bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\n" +
        "A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\n" +
        "emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\n" +
        "gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\n" +
        "cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\n" +
        "EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\n" +
        "c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\n" +
        "iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\n" +
        "YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\n" +
        "GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\n" +
        "EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n" +
        "0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\n" +
        "xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n" +
        "9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\n" +
        "ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n" +
        "2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n" +
        "6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n" +
        "5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\n" +
        "plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\n" +
        "BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\n" +
        "eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\n" +
        "gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\n" +
        "x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\n" +
        "pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n" +
        "2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\n" +
        "rbO7BnjW\n" +
        "-----END CERTIFICATE-----\n");
}

function signRequest(toSign, callback) {
    /*
    $.ajax({
        method: 'GET',
        contentType: "text/plain",
        url: '/secure/url/for/sign-message.php?request=' + toSign,
        async: false,
        success: callback // Data returned from ajax call should be the signature
    });
    */

    //Send unsigned messages to socket - users will then have to Allow/Deny each print request
    callback();
}


/**
 * Automatically gets called when applet has loaded.
 */
function qzReady() {
    // If the qz object hasn't been created, fallback on the <applet> tags
    if (!qz) {
        window["qz"] = document.getElementById('qz');
    }
    var version = document.getElementById("version");
    if (qz) {
        console.log("qz ready");
        //useDefaultPrinter();
        findPrinter("EPSON TM-T20II Receipt");
    }
}

function launchQZ() {
    if (window["qz"] && $.isFunction(qz.isActive) && qz.isActive()) {
        alert("Already running");
    } else {
        window.location.assign("qz:launch");
        qzNoConnection = function() { deployQZ(); }
        qzNoConnection();
    }
}

function qzSocketError(event) {
    document.getElementById("qz-status").style.background = "#F5A9A9";
    console.log('Error:');
    console.log(event);

    alert("Connection had an error:\n"+ event.reason);
}

function qzSocketClose(event) {
    document.getElementById("qz-status").style.background = "#A0A0A0";
    console.log('Close:');
    console.log(event);
    qz = null;

    alert("Connection was closed:\n"+ event.reason);
}

function qzNoConnection() {
    //alert("Unable to connect to QZ, is it running?");

    //run deploy applet After page load
    var content = '';
    var oldWrite = document.write;
    document.write = function(text) {
        content += text;
    };
    deployQZApplet();

    var newElem = document.createElement('ins');
    newElem.innerHTML = content;

    document.write = oldWrite;
    document.body.appendChild(newElem);
}

/**
 * Returns whether or not the applet is not ready to print.
 * Displays an alert if not ready.
 */
function notReady() {
    // If applet is not loaded, display an error
    if (!isLoaded()) {
        return true;
    }
    // If a printer hasn't been selected, display a message.
    else if (!qz.getPrinter()) {
        alert('Please select a printer first by using the "Detect Printer" button.');
        return true;
    }
    return false;
}

/**
 * Returns is the applet is not loaded properly
 */
function isLoaded() {
    if (!qz) {
        alert('Error:\n\n\tPrint plugin is NOT loaded!');
        return false;
    } else {
        try {
            if (!qz.isActive()) {
                console.log('Error:\n\n\tPrint plugin is loaded but NOT active!');
                return false;
            }
        } catch (err) {
            console.log('Error:\n\n\tPrint plugin is NOT loaded properly!');
            console.log(err);
            return false;
        }
    }
    return true;
}

/**
 * Automatically gets called when "qz.print()" is finished.
 */
function qzDonePrinting() {
    // Alert error, if any
    if (qz.getException()) {
        alert('Error printing:\n\n\t' + qz.getException().getLocalizedMessage());
        qz.clearException();
        return;
    }

    // Alert success message
    //alert('Successfully sent print data to "' + qz.getPrinter() + '" queue.');
    MsgToUsr.Fresult_msg("33", "Recibo impreso");
}

/***************************************************************************
 * Prototype function for finding the "default printer" on the system
 * Usage:
 *    qz.findPrinter();
 *    window['qzDoneFinding'] = function() { alert(qz.getPrinter()); };
 ***************************************************************************/
function useDefaultPrinter() {
    if (isLoaded()) {
        // Searches for default printer
        qz.findPrinter();

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
            // Alert the printer name to user
            var printer = qz.getPrinter();
            alert(printer !== null ? 'Default printer found: "' + printer + '"':
            'Default printer ' + 'not found');

            // Remove reference to this function
            window['qzDoneFinding'] = null;
        };
    }
}

/***************************************************************************
 * Prototype function for printing raw commands directly to the filesystem
 * Usage:
 *    qz.append("\n\nHello world!\n\n");
 *    qz.printToFile("C:\\Users\\Jdoe\\Desktop\\test.txt");
 ***************************************************************************/
function printToFile() {
    if (isLoaded()) {
        // Any printer is ok since we are writing to the filesystem instead
        qz.findPrinter();

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
            // Send characters/raw commands to qz using "append"
            // Hint:  Carriage Return = \r, New Line = \n, Escape Double Quotes= \"
            qz.append('\nN\n');
            qz.append('q609\n');
            qz.append('Q203,26\n');
            qz.append('B5,26,0,1A,3,7,152,B,"1234"\n');
            qz.append('A310,26,0,3,1,1,N,"SKU 00000 MFG 0000"\n');
            qz.append('A310,56,0,3,1,1,N,"QZ PRINT APPLET"\n');
            qz.append('A310,86,0,3,1,1,N,"TEST PRINT SUCCESSFUL"\n');
            qz.append('A310,116,0,3,1,1,N,"FROM SAMPLE.HTML"\n');
            qz.append('A310,146,0,3,1,1,N,"QZINDUSTRIES.COM"\n');
            qz.append('P1\n');

            // Send characters/raw commands to file
            // i.e.  qz.printToFile("\\\\server\\printer");
            //       qz.printToFile("/home/user/test.txt");
            qz.printToFile("C:\\tmp\\qz-print_test-print.txt");

            // Remove reference to this function
            window['qzDoneFinding'] = null;
        };
    }
}

/***************************************************************************
 * Prototype function for printing raw commands directly to a hostname or IP
 * Usage:
 *    qz.append("\n\nHello world!\n\n");
 *    qz.printToHost("192.168.1.254", 9100);
 ***************************************************************************/
function printToHost() {
    if (isLoaded()) {
        // Any printer is ok since we are writing to a host address instead
        qz.findPrinter();

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
            // Send characters/raw commands to qz using "append"
            // Hint:  Carriage Return = \r, New Line = \n, Escape Double Quotes= \"
            qz.append('\nN\n');
            qz.append('q609\n');
            qz.append('Q203,26\n');
            qz.append('B5,26,0,1A,3,7,152,B,"1234"\n');
            qz.append('A310,26,0,3,1,1,N,"SKU 00000 MFG 0000"\n');
            qz.append('A310,56,0,3,1,1,N,"QZ PRINT APPLET"\n');
            qz.append('A310,86,0,3,1,1,N,"TEST PRINT SUCCESSFUL"\n');
            qz.append('A310,116,0,3,1,1,N,"FROM SAMPLE.HTML"\n');
            qz.append('A310,146,0,3,1,1,N,"QZINDUSTRIES.COM"\n');
            qz.append('P1\n');
            // qz.printToHost(String hostName, int portNumber);
            // qz.printToHost("192.168.254.254");   // Defaults to 9100
            qz.printToHost("192.168.1.254", 9100);

            // Remove reference to this function
            window['qzDoneFinding'] = null;
        };
    }
}


/***************************************************************************
 * Prototype function for finding the closest match to a printer name.
 * Usage:
 *    qz.findPrinter('zebra');
 *    window['qzDoneFinding'] = function() { alert(qz.getPrinter()); };
 ***************************************************************************/
function findPrinter(name) {

    if (isLoaded()) {
        // Searches for locally installed printer with specified name
        qz.findPrinter(name);

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
            var printer = qz.getPrinter();

            // Alert the printer name to user
            console.log(printer !== null ? 'Printer found: "' + printer +
            '" after searching for "' + name + '"' : 'Printer "' +
            name + '" not found.');

            // Remove reference to this function
            window['qzDoneFinding'] = null;
        };
    }
}

/***************************************************************************
 * Prototype function for listing all printers attached to the system
 * Usage:
 *    qz.findPrinter('\\{dummy_text\\}');
 *    window['qzDoneFinding'] = function() { alert(qz.getPrinters()); };
 ***************************************************************************/
function findPrinters() {
    if (isLoaded()) {
        // Searches for a locally installed printer with a bogus name
        qz.findPrinter('\\{bogus_printer\\}');

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
            // Get the CSV listing of attached printers
            var printers = qz.getPrinters().replace(/,/g, '\n');
            alert(printers);

            // Remove reference to this function
            window['qzDoneFinding'] = null;
        };
    }
}


/***************************************************************************
 * Prototype function for printing a graphic to a PostScript capable printer.
 * Not to be used in combination with raw printers.
 * Usage:
 *    qz.appendImage('/path/to/image.png');
 *    window['qzDoneAppending'] = function() { qz.printPS(); };
 ***************************************************************************/
function printImage(scaleImage) {
    if (notReady()) { return; }

    // Optional, set up custom page size.  These only work for PostScript printing.
    // setPaperSize() must be called before setAutoSize(), setOrientation(), etc.
    if (scaleImage) {
        qz.setPaperSize("8.5in", "11.0in");  // US Letter
        //qz.setPaperSize("210mm", "297mm");  // A4
        qz.setAutoSize(true);
        //qz.setOrientation("landscape");
        //qz.setOrientation("reverse-landscape");
    }

    //qz.setCopies(3);
    qz.setCopies(parseInt(document.getElementById("copies").value));

    // Append our image (only one image can be appended per print)
    qz.appendImage(getPath() + "assets/img/image_sample.png");

    // Automatically gets called when "qz.appendImage()" is finished.
    window['qzDoneAppending'] = function() {
        // Tell the applet to print PostScript.
        qz.printPS();

        // Remove reference to this function
        window['qzDoneAppending'] = null;
    };
}


/***************************************************************************
 * Prototype function for printing plain HTML 1.0 to a PostScript capable
 * printer.  Not to be used in combination with raw printers.
 * Usage:
 *    qz.appendHTML('<h1>Hello world!</h1>');
 *    qz.printPS();
 ***************************************************************************/
function printHTML() {
    if (notReady()) { return; }

    // Preserve formatting for white spaces, etc.
    var colA = fixHTML('<h2>*  QZ Print Plugin HTML Printing  *</h2>');
    colA = colA + '<color=red>Version:</color> ' + qz.getVersion() + '<br />';
    colA = colA + '<color=red>Visit:</color> http://code.google.com/p/jzebra';

    // HTML image
    var colB = '<img src="' + getPath() + 'assets/img/image_sample.png">';

    //qz.setCopies(3);
    qz.setCopies(1);

    // Append our image (only one image can be appended per print)
    qz.appendHTML(
            '<html>' +
                '<table face="monospace" border="1px">' +
                '<tr height="6cm">' +
                    '<td valign="top">' + colA + '</td>' +
                    '<td valign="top">' + colB + '</td>' +
                '</tr>' +
                '</table>' +
            '</html>'
    );

    qz.printHTML();
}

/***************************************************************************
 * Prototype function for getting the primary IP or Mac address of a computer
 * Usage:
 *    qz.findNetworkInfo();
 *    window['qzDoneFindingNetwork'] = function() {alert(qz.getMac() + ',' +
    *       qz.getIP()); };
 ***************************************************************************/
function listNetworkInfo() {
    if (isLoaded()) {
        // Makes a quick connection to www.google.com to determine the active interface
        // Note, if you don't wish to use google.com, you can customize the host and port
        // qz.getNetworkUtilities().setHostname("qzindustries.com");
        // qz.getNetworkUtilities().setPort(80);
        qz.findNetworkInfo();

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFindingNetwork'] = function() {
            alert("Primary adapter found: " + qz.getMac() + ", IP: " + qz.getIP());

            // Remove reference to this function
            window['qzDoneFindingNetwork'] = null;
        };
    }
}

/***************************************************************************
 * Prototype function for printing an HTML screenshot of the existing page
 * Usage: (identical to appendImage(), but uses html2canvas for png rendering)
 *    qz.setPaperSize("8.5in", "11.0in");  // US Letter
 *    qz.setAutoSize(true);
 *    qz.appendImage($("canvas")[0].toDataURL('image/png'));
 ***************************************************************************/
function printHTML5Page() {
    $("#qz-status").html2canvas({
        canvas: hidden_screenshot,
        onrendered: function() {
            if (notReady()) { return; }
            // Optional, set up custom page size.  These only work for PostScript printing.
            // setPaperSize() must be called before setAutoSize(), setOrientation(), etc.
            qz.setPaperSize("8.5in", "11.0in");  // US Letter
            qz.setAutoSize(true);
            qz.appendImage($("canvas")[0].toDataURL('image/png'));

            //qz.setCopies(3);
            qz.setCopies(parseInt(document.getElementById("copies").value));

            // Automatically gets called when "qz.appendFile()" is finished.
            window['qzDoneAppending'] = function() {
                // Tell the applet to print.
                qz.printPS();

                // Remove reference to this function
                window['qzDoneAppending'] = null;
            };
        }
    });
}


/***************************************************************************
 * Gets the current url's path, such as http://site.com/example/dist/
 ***************************************************************************/
function getPath() {
    var path = window.location.href;
    return path.substring(0, path.lastIndexOf("/")) + "/";
}

/**
 * Fixes some html formatting for printing. Only use on text, not on tags!
 * Very important!
 *   1.  HTML ignores white spaces, this fixes that
 *   2.  The right quotation mark breaks PostScript print formatting
 *   3.  The hyphen/dash autoflows and breaks formatting
 */
function fixHTML(html) {
    return html.replace(/\s/g, "&nbsp;").replace(/’/g, "'").replace(/-/g,"&#8209;");
}
