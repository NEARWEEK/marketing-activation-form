const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const MarketingRequestFormSchema = new Schema(
  {
    nearAccountId: String,
    typeformFormId: String,
    typeformResponseId: String,
    typeformAnswers: Object,
    clientContacts: String,
    daoProposalId: String,
    daoProposalStatus: String,
    daoBountyId: String,
    trelloIssueId: String,
    trelloIssueStatus: String,
  },
  { timestamps: true },
);

MarketingRequestFormSchema.index({ nearAccountId: 1, typeformFormId: 1 }, { unique: true });
MarketingRequestFormSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('MarketingRequestForm', MarketingRequestFormSchema);
