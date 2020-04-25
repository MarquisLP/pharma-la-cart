const { Model } = require('objection');


class Client extends Model {
    static get tableName() {
        return 'client';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}


module.exports = Client;