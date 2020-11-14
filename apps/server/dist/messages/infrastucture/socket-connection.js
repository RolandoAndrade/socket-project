"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openConnection = void 0;
const net_1 = require("net");
async function openConnection(port, host) {
    const socket = new net_1.Socket();
    return new Promise((resolve, reject) => {
        socket.connect(port, host, () => {
            console.info("Connected");
            return resolve(socket);
        });
    });
}
exports.openConnection = openConnection;
//# sourceMappingURL=socket-connection.js.map