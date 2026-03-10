# Just News 📰

Just News is a modern React-based news dashboard that fetches real-time news articles based on a keyword and analyzes how often that keyword appears in headlines.

The application uses **Gemini 3 with Google Search grounding** to fetch relevant news data and generate a concise AI-powered summary.

It is designed to be fast, simple, and useful for quickly understanding how a topic is trending in the news.

---

## Features

• Keyword-based news search  
• AI generated summary of current news related to the keyword  
• Keyword frequency analysis in headlines  
• Clean and responsive UI  
• Direct links to original news articles  
• Loading states and error handling  

---

## How It Works

1. User enters a keyword such as:
   - AI
   - NASA
   - Olympics

2. The app sends the query to the backend service (`fetchNews`).

3. Gemini processes the query and returns:
   - Latest news articles
   - AI generated summary
   - Frequency of the keyword in headlines

4. The frontend renders:
   - AI insight summary
   - Keyword statistics
   - List of relevant news articles

---

## Tech Stack

Frontend  
- React  
- TypeScript  
- Tailwind CSS  

Icons  
- Lucide React

AI / Data  
- Gemini 3 API  
- Google Search Grounding

---

## Project Structure
