import time
import sys
import json
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from transformers import AutoTokenizer, AutoModelWithLMHead

folder_name = 'cache/'
def main(filename: str):
    print('Test Script complete {}'.format(filename))
    with open (f'{folder_name}{filename}.json', 'r') as f:
        line = json.load(f)
    ids = []
    docs = []
    for l in line:
        ids.append(l["_id"])
        docs.append(l["messageText"])
    # cluster first
    embed_model = SentenceTransformer('all-MiniLM-L6-v2')
    sentence_embeddings = embed_model.encode(docs)
    # k_cluster = len(docs) // 10 if len(docs) > 20 else 2
    k_cluster = len(docs) // 5 if len(docs) > 10 else 2
    kmeans = KMeans(n_clusters=k_cluster, random_state=0).fit(sentence_embeddings)
    labels = kmeans.labels_
    # labels is a ndarray shows the cluster type, length is text_num
    cluster = dict()
    for i, d in enumerate(docs):
        key = labels[i]
        cluster[key] = cluster.get(key,"") + d + '. '
    # summary generation 
    tokenizer = AutoTokenizer.from_pretrained("t5-small")
    summary_model = AutoModelWithLMHead.from_pretrained("t5-small")
    cluster_summary_map = dict()
    for k in cluster:
        text = cluster[k]
        tokenized_text = tokenizer.encode(text, return_tensors="pt")
        summary_ids = summary_model.generate(tokenized_text,
                                        num_beams=4,
                                        no_repeat_ngram_size=2,
                                        min_length=10,
                                        max_length=30,
                                        early_stopping=True)
        output = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        cluster_summary_map[k] = output
    cluster_ids_map = dict()
    cluster_original_map = dict()
    for i in range(len(ids)):
        key = labels[i]
        if key not in cluster_ids_map:
            cluster_ids_map[key] = []
            cluster_original_map[key] = []
        else:
            cluster_ids_map[key].append(ids[i])
            cluster_original_map[key].append(docs[i])
    data = []
    for key in cluster_ids_map:
        sample = dict()
        sample['summary'] = cluster_summary_map[key]
        sample['ids'] = cluster_ids_map[key]
        sample['original'] = cluster_original_map[key]
        data.append(sample.copy())
    print(data)
    with open(f'{folder_name}{filename}.out.json', 'w') as f:
        json.dump(data, f, indent=4) 
if __name__ =="__main__":
    main(sys.argv[1])
