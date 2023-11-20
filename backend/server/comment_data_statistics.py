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

# Read positive words from CSV file
csv_pos_file_path = os.path.join(os.path.dirname(__file__), "positive-words.csv")
pos_words_df = pd.read_csv(csv_pos_file_path, header=None, names=["word"])
pos_words = list(pos_words_df["word"])


def analyze_positive_comment(comment):
    # This function takes a comment as input, tokenizes it into words, and converts the words to lowercase.
    words = word_tokenize(comment.lower())

    # filtering out non-alphabetic words and stopwords from the tokenized words
    filtered_words = [
        word for word in words if word.isalpha() and word not in stop_words
    ]

    # It calculates a score by counting the occurrences of words from `bad_words` in the filtered words
    score = sum(1 for word in filtered_words if word in pos_words)
    return score


# Read negetive words from CSV file
csv_neg_file_path = os.path.join(os.path.dirname(__file__), "negetive-words.csv")
neg_words_df = pd.read_csv(csv_neg_file_path, header=None, names=["word"])
neg_words = list(neg_words_df["word"])


def analyze_negetive_comment(comment):
    # This function takes a comment as input, tokenizes it into words, and converts the words to lowercase.
    words = word_tokenize(comment.lower())

    # filtering out non-alphabetic words and stopwords from the tokenized words
    filtered_words = [
        word for word in words if word.isalpha() and word not in stop_words
    ]

    # It calculates a score by counting the occurrences of words from `bad_words` in the filtered words
    score = sum(1 for word in filtered_words if word in neg_words)
    return score


# Count total words from one comment
def count_total_words(comment):
    words = comment.split()
    total_words = len(words)
    return total_words
