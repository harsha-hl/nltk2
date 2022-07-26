# FLASK_APP=app.py FLASK_ENV=development flask run
import text_preprocessing 
from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, jsonify
import json

app = Flask(__name__)  

# @app.route("/")
# def home():
#   return render_template("h.html")  


@app.route("/experiment")
def experiment(): 
  objects = []    # a Python object (dict):
  new=[]
  check_box=[] 
  f = open("static/text/salt_analysis.txt", "r")
  para= f.read()
  #length = text_preprocessing.sen()    #var is the no of sentences in the paragraph
  qwe=text_preprocessing.main()   # qwe={(name:testtube,pos:up),(name:beaker,pos:down)}
  var = text_preprocessing.sen()
  apparatus = ""
  print("this is var",var)
  for i in range(var):    #if return render_template is within this for loop only the objects of first sentence are displayed
    print("this is newest",qwe[i])   #qwe[i] is each sentence
    for q in qwe[i]:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
  return render_template("experimentPage.html", objs = new, para=para,abc=check_box, instruments = apparatus)     


@app.route("/experiment1")
def experiment1():
  objects = []    # a Python object (dict):
  new=[]
  check_box=[] 
  f = open("static/text/basic_radical.txt", "r")
  para= f.read()
  #length = text_preprocessing.sen()    #var is the no of sentences in the paragraph
  qwe=text_preprocessing.main()   # qwe={(name:testtube,pos:up),(name:beaker,pos:down)}
  var = text_preprocessing.sen()
  apparatus = ""
  print("this is var",var)
  for i in range(var):    #if return render_template is within this for loop only the objects of first sentence are displayed
    print("this is newest",qwe[i])   #qwe[i] is each sentence
    for q in qwe[i]:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
  return render_template("experimentPage.html", objs = new, para=para,abc=check_box, instruments = apparatus)  

  

@app.route("/experiment2")
def experiment2():
  objects = []    # a Python object (dict):
  new=[]
  check_box=[] 
  f = open("static/text/salt_analysis.txt", "r")
  para= f.read()
  #length = text_preprocessing.sen()    #var is the no of sentences in the paragraph
  qwe=text_preprocessing.main()   # qwe={(name:testtube,pos:up),(name:beaker,pos:down)}
  var = text_preprocessing.sen()
  apparatus = "" 
  print("this is var",var)
  for i in range(var):    #if return render_template is within this for loop only the objects of first sentence are displayed
    print("this is newest",qwe[i])   #qwe[i] is each sentence
    for q in qwe[i]:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
    
  return render_template("experimentPage.html", objs = new, para=para,abc=check_box, instruments = apparatus)  

if __name__=='__main__':
  app.run(debug=True,port=5000) 