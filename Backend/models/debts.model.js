import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "item name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "item price is required"],
        min: [0, "price cannot be negative"]
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const debtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },

    dateTaken: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Date cannot be in the future"
        }
    },

    items: [itemSchema],

    debtActive: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Debt = mongoose.model("Debt", debtSchema);
export const Items = mongoose.model("Items", itemSchema);

