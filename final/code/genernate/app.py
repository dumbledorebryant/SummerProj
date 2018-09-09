from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, DATETIME
from sqlalchemy.orm import sessionmaker
from datetime import *
import random
import math
import numpy
from scipy.stats import *

engine = create_engine("mysql+pymysql://root:tvvt14005@127.0.0.1:3306/SummerProj", max_overflow=5, encoding='utf-8')
Base = declarative_base()


class CanteenData(Base):
    __tablename__ = 'data'
    dataId = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(Integer)
    date = Column(DATETIME)
    windowId = Column(Integer)

    def __str__(self):
        return '<%r : %r>' % (self.number, self.time)


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

time_start = datetime.now()
time_now = datetime.now()
time_temp = 0
# data_total = 0
data_current = 0
data_current2 = 0
data_current3 = 0
data_current4 = 0
idx = 0
time_now_form = 0
dataid = 0

x = numpy.arange(0, 15, 15/90)
y = 80 * norm.pdf(x, 7, 3)   # normal 0-0 max 13
y2 = 80 * norm.pdf(x, 7, 5)    # average  breakfast 2-2 max 7
x2 = numpy.arange(3, 18, 15/90)
y3 = 80 * norm.pdf(x2, 7, 3)  # hot 5-0 max 13
x3 = numpy.arange(6, 13, 7/90)
y4 = 80 * norm.pdf(x3, 9, 2)  # 6-3 max 20

yList = [y, y2, y3, y4]
yNow = y
yNow2 = y2
yNow3 = y3
yNow4 = y4
while True:
    time_temp = datetime.now()
    if (time_temp-time_now).seconds == 120:
        # idx -= 1
        # data_current = int(20 * (1.1 ** idx)+(-1)**(randint(1, 10))*randint(1, 10))
        if idx == 90:
            yNow = yList[random.randint(0, 3)]
            yNow2 = yList[random.randint(0, 3)]
            yNow3 = yList[random.randint(0, 3)]
            yNow4 = yList[random.randint(0, 3)]
            idx = 0
        data_current = int(round(yNow[idx] + ((-1)**random.randint(1, 10)) * random.randint(0, 3)))
        if data_current < 0:
            data_current = 0
        data_current2 = int(round(yNow2[idx] + (-1) ** (random.randint(1, 10)) * random.randint(0, 3)))
        if data_current2 < 0:
            data_current2 = 0
        data_current3 = int(round(yNow3[idx] + (-1) ** (random.randint(1, 10)) * random.randint(0, 3)))
        if data_current3 < 0:
            data_current3 = 0
        data_current4 = int(round(yNow4[idx] + (-1) ** (random.randint(1, 10)) * random.randint(0, 3)))
        if data_current4 < 0:
            data_current4 = 0
        print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print('number1 = ' + str(data_current))
        print('number2 = ' + str(data_current2))
        print('number3 = ' + str(data_current3))
        print('number4 = ' + str(data_current4))
        time_now = time_temp
        time_now_form = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        data = CanteenData(number=data_current, date=time_now_form, windowId=1)
        data2 = CanteenData(number=data_current2, date=time_now_form, windowId=2)
        data3 = CanteenData(number=data_current3, date=time_now_form, windowId=3)
        data4 = CanteenData(number=data_current4, date=time_now_form, windowId=4)
        session.add(data)
        session.add(data2)
        session.add(data3)
        session.add(data4)
        session.commit()
        # data_total += int(data_current)
        # data_current = 0
        idx += 1
session.close()
