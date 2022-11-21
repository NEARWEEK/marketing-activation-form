const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const MarketingRequestFormSchema = new Schema(
  {
    nearId: String,
    formId: String,
    response: Object,
  },
  { timestamps: true },
);

MarketingRequestFormSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('MarketingRequestForm', MarketingRequestFormSchema);
