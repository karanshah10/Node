
module.exports = {
    prepareJsonResponse,
    promiseSeries
}


function prepareJsonResponse(msg, err, data) {
    let status = err ? "Failure" : "Success";
    let res = new Object();
    res.status = status;
    res.message = msg;
    if (data) {
        res.data = data;
    }
    return res;
}

function promiseSeries(lists) {
    new Promise(function (resolve, reject) {
        var p = Promise.resolve(null);
        console.log("List", p);
        var results = lists.reduce(function (promise, list) {
            console.log(promise + "," + list);
            promise.then(function (result) {
                return pacc = pacc.then(fn);

                // console.log(result);
                // list.then(Array.prototype.concat.bind(result));
                // return result;
            });
        }, p);
        console.log("Results", results);
        resolve(results);
    });
}