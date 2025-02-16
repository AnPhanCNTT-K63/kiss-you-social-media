"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPopulate = AutoPopulate;
const auto_populate_metadata_storage_1 = require("../storages/auto-populate-metadata.storage");
function AutoPopulate(autoPopulateOptions) {
    const { ref, isArray = false } = autoPopulateOptions;
    return (target, propertyKey) => {
        auto_populate_metadata_storage_1.AutoPopulateMetadataStorage.addAutoPopulateMetadata({
            target: target.constructor,
            propertyKey: propertyKey,
            autoPopulateOptions: {
                ref,
                isArray,
            },
        });
    };
}
//# sourceMappingURL=auto-populate.decorator.js.map