#coding=utf8

from pymongo import MongoClient
import datetime

def main():
    client = MongoClient('localhost', 27017)
    db = client.oeqiche
    collection = db.category
    categories = [
       {"name": "新能源",
        "id": "1",
        "subtype": [
	    {"name": "电池",
             "id":"1",
             "item": [{"name":"锂电池", "id":"1"}, {"name":"燃料电池", "id":"2"}]},
	    {"name": "电机",
             "id":"2",
             "item": [{"name":"电机", "id":"3"}]},
	    {"name": "电控",
             "id":"3",
             "item": [{"name":"电控", "id":"4"}]},
	    {"name": "BMS",
             "id":"4",
             "item": [{"name":"BMS", "id":"5"}]},
	    {"name": "VCU",
             "id":"5",
             "item": [{"name":"VCU", "id":"6"}]}],},

       {"name": "发动机",
        "id": "2",
        "subtype": [
	    {"name": "发动机总成",
             "id":"6",
             "item": [{"name":"汽油机", "id":"7"}, {"name":"柴油机", "id":"8"}]},
	    {"name": "发动机基本零部件",
             "id":"7",
             "item": [{"name":"气缸盖罩", "id":"9"}, {"name":"气缸盖", "id":"10"}, {"name":"气缸体", "id":"11"}, {"name":"气缸套", "id":"12"}]},
	    {"name": "配气机构",
             "id":"8",
             "item": [{"name":"进排气门", "id":"15"}, {"name":"凸轮轴", "id":"14"}, {"name":"摇臂&摇臂轴","id":"13"}]}]}]

    _insert_bulk(collection, categories)



def _insert_bulk(collection, items):
    result = collection.insert_many(items)
    print result.inserted_ids


if __name__ == "__main__":
    main()
