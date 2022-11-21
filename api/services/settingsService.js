const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema(
  {
    key: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    value: String,
  },
  { timestamps: true },
);

const SettingModel = mongoose.model('Settings', SettingsSchema);

module.exports = {
  async getSettingValue(key) {
    let value
    if (key) {
      const recordData = await SettingModel.findOne({ key });
      value = recordData?.value ? recordData.value : '';
    }
    return value;
  },

  async setSettingValue(key, value) {
    const textValue = String(value);
    if (key && textValue) {
      const storedData = await SettingModel.findOne({ key });
      if (storedData) {
        storedData.value = textValue;
        await storedData.save();
      } else {
        const data = new SettingModel({ key, value: textValue });
        await data.save();
      }
    }
  },
};
