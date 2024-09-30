from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)


movies = pd.read_csv('movies.csv') 
vectors = pd.read_pickle('vectors.pkl') 

def recommend_movies(movie_title, num_recommendations=5):
    movie_idx = movies[movies['title'].str.lower() == movie_title.lower()].index

    if len(movie_idx) == 0:
        return f"Movie '{movie_title}' not found in the dataset."
    
    movie_idx = movie_idx[0]  
    movie_cluster = movies.loc[movie_idx, 'cluster']
    
    similar_movies = movies[(movies['cluster'] == movie_cluster) & (movies.index != movie_idx)]
    
    input_vector = vectors[movie_idx].toarray()
    cluster_vectors = vectors[similar_movies.index].toarray()
    
    similarities = cosine_similarity(input_vector, cluster_vectors).flatten()
    
    similar_movies = similar_movies.copy()
    similar_movies['similarity'] = similarities
    top_recommendations = similar_movies.sort_values(by='similarity', ascending=False).head(num_recommendations)
    top_recommendations['movie_id'] = top_recommendations['id']
    
    return top_recommendations[['title', 'similarity', 'movie_id']].to_dict(orient='records')


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()

    if not data or 'movie_title' not in data:
        return jsonify({"error": "movie_title is required"}), 400
    
    movie_title = data['movie_title']
    num_recommendations = 5


    try:
        recommendations = recommend_movies(movie_title, num_recommendations)
        if isinstance(recommendations, str): 
            return jsonify({"error": recommendations}), 404
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run()
