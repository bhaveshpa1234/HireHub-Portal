from pymongo import MongoClient
from dotenv import load_dotenv
import certifi
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL, tls=True, tlsCAFile=certifi.where())
db = client["smart_internship1"]

def remove_duplicates(collection_name):
    collection = db[collection_name]
    pipeline = [
        {
            "$group": {
                "_id": "$email",
                "ids": {"$push": "$_id"},
                "count": {"$sum": 1}
            }
        },
        {
            "$match": {
                "count": {"$gt": 1},
                "_id": {"$ne": None}
            }
        }
    ]

    duplicates = list(collection.aggregate(pipeline))

    for dup in duplicates:
        ids = dup["ids"]
        keep_id = ids[0]
        delete_ids = ids[1:]

        collection.delete_many({"_id": {"$in": delete_ids}})
        print(f"{collection_name}: kept {keep_id}, deleted {len(delete_ids)} duplicate(s) for email {dup['_id']}")

remove_duplicates("students")
remove_duplicates("companies")
remove_duplicates("admins")

print("Duplicate cleanup done.")