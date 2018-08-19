from sklearn import linear_model

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, INTEGER, DateTime, String, func, Date, Float
from sqlalchemy.orm import sessionmaker
from datetime import *
import pymysql
import math

engine = create_engine("mysql+pymysql://root:tvvt14005@127.0.0.1:3306/SummerProj", max_overflow=5, encoding='utf-8')
Base = declarative_base()


class Weather(Base):
    __tablename__ = 'weather'

    date = Column(DateTime, primary_key=True)
    low = Column(INTEGER)
    high = Column(INTEGER)
    type = Column(String)


class Viewhistorytime(Base):
    __tablename__ = 'viewhistorytime'

    windowId = Column(INTEGER, primary_key=True, nullable=False)
    time = Column(DateTime, primary_key=True, nullable=False)
    count = Column(INTEGER)


class Windowliketime(Base):
    __tablename__ = 'windowliketime'

    windowId = Column(INTEGER, primary_key=True, nullable=False)
    time = Column(DateTime, primary_key=True, nullable=False)
    count = Column(INTEGER)
    period = Column(INTEGER, primary_key=True, nullable=False)


class CanteenData(Base):
    __tablename__ = 'data'
    dataId = Column(INTEGER, primary_key=True, autoincrement=True)
    number = Column(INTEGER)
    date = Column(DateTime)
    windowId = Column(INTEGER)


class PredictData(Base):
    __tablename__ = 'predict'
    predictId = Column(INTEGER, primary_key=True, autoincrement=True)
    number = Column(Float)
    windowId = Column(INTEGER)


Base.metadata.create_all(engine)


def parse_weather_type(weather_type):
    for j in range(5, -1, -1):
        if weather_type.find(types[j]) != -1:
            return j
    return 6


types = ['晴', '云', '雨', '霾', '风', '雪']


def predict(window_id):
    X = []
    
    dayLen = 7 * 8
    dateNow = datetime.now()
    dateStart = dateNow + timedelta(days=-dayLen)
    dateStart = datetime(dateStart.year, dateStart.month, dateStart.day, 0, 0, 0)
    dateEnd = dateNow
    dateEnd = datetime(dateEnd.year, dateEnd.month, dateEnd.day, 0, 0, 0)
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    if dateNow.hour < 10 or dateNow.hour >= 20:
        periodToPredict = 0
    elif 10 <= dateNow.hour < 14:
        periodToPredict = 1
    elif 14 <= dateNow.hour < 20:
        periodToPredict = 2
    
    weatherList = session.query(Weather).filter(Weather.date < dateEnd).filter(dateStart <= Weather.date).all()
    
    historyList = session.query(Viewhistorytime).filter(Viewhistorytime.time < dateEnd)\
        .filter(dateStart <= Viewhistorytime.time).filter(Viewhistorytime.windowId == window_id).all()
    
    likeList = session.query(Windowliketime).filter(Windowliketime.time < dateEnd)\
        .filter(dateStart <= Windowliketime.time).filter(Windowliketime.windowId == window_id).all()
    
    dataList = session.query(CanteenData.number)\
        .filter(CanteenData.date < dateEnd).filter(dateStart <= CanteenData.date)\
        .filter(CanteenData.windowId == window_id).order_by(CanteenData.date).all()
    
    y = []
    
    # i * 90 + j
    start = 0
    end = 0
    maxData = max(dataList)[0]
    for i in range(0, 8):
        maxList = []
        for j in range(0, 90):
            if dataList[i * 3 * 7 * 90 + j][0] < maxData:
                X.append([j * j, j, math.sqrt(j)])
                X[-1].append(parse_weather_type(weatherList[7 * i].type))
                X[-1].append((weatherList[7 * i].low + weatherList[7 * i].high) / 2.0)
                X[-1].append(historyList[7 * i].count)
                X[-1].append(likeList[7 * 3 * i + periodToPredict].count)
                y.append(dataList[i * 3 * 7 * 90 + j][0])
            else:
                maxList.append(j)
        start += min(maxList)
        end += max(maxList)
    
    start = int(start/8)
    end = int(end/8)
    
    reg = linear_model.Ridge()
    reg.fit(X, y)
    
    dateStart = dateNow
    dateStart = datetime(dateStart.year, dateStart.month, dateStart.day, 0, 0, 0)
    dateEnd = dateNow + timedelta(days=1)
    dateEnd = datetime(dateEnd.year, dateEnd.month, dateEnd.day, 0, 0, 0)
    weatherList = session.query(Weather).filter(Weather.date < dateEnd).filter(dateStart <= Weather.date).all()
    
    x0 = parse_weather_type(weatherList[0].type)
    x1 = (weatherList[0].low + weatherList[0].high) / 2.0
    x2 = historyList[-7].count
    x3 = likeList[-7 * 3 + periodToPredict].count
    
    xToPredict = []
    
    for i in range(1, 91):
        xToPredict.append([i*i, i, math.sqrt(i), x0, x1, x2, x3])
    
    result = reg.predict(xToPredict)
    
    for i in range(start, end+1):
        result[i] = maxData
    
    for i in range(0, 90):
        if result[i] < 0:
            result[i] = 0
        # result[i] = round(result[i])
    
    print(result)
    
    predictOld = session.query(PredictData).filter(PredictData.windowId == window_id).delete()
    session.commit()
    
    for i in range(0, 90):
        predictData = PredictData(windowId=1, number=float(result[i]))
        session.add(predictData)
    session.commit()
    
    session.close()
