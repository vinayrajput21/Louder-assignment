import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    venueName: { type: String, required: true },
    location: { type: String, required: true },
    estimatedCost: { type: String, required: true },
    whyItFits: { type: String, required: true }
  },
  { _id: false }
);

const searchSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    proposal: { type: proposalSchema, required: true }
  },
  { timestamps: true }
);

const Search = mongoose.model("Search", searchSchema);

export default Search;