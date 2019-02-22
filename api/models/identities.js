const {
    think,
    type,
    r
} = require('../../config/database')

const identity_schema = think.createModel(
    'identities', {
        id: type.string(),
        provider: type.string(),
        extern_uid: type.any(),
        createdAt: type.date().default(r.now()),
        user_id: type.string()
    }
)

identity_schema.docAddListener('saved', function (doc) {
    console.log('[log] identity created: (', doc.provider, ') (', doc.id, ')')
});

identity_schema.addListener('retrieved', function (doc) {
    doc.retrieved = new Date();
});

module.exports = identity_schema