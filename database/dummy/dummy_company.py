
#coding=utf8

from pymongo import MongoClient
import xlrd
import time
import datetime

def main():
	client = MongoClient('localhost', 27017)
	db = client.oeqiche
	collection = db.supplier

	data = xlrd.open_workbook('bt.xlsx')
	table = data.sheet_by_index(0) 
	nrows = table.nrows 
	id = time.time()	
	

	for i in range(nrows):
		vid = str(int(id)) + "00000" +  str(i)
		print "name", table.cell(i, 0).value
		print "product", table.cell(i, 1).value
		print "customer", table.cell(i, 2).value
		print "offcialContact", table.cell(i, 3).value
		print "offcialPhone", table.cell(i, 4).value
		print "offcialEmail", table.cell(i, 5).value
		print "link", table.cell(i, 6).value
		print "address", table.cell(i, 7).value
		print "brief", table.cell(i, 8).value
		print "location", table.cell(i, 9).value
		print "CreateTime", table.cell(i, 10).value
		print "operator", table.cell(i, 11).value
		print "assets", table.cell(i, 12).value
		collection.insert({'id':vid,
			'owner': 'oeadmin',
			'person': {
				'myname': 'oeadmin',
				'phone': 'NA',
				'email': 'NA',
			},
			'privilege': {
				'verified': 	False,
				'advertise': 	False,
				'superior': 	False,
			},
			'company': {
				'name': table.cell(i, 0).value,
				'product': table.cell(i, 1).value,
				'customer': table.cell(i, 2).value,
				'officalContact': table.cell(i, 3).value,
				'officalPhone': table.cell(i, 4).value,
				'officalEmail': table.cell(i, 5).value,
				'link': table.cell(i, 6).value,
				'address': table.cell(i, 7).value,
				'brief': table.cell(i, 8).value,
				'location': table.cell(i, 9).value,
				'createTime': table.cell(i, 10).value,
				'operator': table.cell(i, 11).value,
				'asserts': table.cell(i, 12).value,
			},
			'product': [],
			'equipment': [],
			'certification': []})

if __name__ == "__main__":
    main()
