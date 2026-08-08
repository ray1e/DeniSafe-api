import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "item name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "item price is required"],
    min: [0, "price cannot be negative"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  note: {
    type: String,
    trim: true,
  },
});

const debtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    dateTaken: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date cannot be in the future",
      },
    },

    items: [itemSchema],

    debtActive: {
      type: Boolean,
      default: false,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

debtSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  const items = update.items || update.$set.items;
  if (items || Array.isArray(items)) {  
    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    this.set({ totalAmount: total });
  }
});

debtSchema.pre('save', function () {
  if (this.items && Array.isArray(this.items)) {
    this.totalAmount = this.items.reduce((sum, item) => {
      return sum + (item.price * (item.quantity));
    }, 0);
    console.log("Hook processing items:", this.items)
  }
});

export const Debt = mongoose.model("Debt", debtSchema);
export const Items = mongoose.model("Items", itemSchema);
