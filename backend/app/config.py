import os


class Config(object):
    SQLALCHEMY_DATABASE_URL = "sqlite:///db/friends.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
