import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ArmorSchema = new Schema({
    imgPath: String,
    category: String,
    durable : String,
    reduction : String,
    capacity : String,
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

ArmorSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Armor', ArmorSchema)