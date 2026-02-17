from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def semantic_search(query, resources):
    if not resources:
        return []
    corpus = [r.title + " " + r.description + " " + (r.tags or "") for r in resources]
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(corpus + [query])
    similarity = cosine_similarity(tfidf[-1], tfidf[:-1])
    ranked = similarity.argsort()[0][::-1]
    return ranked
