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


class Windowliketime(Base):
    __tablename__ = 'windowliketime'

    windowId = Column(INTEGER, primary_key=True, nullable=False)
    time = Column(DateTime, primary_key=True, nullable=False)
    count = Column(INTEGER)
    period = Column(INTEGER, primary_key=True, nullable=False)


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

year = 2018
month = 3
day = 1
days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

while month < 9:
    day = 1
    while day <= days[month-1]:
        hour = 12
        minute = random.randint(0, 59)
        second = random.randint(0, 59)
        for i in range(0, 3):
            like = Windowliketime(windowId=1, time=datetime(year, month, day, hour, minute, second),
                                  count=0, period=i)
            session.add(like)
        session.commit()
        day += 1
    month += 1
session.close()
