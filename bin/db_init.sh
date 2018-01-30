#!/bin/bash

binpath=$(cd `dirname $0`; pwd)
homepath=$(cd `dirname binpath`; pwd)

dbhomepath=$homepath/database
datapath=$dbhomepath/data
logpath=$dbhomepath/log/mongo.log

echo "====== Find the right path for database ======"
echo "Home path is:" $homepath
echo "Database directory path is:" $dbhomepath
echo "=== Data in:" $datapath
echo "=== Log in:" $logpath

mongod --dbpath $datapath --logpath $logpath --port 27017 &


