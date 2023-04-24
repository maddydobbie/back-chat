from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
import csv
import json

import logging

from os import path
from backend.config import Config
from backend.model import db, Goal, User, Question

app = Flask(__name__,static_folder='backsupport/build',static_url_path='')

app.config.from_object(Config)

cors = CORS(app)
db.init_app(app)

class Object:
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)


if not path.exists('./app.db'):
   # from backend.model import *
    print('Creating app.db...')
    with app.app_context():
        db.create_all()
    # chatbot tings
        print("im new")
        db.session.query(Question).delete()
        db.session.query(User).delete()
        #open file
        with open('./backend/chatbot.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            print(datareader)
            count = 0
            for row in datareader:
                print("this is row" + str(row))
                q = Question(id = count, question = row[0], category = row[1], response1 = row[2], response2 = row[3], response3 = row[4], response4 = row[5], rGood = row[6], rBad = row[7], rEnd = row[8], rChange = row[9], rGoal = row[10], cGood = row[11], cBad = row[12], cChange = row[13], cEnd = row[14], cGoal = row[15])
                db.session.add(q)
                print(q)
                db.session.commit()
                count += 1

@app.route('/')
def serve():
    return "Flask backend for BackSupport. Deployed on Heroku. See https://github.com/maddydobbie/BackSupport for more information."


@app.route('/signup', methods=['POST'])
def signup():
    content = request.json 
    print(content)

    if not content:
        return jsonify({
            "success": False,
            "validMsg":"Malformed user information"
        })

    if ("email" not in content or "name" not in content or "username" not in content or "password" not in content):
        return jsonify({
            "success": False,
            "validMsg":"Malformed user information"
        })

    user = User(email = content["email"], name = content["name"], username = content["username"], password = content["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True
    })


@app.route('/login', methods=['POST', 'GET'])
def login():
    content = request.json
    print(content)

    if not content:
        return jsonify({
            "success": False,
            "validMsg":"Malformed user information"
        })

    if ("username" not in content or "password" not in content):
        return jsonify({
            "success": False,
            "validMsg":"Malformed user information"
        })

    user = User.query.filter_by(username = content["username"]).first()

    if not user:
        return jsonify({
            "success": False,
            "validMsg":"Incorrect user information",
        })

    if user.password != content["password"]:
        return jsonify({
            "success": False,
            "validMsg":"Incorrect user information",
        })

    return jsonify({
        "success": True
    })

@app.route('/goal', methods=['POST', 'GET'])
def goal():
    content = request.json 
    print("PLEASE GOD")

    print("new goal is:")

    # set the list before new goal is added
    goalItems = content["items"]
    print(goalItems)
    print(content)

    # add goal to database
    goal = Goal(title = content["title"], description = content["description"], date = content["date"])
    db.session.add(goal)
    db.session.commit()

    print("new goal is:")
    print(goal)

    g = str(goal)

    me = Object()
    me.title = content["title"]
    me.description = content["description"]
    me.date = content["date"]

    print("this is just me:")
    print(me)

    print("json version:")
    print(me.toJSON())

    print("sucessfully added goal to db")
    goalItems.append(me)
    print("tell me why")

    return jsonify({
        "success": True,
        "items": goalItems,
    })

@app.route('/chatbot', methods=['POST', 'GET'])
def chatbot():

    if request.method == 'POST':
        content = request.json

        print(content["items"])
        print(type(content["items"]))

        items = content["items"]

        # add response to items
        items.append(content["response"])

        # go through db and find response there
        dbQ = Question.query.filter_by(question = content["question"]).first()
        # fiure out if good, bad, goal, change or end response
        # find category relating to response type
        if str(content["rNum"]) in dbQ.rGood.split(","):
            nextCat = dbQ.cGood
        elif str(content["rNum"]) in dbQ.rBad.split(","):
            nextCat = dbQ.cBad
        elif str(content["rNum"]) in dbQ.rChange.split(","):
            nextCat = dbQ.cChange
        elif str(content["rNum"]) in dbQ.rGoal.split(","):
            nextCat = dbQ.cGoal
        elif str(content["rNum"]) in dbQ.rEnd.split(","):
            nextCat = dbQ.cEnd
        else:
            return jsonify({
                "success": False,
                "validMsg":"Incorrect user information",
            })
            

        # go to question with that category, return the question and the response
        newData = Question.query.filter_by(category = nextCat).first()

        if not newData:
            print(nextCat)
            print("ajdhjashdj")
            return jsonify({
                "success": True,
                "endConvo": True,
            })

        # append new question to list
        items.append(newData.question)


        # return new question data
        return jsonify({
            "success": True,
            "question": newData.question,
            "response1": newData.response1,
            "response2": newData.response2,
            "response3": newData.response3,
            "response4": newData.response4,
            "items": items,
        })
    else:
        items = []
        # get starter question from db
        question = Question.query.filter_by(category = "starter").first()

        # append question to items
        items.append(question.question)

        print(items)

        return jsonify({
            "success": True,
            "question": question.question,
            "response1": question.response1,
            "response2": question.response2,
            "response3": question.response3,
            "response4": question.response4,
            "items": items,
        })    
        

# if __name__ != '__main__':
#     gunicorn_logger = logging.getLogger('gunicorn.error')
#     app.logger.handlers = gunicorn_logger.handlers
#     app.logger.setLevel(gunicorn_logger.level)