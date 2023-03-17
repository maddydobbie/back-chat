from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.config import Config
from backend.model import Question

import csv


app = Flask(__name__,static_folder='backsupport/build',static_url_path='')
app.config.from_object(Config)

db = SQLAlchemy(app)


if __name__ == "__main__":
    print('Creating app.db...')
    try:
        with app.app_context():
            db.create_all()
    except:
        pass
    # chatbot tings
    # open file
    with open('./backend/chatbot.csv', 'r') as csvfile:
        datareader = csv.reader(csvfile)
        for row in datareader:
            question = Question(question = row[0], category = row[1], response1 = row[2], response2 = row[3], response3 = row[4], response4 = row[5], rGood = row[6], rBad = row[7], rEnd = row[8], rChange = row[9], rGoal = row[10], cGood = row[11], cBad = row[12], cChange = row[13], cEnd = row[14], cGoal = row[15])
            db.session.add(question)
            print(question)
            db.session.commit()