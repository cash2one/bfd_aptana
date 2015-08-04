#coding=utf-8

prices={
         'banana':4,
         'apple':2
        }
stock={
       'banana':2,
       'apple':1
       }
print sum([prices[x]*stock[x] for x in prices])