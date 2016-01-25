function GetCookies(){
    var result = new Array();

    var allcookies = document.cookie;
    if( allcookies != '' ){
        var cookies = allcookies.split( '; ' );

        for( var i = 0; i < cookies.length; i++ ){
            var cookie = cookies[ i ].split( '=' );
            result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
        }
    }
    return result;
}

function GetCookieByName(name){
    var result = null;
    var cookieName = name + '=';
    var allcookies = document.cookie;
    var position = allcookies.indexOf( cookieName );
    if( position != -1 ){
        var startIndex = position + cookieName.length;
        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 ){
            endIndex = allcookies.length;
        }
        result = decodeURIComponent(
        allcookies.substring( startIndex, endIndex ) );
    }
    return result;
}

function GetQueryString() {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);
        var parameters = query.split('&');
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return null;
}