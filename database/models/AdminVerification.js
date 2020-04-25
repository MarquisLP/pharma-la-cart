
const { Model } = require('objection');


class AdminVerification extends Model {
    static get tableName() {
        return 'admin_verification';
    }

    static get idColumn() {
        return 'admin_verification_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['admin_id', 'token', 'expiration'],

            properties: {
                admin_verification_id: { type: 'integer' },
                admin_id: { type: 'integer' },
                token: { type: 'string', minLength: 128, maxLength:128 },
                expiration: { type: 'timestamp' },
            }
        }
    }

    static get relationMappings() {
        const Admin = require('./Admin');

        return {
            admin: {
                relation: Model.HasOneRelation,
                modelClass: Admin,
                join: {
                    from: 'admin_verifications.admin_id',
                    to: 'admin.admin_id',
                },
            }
        };
    }
}


module.exports = AdminVerification;