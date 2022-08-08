# FLASK_APP=app.py FLASK_ENV=development flask run
from turtle import heading
from pure_eval import group_expressions
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
  objects = []    
  new=[]
  check_box=[] 
  f = open("static/text/titration.txt", "r")
  para= f.read()
  f = open("static/text/groups_sa.txt", "r")
  groups = f.read()
  qwe=text_preprocessing.main(para)   
  apparatus = []
  for i in qwe:    
    for q in i:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
    heading="Titration"
  return render_template("experimentPage.html", objs = new, para=para, heading=heading, groups=groups)     


@app.route("/experiment1")
def experiment1():
  objects = []    
  new=[]
  check_box=[] 
  f = open("static/text/basic_radical.txt", "r")
  para= f.read()
  f = open("static/text/groups_br.txt", "r")
  groups = f.read()
  qwe=text_preprocessing.main(para)   
  apparatus = []
  for i in qwe:   
    for q in i:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
    heading= "Basic Radical Detection"
  return render_template("experimentPage.html", objs = new, para=para, groups=groups, heading = heading)  

  

@app.route("/experiment2")
def experiment2():
  objects = []   
  new=[]
  check_box=[] 
  f = open("static/text/salt_analysis.txt", "r")
  para= f.read()
  f = open("static/text/groups_sa.txt", "r")
  groups = f.read()
  qwe=text_preprocessing.main(para)  
  apparatus = []
  for i in qwe:   
    for q in i:
        print("this is individual objects in each sent",q)
        objects.append(json.dumps(q))
    new.append(objects)
    check_box.append(objects)
    objects=[]
    heading="Salt Analysis"
    
  return render_template("experimentPage.html", objs = new, para=para, groups=groups, heading=heading)  

if __name__=='__main__':
  app.run(debug=True,port=5000) 