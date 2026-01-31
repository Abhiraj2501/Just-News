
import { GoogleGenAI } from "@google/genai";
import { Article, NewsResponse } from "../types";

/**
 * Fetches news using Gemini 3's Google Search grounding.
 * This provides better real-time results than basic NewsAPI for browsers
 * due to built-in CORS handling and AI synthesis.
 */
export const fetchNews = async (query: string): Promise<NewsResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use Gemini 3 Flash for speed and excellent grounding
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find the latest news articles for the keyword: "${query}". Return a short summary of the current situation.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const summary = response.text || "No summary available.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  // Extract articles from grounding chunks
  const articles: Article[] = groundingChunks
    .filter((chunk) => chunk.web)
    .map((chunk) => ({
      title: chunk.web?.title || "Untitled Article",
      url: chunk.web?.uri || "#",
      source: chunk.web?.title?.split(" - ")[1] || "News Source"
    }));

  // Logic preservation: Calculate keyword frequency in titles (mimics Python's title.count(keyword))
  const keywordFrequency = articles.reduce((acc, article) => {
    const titleLower = article.title.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Count occurrences of the keyword in the title
    if (!queryLower) return acc;
    const count = titleLower.split(queryLower).length - 1;
    return acc + count;
  }, 0);

  return {
    summary,
    articles,
    keywordFrequency,
  };
};
