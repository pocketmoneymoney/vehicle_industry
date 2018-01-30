from pymongo import MongoClient
import datetime

def main():
    client = MongoClient('localhost', 27017)
    db = client.oeqiche
    collection = db.purchase
    
    insert_bulk_of_purchase(collection)


def insert_bulk_of_purchase(collection):
    """
       db schema:  
           company              string
           name        		string
           material             string
           size                 string/number
           amount               string/number
           type                 string
           published	        date
           expired	        date
    """
    purchases = [{"company":"GuangDong Baolong Car Ltm.",
                  "name":"Flight Seat",
                  "material": "Bulk",
                  "size": "299",
                  "amount": "500",
                  "type": "car",
                  "published": datetime.datetime(2017, 11, 12, 11, 14),
                  "expired": datetime.datetime(2017, 11, 12, 13, 14)}]

    _insert_bulk(collection, purchases)


def _insert_bulk(collection, items):
    result = collection.insert_many(items)
    print result.inserted_ids


if __name__ == "__main__":
    main()
