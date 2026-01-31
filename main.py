import requests 
query = "Artificial Intelligence"
api = "db72c882945b44daa4dde34b3c7044c8"
url = "https://newsapi.org/v2/everything?q=tesla&from=2025-12-31&sortBy=publishedAt&apiKey=db72c882945b44daa4dde34b3c7044c8"

print(url)
r = requests.get(url)
data = r.json()
articles = data["articles"]
for index, article in enumerate(articles):
    print(index+1,article["title"], article["url"])
    print("\n*****************************************************\n")