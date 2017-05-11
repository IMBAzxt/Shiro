cossApp.factory('Coss', function ($resource) {
    return function (modelFlag) {
        return $resource('api/td/coss/:modelFlag/', {}, {
            findDayMetrics: {method: 'POST', params: {modelFlag: modelFlag}}
        });
    };
});
