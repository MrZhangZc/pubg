
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ResourceSchema = new Schema({
    weapon: {
        type : ObjectId,
        ref  : 'Weapon'
    },
    armor: {
        type: ObjectId,
        ref: 'Armor'
    },
    consumable: {
        type: ObjectId,
        ref: 'Consumable'
    },
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

ResourceSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Resource', ResourceSchema)