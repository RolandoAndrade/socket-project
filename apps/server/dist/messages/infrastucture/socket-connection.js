"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openConnection = exports.socketInstance = void 0;
const net_1 = require("net");
const common_1 = require("@nestjs/common");
exports.socketInstance = new net_1.Socket();
async function openConnection(port, host) {
    const logger = new common_1.Logger("openConnection");
    logger.log(`Iniciando conexión con ${host}:${port}`);
    exports.socketInstance.on("error", () => {
        logger.error(`Fallo al conectar con ${host}:${port}, revise su VPN`);
        logger.log(`Reintentando...`);
        exports.socketInstance.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    });
    exports.socketInstance.on("connect", () => {
        logger.log(`Conectado con ${host}:${port}`);
    });
    exports.socketInstance.on("close", () => {
        logger.log(`Desconectado`);
        exports.socketInstance.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    });
    return new Promise((resolve, reject) => {
        exports.socketInstance.connect(port, host, () => {
            return resolve(exports.socketInstance);
        });
    });
}
exports.openConnection = openConnection;
//# sourceMappingURL=socket-connection.js.map