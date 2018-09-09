from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, INTEGER, DateTime, String
from sqlalchemy.orm import sessionmaker
from datetime import *
import random
import math
import numpy
from scipy.stats import *

engine = create_engine("mysql+pymysql://root:tvvt14005@127.0.0.1:3306/SummerProj", max_overflow=5, encoding='utf-8')
Base = declarative_base()


class Weather(Base):
    __tablename__ = 'weather'

    date = Column(DateTime, primary_key=True)
    low = Column(INTEGER)
    high = Column(INTEGER)
    type = Column(String)


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

session.query(Weather).delete()
year = 2018
month = 3
day = 1
days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
types = ['晴', '云', '雨', '霾', '风', '雪']

while month < 10:
    day = 1
    while day <= days[month-1]:
        hour = 12
        minute = random.randint(0, 59)
        second = random.randint(0, 59)
        weather = Weather(date=datetime(year, month, day, hour, minute, second),
                          low=random.randint(20, 30), high=random.randint(30, 40),
                          type=types[random.randint(0, 5)])
        session.add(weather)
        session.commit()
        day += 1
    month += 1
session.close()
