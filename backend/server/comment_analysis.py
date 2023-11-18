import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import pandas as pd

stop_words = set(stopwords.words("english"))

# Read bad words from CSV file
bad_words_df = pd.read_csv('./bad-words.csv')
bad_words = list(bad_words_df['word'])

def analyze_comment(comment):
    # This function takes a comment as input, tokenizes it into words, and converts the words to lowercase.
    words = word_tokenize(comment.lower())
    
    # filtering out non-alphabetic words and stopwords from the tokenized words
    filtered_words = [word for word in words if word.isalpha() and word not in stop_words]
    
    # It calculates a score by counting the occurrences of words from `bad_words` in the filtered words
    score = sum(1 for word in filtered_words if word in bad_words)
    
    # Returning the no of bad words in the filtered words
    return score