import sys
from datetime import datetime
sys.path.append('..')
from app import db

class User(db.Model):
    __tablename__ = 'User'
    email = db.Column(db.String(40), primary_key=True, nullable=False)
    name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(40), nullable=False)

class Question(db.Model):
    __tablename__ = 'Question'
    id = db.Column(db.String(40), primary_key=True, nullable=False)
    question = db.Column(db.String(40), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    response1 = db.Column(db.String(40), nullable=False)
    response2 = db.Column(db.String(40), nullable=False)
    response3 = db.Column(db.String(40), nullable=False)
    response4 = db.Column(db.String(40), nullable=False)
    rGood = db.Column(db.String(40), nullable=False)
    rBad = db.Column(db.String(40), nullable=False)
    rEnd = db.Column(db.String(40), nullable=False)
    rChange = db.Column(db.String(40), nullable=False)
    rGoal = db.Column(db.String(40), nullable=False)
    cGood = db.Column(db.String(40), nullable=False)
    cBad = db.Column(db.String(40), nullable=False)
    cChange = db.Column(db.String(40), nullable=False)
    cEnd = db.Column(db.String(40), nullable=False)
    cGoal = db.Column(db.String(40), nullable=False)

class Goal(db.Model):
    __tablename__ = 'Goal'
    title = db.Column(db.String(40), primary_key=True, nullable=False)
    description = db.Column(db.String(40), primary_key=True, nullable=False)
    date = db.Column(db.String(40), primary_key=True, nullable=False)