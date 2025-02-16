"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPopulateMetadataStorage = exports.AutoPopulateMetadataStorageHost = void 0;
class AutoPopulateMetadataStorageHost {
    constructor() {
        this.properties = new Array();
    }
    addAutoPopulateMetadata(metadata) {
        this.properties.unshift(metadata);
    }
    getAutoPopulateMetadata(target) {
        let autoPopulateMetadata = [];
        autoPopulateMetadata = this.properties.filter((meta) => meta.target === target);
        let parent = Object.getPrototypeOf(target);
        while (parent && parent !== Function.prototype) {
            autoPopulateMetadata = autoPopulateMetadata.concat(this.properties.filter((meta) => meta.target === parent));
            parent = Object.getPrototypeOf(parent);
        }
        return autoPopulateMetadata;
    }
}
exports.AutoPopulateMetadataStorageHost = AutoPopulateMetadataStorageHost;
const globalRef = global;
exports.AutoPopulateMetadataStorage = globalRef.AutoPopulateMetadataStorage ||
    new AutoPopulateMetadataStorageHost();
globalRef.AutoPopulateMetadataStorage = exports.AutoPopulateMetadataStorage;
//# sourceMappingURL=auto-populate-metadata.storage.js.map