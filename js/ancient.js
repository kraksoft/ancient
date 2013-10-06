(function (win) {
    var doc = win.document;

    function createCookie(name, value, days) {
        var date = new Date();
        var expires = '';

        if (days) {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        doc.cookie = name + '=' + value + expires + '; path=/';
    }

    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = doc.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    }

    if (readCookie('dismiss') == 'dismissed') {
        return true;
    }

    var styleText =
        'background-color: #eed3d7;' +
        'color: #b94a48;' +
        'font: normal 1em sans-serif;' +
        'padding: 1em 2em 1em 2em;' +
        'text-align: center;'
    ;
    var styleLink =
        'color: #0000ee;' +
        'text-decoration: underline;'
    ;
    var styleButton =
        'color: #999999;' +
        'font-size: 1.25em;' +
        'font-weight: bold;' +
        'position: absolute;' +
        'right: 0.5em;' +
        'top: 0.5em;' +
        'text-decoration: none;'
    ;
    var textPl = 'Używasz przestarzałej przeglądarki. <a href="http://browsehappy.com/" style="' + styleLink + '">Zmień ją</a> lub <a href="http://www.google.com/chromeframe/?redirect=true" style="' + styleLink + '">zainstaluj Google Chrome Frame dla IE</a> aby korzystać z naszego serwisu.';
    var textEn = 'You are using an outdated browser. <a href="http://browsehappy.com/" style="' + styleLink + '">Change your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true" style="' + styleLink + '">install Google Chrome Frame for IE</a> to use our website.';
    var text = textPl + '<br />' + textEn;

    var markup =
        '<a href="#" style="' + styleButton + '" title="zamknij / close">&times;</a>' +
        '<div style="' + styleText + '">' + text + '</div>'
    ;
    var container = doc.createElement('div');

    container.setAttribute('style',
        'clear: both;' +
        'left: 0;' +
        'overflow: hidden;' +
        'position: fixed;' +
        'top: 0;' +
        'width: 100%;' +
        'z-index: 9999;'
    );
    container.innerHTML = markup;

    var status = doc.body.insertBefore(container, doc.body.firstChild);
    var links = status.getElementsByTagName('a');

    links[0].onclick = function () {
        createCookie('dismiss', 'dismissed', 0);
        doc.body.removeChild(status);

        return false;
    };
})(this);
