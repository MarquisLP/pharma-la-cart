const { Model } = require('objection');


class Admin extends Model {
    static get tableName() {
        return 'admin';
    }

    static get idColumn() {
        return 'admin_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'hash'],

            properties: {
                admin_id: { type: 'integer' },
                email: { type: 'string', minLength: 6, maxLength: 255 },
                hash: { type: 'string', minLength: 60, maxLength: 60 },
                verified: { type: 'Boolean' },
            }
        }
    }

    static get relationMappings() {
        const AdminVerification = require('./AdminVerification');

        return {
            adminVerifications: {
                relation: Model.HasManyRelation,
                modelClass: AdminVerification,
                join: {
                    from: 'admin.admin_id',
                    to: 'admin_verifications.admin_id',
                },
            }
        };
    }
}


module.exports = Admin;