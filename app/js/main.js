/**
 *  CODE
 */

(function () {
    'use strict';

    var pluginName = 'scrollRadius';

    $('.'+pluginName+'-content')[pluginName]({
        $scroll: $('.'+pluginName+'-bar'),
        radius: 200,
        minDeg: 135,
        maxDeg: 225
    });
})();
