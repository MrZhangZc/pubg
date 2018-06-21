import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId,
    Mixed = Schema.Types.Mixed

const ForumSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    slug: { type: String},
    author: { type: ObjectId, ref: 'User'},
    comments: [Mixed],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

ForumSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Forum', ForumSchema)