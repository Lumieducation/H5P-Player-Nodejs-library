"use strict";
exports.__esModule = true;
var server_1 = require("./server");
server_1["default"].listen(process.env.PORT, function () {
    console.log('server listening on port ' + process.env.PORT);
});
//# sourceMappingURL=boot.js.map