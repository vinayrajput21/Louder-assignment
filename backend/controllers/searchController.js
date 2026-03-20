import Search from "../models/Search.js";
import { generateVenueProposal } from "../services/aiService.js";

export const createSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const proposal = await generateVenueProposal(query);

    const savedSearch = await Search.create({
      query,
      proposal,
    });

    res.status(201).json(savedSearch);
  } catch (error) {
    console.error("Create search error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const searches = await Search.find().sort({ createdAt: -1 });
    res.status(200).json(searches);
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};