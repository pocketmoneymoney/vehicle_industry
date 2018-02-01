#coding=utf8

from pymongo import MongoClient
import datetime

def main():
    client = MongoClient('localhost', 27017)
    db = client.oeqiche
    collection = db.purchase
    
    #insert_bulk_of_purchase(db.purchase)
    insert_bulk_of_interview(db.interview)


def insert_bulk_of_interview(collection):
    """
        db schema:
            title		string
	    author		string
	    publishedTime	date
	    content		string
	    picture		list
	    {    
		 address	string
		 position	string
	    }
    """
    interviews = [{"title": "Tomorrow is coming",
                  "author": "alvin",
                  "publishedTime": datetime.datetime(2017, 11, 12, 11, 14),
		  "content": u"""蔚来ES8，采用了诺贝丽斯铝合金车身

2017年12月16日晚的五棵松体育馆内，蔚来ES8以7座SUV车型宣布百公里加速4.4秒时，引发全场沸腾。这一成绩的取得，除了配备最大功率达到240kw的前后双电机，还得益于全铝车身的轻量化设计。

蔚来汽车董事长李斌在现场指出，ES8使用的铝合金牌号是7000系列，目前主要用于航空航天领域。为蔚来提供铝合金车身方案的公司就是诺贝丽斯（Novelis Aluminum）。

诺贝丽斯是一家全球知名的铝合金压延产品制造商，总部位于美国乔治亚州亚特兰大市，在汽车轻量化应用领域拥有超过四十年的积累，宝马、奔驰、奥迪、捷豹路虎以及福特等汽车企业都是其服务客户。

而且，作为一家铝材供应商，诺贝丽斯还拥有一套汽车闭环回收系统，只要汽车制造商在生产端做好废料分类，诺贝丽斯就能对这些铝合金材料实现回收。

“目前诺贝丽斯整体产品的原材料大概有一半是回收来的。”日前，诺贝丽斯全球汽车事业部副总裁Pierre Labat（皮埃尔·拉巴特）在上海的一次考察途中，接受了钛媒体的采访。""",
		  "picture": {
			    "address": "/storage/interview/1.png",
			    "position": "<a herf>"
			}
		}]

    _insert_bulk(collection, interviews)


def insert_bulk_of_purchase(collection):
    """
       db schema:  
           company              string
           name        		string
           material             string
           size                 string/number
           amount               string/number
           type                 string
           publishedTime        date
           expiredTime          date
    """
    purchases = [{"company":"ShanDong Baolong Car Ltm.",
                  "name":"Car Seat",
                  "material": "Bulk",
                  "size": "299",
                  "amount": "500",
                  "type": "car",
                  "publishedTime": datetime.datetime(2017, 11, 12, 11, 14),
                  "expiredTime": datetime.datetime(2017, 11, 12, 13, 14)}]

    _insert_bulk(collection, purchases)


def _insert_bulk(collection, items):
    result = collection.insert_many(items)
    print result.inserted_ids


if __name__ == "__main__":
    main()
