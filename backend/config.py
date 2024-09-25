from decouple import config
import os

# get the file name and concatenate with the name of the database file we want to create
BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class Config:
    SECRET_KEY = config('SECRET_KEY')
    # we set track sqlalchemy modifications to false as it consumes application resources
    SQLALCHEMY_TRACK_MODIFICATIONS = config(
        'SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

# development config


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR, 'dev.db')


DEBUG = True
SQLALCHEMY_ECHO = True


class ProdConfig(Config):
    pass


class TestConfig(Config):
    pass
