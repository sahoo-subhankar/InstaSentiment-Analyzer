# import nltk
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords

# nltk.download('punkt')
# nltk.download('stopwords')

# stop_words = set(stopwords.words("english"))
# bad_words = ["bad", "inappropriate", "offensive"]

# def analyze_comment(comment):
#     words = word_tokenize(comment.lower())
#     filtered_words = [word for word in words if word.isalpha() and word not in stop_words]
#     severity_score = sum(1 for word in filtered_words if word in bad_words)
#     return severity_score