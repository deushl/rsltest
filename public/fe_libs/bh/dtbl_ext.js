$.fn.dataTableExt.oApi.fnGetColumnIndex = function ( oSettings, sCol ) 
{
    var cols = oSettings.aoColumns;
    for ( var x=0, xLen=cols.length ; x<xLen ; x++ )
    {
        if ( cols[x].sTitle.toLowerCase() == sCol.toLowerCase() )
        {
            return x;
        };
    }
    return -1;
};

$.fn.dataTableExt.oApi.fnGetColumnName = function ( oSettings, iCol ) 
{
    var cols = oSettings.aoColumns;
    if(iCol<0||iCol>cols.length) {
    	return -1;
    }
    return cols[iCol].sTitle;
};
/**
* This plug-in will provide numeric sorting for currency columns (either
* detected automatically with the currency type detection plug-in or set
* manually) while taking account of the currency symbol ($ or £ by default).
*
* DataTables 1.10+ has currency sorting abilities built-in and will be
* automatically detected. As such this plug-in is marked as deprecated, but
* might be useful when working with old versions of DataTables.
*
* @name Currency
* @summary Sort data numerically when it has a leading currency symbol.
* @deprecated
* @author [Allan Jardine](http://sprymedia.co.uk)
*
* @example
* $('#example').dataTable( {
* columnDefs: [
* { sType: 'currency', aTargets: 0 }
* ]
* } );
*/

$.extend( jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function ( a ) {
    a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" ).replace( /,/g, "" );
    return parseFloat( a );
    },
    
    "currency-asc": function ( a, b ) {
    return a - b;
    },
    
    "currency-desc": function ( a, b ) {
    return b - a;
    }
    } );
    
    $.fn.dataTable.render.moment = function ( from, to, locale ) {
        // Argument shifting
        if ( arguments.length === 1 ) {
            locale = 'en';
            to = from;
            from = 'YYYY-MM-DD';
        }
        else if ( arguments.length === 2 ) {
            locale = 'en';
        }
    
        return function ( d, type, row ) {
            var m = window.moment( d, from, locale, true );
    
            // Order and type get a number value from Moment, everything else
            // sees the rendered value
            return m.format( type === 'sort' || type === 'type' ? 'x' : to );
        };
    };