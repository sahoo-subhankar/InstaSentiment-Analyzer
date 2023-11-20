import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import pandas as pd
import os

try:
    nltk.data.find("tokenizers/punkt")
except (LookupError, nltk.exceptions.LazyCorpusLoader):
    nltk.download("punkt")

try:
    nltk.data.find("corpora/stopwords")
except (LookupError, nltk.exceptions.LazyCorpusLoader):
    nltk.download("stopwords")

nltk.data.path.append("C:\\Users\\sahoo\\AppData\\Roaming\\nltk_data")
stop_words = set(stopwords.words("english"))

# Read bad words from CSV file
csv_file_path = os.path.join(os.path.dirname(__file__), "bad-words.csv")
bad_words_df = pd.read_csv(csv_file_path, header=None, names=["word"])
bad_words = list(bad_words_df["word"])


def analyze_comment(comment):
    # This function takes a comment as input, tokenizes it into words, and converts the words to lowercase.
    words = word_tokenize(comment.lower())

    # filtering out non-alphabetic words and stopwords from the tokenized words
    filtered_words = [
        word for word in words if word.isalpha() and word not in stop_words
    ]

    # It calculates a score by counting the occurrences of words from `bad_words` in the filtered words
    score = sum(1 for word in filtered_words if word in bad_words)
    return score
