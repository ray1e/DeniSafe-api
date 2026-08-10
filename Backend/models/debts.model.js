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
});

const debtSchema = new mongoose.Schema({
  dateTaken: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: "Date cannot be in the future",
    },
  },

  items: [itemSchema],

  totalAmount: {
    type: Number,
    default: 0,
  },

  note: {
    type: String,
    trim: true,
  },

  debtActive: {
    type: Boolean,
    default: true,
  },
});


const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    debts: [debtSchema],
  },
  { timestamps: true },
);

/*debtSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  const items = update.items || update.$set.items;
  if (items || Array.isArray(items)) {
    const total = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    this.set({ totalAmount: total });
  }
});*/

// calculate totalamount before saving
debtSchema.pre("save", function () {
  if (this.debts && Array.isArray(this.debts)) {
    this.debts.forEach((debt) => {
      if (debt.items && Array.isArray(debt.items)) {
        debt.totalAmount = debt.items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
      }
    });
  }
});

export const Debt = mongoose.model("Debt", debtSchema);
export const Items = mongoose.model("Items", itemSchema);
export const Account = mongoose.model("Account", accountSchema);
