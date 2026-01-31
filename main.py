import requests
from collections import Counter

query = input("What news do you want? : ")
api = "#"
#//db72c882945b44daa4dde34b3c7044c8
url = f"https://newsapi.org/v2/everything?q={query}&from=2025-12-31&sortBy=publishedAt&apiKey={api}"

print(url)

r = requests.get(url)
data = r.json()

articles = data.get("articles", [])

for index, article in enumerate(articles, start=1):
    print(index+1, article.get("title"), article.get("url"))
    print("\n*****************************************************\n")

def keyword_frequency(keyword, articles):
    count = 0
    for article in articles:
        title = article.get("title", "").lower()
        count += title.count(keyword)
    return count

freq = keyword_frequency(query, articles)
print(f"\nKeyword '{query}' appeared {freq} times in article titles")