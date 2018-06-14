import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ConsumableSchema = new Schema({
    imgPath: String,
    category: String,
    summery: String,
    damage : String,
    capacity: String,
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

ConsumableSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Consumable', ConsumableSchema)