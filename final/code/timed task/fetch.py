from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, INTEGER, DateTime, String, func, Date, Float
from sqlalchemy.orm import sessionmaker
from datetime import *
import pymysql
import requests


engine = create_engine("mysql+pymysql://root:tvvt14005@127.0.0.1:3306/SummerProj", max_overflow=5, encoding='utf-8')
Base = declarative_base()


class Weather(Base):
    __tablename__ = 'weather'

    date = Column(DateTime, primary_key=True)
    low = Column(INTEGER)
    high = Column(INTEGER)
    type = Column(String)


class Window(Base):
    __tablename__ = 'window'

    window_id = Column(INTEGER, primary_key=True)
    restaurant = Column(String, nullable=False)
    windowName = Column(String, nullable=False)
    floor = Column(INTEGER, nullable=False)
    avgTime = Column(DateTime)


class Viewhistorytime(Base):
    __tablename__ = 'viewhistorytime'

    windowId = Column(INTEGER, primary_key=True, nullable=False)
    time = Column(DateTime, primary_key=True, nullable=False)
    count = Column(INTEGER)


class Viewhistory(Base):
    __tablename__ = 'viewhistory'

    userId = Column(INTEGER, primary_key=True, nullable=False)
    windowId = Column(INTEGER, primary_key=True, nullable=False, index=True)
    count = Column(INTEGER)


class Todayfood(Base):
    __tablename__ = 'todayfood'

    foodID = Column(INTEGER, primary_key=True)
    window_id = Column(INTEGER, index=True)
    date = Column(Date, nullable=False)
    time = Column(INTEGER)


class Food(Base):
    __tablename__ = 'food'

    foodID = Column(INTEGER, primary_key=True)
    foodName = Column(String)
    price = Column(Float)
    tips = Column(String)
    window_id = Column(INTEGER, index=True)
    likes = Column(INTEGER)


class Windowliketime(Base):
    __tablename__ = 'windowliketime'

    windowId = Column(INTEGER, primary_key=True, nullable=False)
    time = Column(DateTime, primary_key=True, nullable=False)
    count = Column(INTEGER)
    period = Column(INTEGER, primary_key=True, nullable=False)


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# fetch weather data
url = "http://www.weather.com.cn/data/cityinfo/101020200.html"
req = requests.get(url)
req.encoding = 'utf-8'
reqJSON = req.json()
time_now_form = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
lowTemp = str(reqJSON['weatherinfo']['temp1'])
lowTemp = int(lowTemp[0:len(lowTemp)-1])
highTemp = str(reqJSON['weatherinfo']['temp2'])
highTemp = int(highTemp[0:len(highTemp)-1])
tp = str(reqJSON['weatherinfo']['weather'])
print(time_now_form, lowTemp, highTemp, tp)
weather = Weather(date=time_now_form, low=lowTemp, high=highTemp, type=tp)
session.add(weather)
session.commit()

# fetch view history
windows = session.query(Window.window_id).all()
for windowtuple in windows:
    count = session.query(func.sum(Viewhistory.count)).filter(Viewhistory.windowId == windowtuple[0]).all()[0][0]
    if count is None:
        viewhistorytime = Viewhistorytime(windowId=windowtuple[0],
                                          time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"), count=0)
    else:
        viewhistorytime = Viewhistorytime(windowId=windowtuple[0],
                                          time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"), count=count)
    session.add(viewhistorytime)
session.commit()

# fetch window like
windows = session.query(Window.window_id).all()
for windowtuple in windows:
    for i in range(3):
        like = 0
        foods = session.query(Todayfood.foodID)\
            .filter(Todayfood.window_id == windowtuple[0]).filter(Todayfood.time == i).all()
        for food in foods:
           like += session.query(Food.likes).filter(Food.foodID == food[0]).all()[0][0]
        windowlike = Windowliketime(windowId=windowtuple[0], time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                                    count=like, period=i)
        session.add(windowlike)
session.commit()

session.close()
