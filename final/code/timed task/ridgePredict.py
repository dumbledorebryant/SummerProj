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
    dayLen = 7 * 8
    dateNow = datetime.now()
    dateStart = dateNow + timedelta(days=-dayLen)
    dateStart = datetime(dateStart.year, dateStart.month, dateStart.day, 0, 0, 0)
    dateEnd = dateNow + timedelta(days=1)
    dateEnd = datetime(dateEnd.year, dateEnd.month, dateEnd.day, 0, 0, 0)
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    if dateNow.hour < 10 or dateNow.hour >= 22:
        periodToPredict = 0
    elif 10 <= dateNow.hour < 14:
        periodToPredict = 1
    elif 14 <= dateNow.hour < 22:
        periodToPredict = 2
    
    weatherList = session.query(Weather).filter(Weather.date < dateEnd).filter(dateStart <= Weather.date).all()
    # print(len(weatherList))
    historyList = session.query(Viewhistorytime).filter(Viewhistorytime.time < dateEnd)\
        .filter(dateStart <= Viewhistorytime.time).filter(Viewhistorytime.windowId == window_id).all()
    # print(len(historyList))
    likeList = session.query(Windowliketime).filter(Windowliketime.time < dateEnd)\
        .filter(dateStart <= Windowliketime.time).filter(Windowliketime.windowId == window_id).all()
    # print(len(likeList))
    dataList = session.query(CanteenData.number)\
        .filter(CanteenData.date < dateEnd).filter(dateStart <= CanteenData.date)\
        .filter(CanteenData.windowId == window_id).order_by(CanteenData.date).all()
    # print(len(dataList))
    X0 = []
    y0 = []
    X = []
    y = []

    for idx in range(0, 56):
        for j in range(0, 90):
            X0.append([(j+1) * (j+1) * (j+1) * (j+1), (j+1) * (j+1) * (j+1), (j+1) * (j+1), j+1])
            X0[-1].append(parse_weather_type(weatherList[idx].type))
            X0[-1].append((weatherList[idx].low + weatherList[idx].high) / 2.0)
            X0[-1].append(historyList[idx].count)
            X0[-1].append(likeList[3 * idx + periodToPredict].count)
            y0.append(dataList[idx * 3 * 90 + periodToPredict * 90 + j][0])

    reg0 = linear_model.Ridge()
    reg0.fit(X0, y0)
    coef = reg0.coef_

    for idx in range(0, 8):
        print(dataList[idx * 3 * 7 * 90 + periodToPredict * 90:idx * 3 * 7 * 90 + periodToPredict * 90+90])
        for j in range(0, 90):
             X.append([(j+1) * (j+1) * (j+1) * (j+1), (j+1) * (j+1) * (j+1), (j+1) * (j+1), j+1])
             y.append(dataList[idx * 3 * 7 * 90 + periodToPredict * 90 + j][0] - parse_weather_type(weatherList[7 * idx].type) * coef[0]
                      - (weatherList[7 * idx].low + weatherList[7 * idx].high) / 2.0 * coef[1] - historyList[7 * idx].count * coef[2]
                      - likeList[7 * 3 * idx + periodToPredict].count * coef[3])

    reg = linear_model.Ridge()
    reg.fit(X, y)
    
    # dateStart = dateNow
    # dateStart = datetime(dateStart.year, dateStart.month, dateStart.day, 0, 0, 0)
    # dateEnd = dateNow + timedelta(days=1)
    # dateEnd = datetime(dateEnd.year, dateEnd.month, dateEnd.day, 0, 0, 0)
    # weatherList = session.query(Weather).filter(Weather.date < dateEnd).filter(dateStart <= Weather.date).all()
    # historyList = session.query(Windowliketime).filter(Windowliketime.time < dateEnd)
    print(weatherList[-1].type)
    print(weatherList[-1].low)
    print(weatherList[-1].high)
    print(historyList[-1].count)
    print(likeList[-3 + periodToPredict].count)
    x0 = parse_weather_type(weatherList[-1].type)
    x1 = (weatherList[-1].low + weatherList[-1].high) / 2.0
    x2 = historyList[-1].count
    x3 = likeList[-3 + periodToPredict].count
    
    xToPredict = []
    
    for i in range(1, 91):
        xToPredict.append([i*i*i*i, i*i*i, i*i, i])
    
    result = reg.predict(xToPredict)

    bias = x0 * coef[0] + x1 * coef[1] + x2 * coef[2] + x3 * coef[3]
    for idx in range(0, 90):
        result[idx] += bias
        if result[idx] < 0:
            result[idx] = 0
        result[idx] = round(result[idx] * 100)/100.0
    print(result)
    
    session.query(PredictData).filter(PredictData.windowId == window_id).delete()
    session.commit()
    
    for i in range(0, 90):
        predictData = PredictData(windowId=window_id, number=float(result[i]))
        session.add(predictData)
    session.commit()
    
    session.close()



for i in range(1, 40):
    predict(i)
