import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = "sqlite:///friends.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
