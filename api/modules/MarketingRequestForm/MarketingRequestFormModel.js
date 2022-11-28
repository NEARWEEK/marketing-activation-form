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
    daoContractId: String,
    daoProposalId: String,
    daoProposalStatus: String,
    daoBountyId: String,
    trelloIssueId: String,
    trelloIssueStatus: String,
  },
  { timestamps: true },
);

MarketingRequestFormSchema.index({ nearAccountId: 1, typeformFormId: 1 }, { unique: true });
MarketingRequestFormSchema.index({ daoContractId: 1, daoProposalId: 1 }, { unique: false });
MarketingRequestFormSchema.index({ daoProposalStatus: 1 }, { unique: false });
MarketingRequestFormSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('MarketingRequestForm', MarketingRequestFormSchema);
