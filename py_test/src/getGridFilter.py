#coding=utf-8

import os
import re

#pattern_tilte=re.compile(r'title(\s|\n)*?:(\s|\n)*?{(\s|\n)*?content(\s|\n)*?:.*?}')
pattern_tilte = re.compile(r'title.*?:.*?{.*?content.*?:.*?}', re.S)
#pattern_tilte=re.compile(r'content:\'.*?\'',re.S)
pattern_fixColModel = re.compile(r'fixColModel\s*?:.*?}', re.S)
pattern_colModel = re.compile(r'colModel\s*?:\s*?\[.*?\]', re.S)
pattern_defaultCols = re.compile(r'defaultCols\s*?:\s*?\[.*?\]', re.S)
pattern_orderCols = re.compile(r'orderCols\s*?:\s*?\[.*?\]', re.S)
pattern_goodsCols = re.compile(r'goodsCols\s*?:\s*?\[.*?\]', re.S)


os.chdir("E://bae//bae//trunk//src//main//webapp//function//chart//")

def findContent(r, content):
       result = r.findall(content)
       if len(result) > 0:
           return re.sub(r'\n|\s', r'', result[0])
       else:
           return ''  

if __name__ == '__main__':
    fixColModelRander = []
    colModelRander = []
    hasChildModel = []
    for file in os.listdir("."):
            if file.endswith(".js") and file not in ['sales_buy.js', 'synthetical.js']:
                content = open(file).read()
                title = findContent(pattern_tilte, content)
#                title='%s'%title.replace(r'title:{content:', '').repalce(r'}','')
                title = re.sub(r'title:{content:|\'|}', r'', title)
#title:{content:'购物车分析'}
                fixColModel = findContent(pattern_fixColModel, content)
                if r'onRander:function' in fixColModel:
                    fixColModelRander.append(file)
                    fixColModel = re.sub(r',onRander:function.*', '}', fixColModel)
                    continue
                if r'{'  not in fixColModel:
                    hasChildModel.append(file)
                    continue
                if r'selfModel' in fixColModel:
                     hasChildModel.append(file)
                     continue
                colModel = findContent(pattern_colModel, content)
                if r'onRander:function' in colModel:
                    colModelRander.append(file)
                    continue
                
                oldtype = [r'onRander:formatGrid.scale1', r'onRander:formatGrid.scale', r'onRander:formatGrid.numFix', r'onRander:formatGrid.decimal', r'onRander:formatGrid.money', r'onRander:formatGrid.time']
                newtype = [r'type:"rate1"', r'type:"rate"', r'type:"numFix"', r'type:"decimal"', r'type:"money"', r'type:"time"']
                
                for i in range(len(oldtype)):
                     fixColModel = fixColModel.replace(oldtype[i], newtype[i])
                     colModel = colModel.replace(oldtype[i], newtype[i])
                defaultCols = findContent(pattern_defaultCols, content)
                if defaultCols == '':
                    defaultCols = 'defaultCols:[]'
                orderCols = findContent(pattern_orderCols, content)
                if orderCols == '':
                    orderCols = 'orderCols:[]'
                goodsCols = findContent(pattern_goodsCols, content)
                if goodsCols == '':
                    goodsCols = 'goodsCols:[]'
                print file, title, fixColModel, colModel, defaultCols, orderCols, goodsCols
    print fixColModelRander
    print colModelRander
    print hasChildModel
