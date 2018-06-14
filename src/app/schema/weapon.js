import mongoose from 'mongoose'

const Schema = mongoose.Schema

const WeaponSchema = new Schema({
    imgPath: String,
    name   : String,
    bullet : String,
    part   : Array,
    damage : Object,
    detail : String,
    category : String,
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

WeaponSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Weapon', WeaponSchema)