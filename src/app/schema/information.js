import mongoose from 'mongoose'

const Schema = mongoose.Schema

const InformationSchema = new Schema({
    title: String,
    content: String,
    category: String,
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

WeaponSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Weapon', WeaponSchema)