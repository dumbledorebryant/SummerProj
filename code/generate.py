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

x = numpy.arange(0, 15, 15/90)
y = 80 * norm.pdf(x, 7, 3)   # normal 0-0 max 13
y2 = 80 * norm.pdf(x, 7, 5)    # average  breakfast 2-2 max 7
x2 = numpy.arange(3, 18, 15/90)
y3 = 80 * norm.pdf(x2, 7, 3)  # hot 5-0 max 13
x3 = numpy.arange(6, 13, 7/90)
y4 = 80 * norm.pdf(x3, 9, 2)  # 6-3 max 20
yMax = int(round(y.max()))
y2Max = int(round(y2.max()))
y3Max = int(round(y3.max()))
y4Max = int(round(y4.max()))
yList = [y, y2, y3, y4]
yMaxList = [yMax, y2Max, y3Max, y4Max]
data = []
for i in y4:
    if int(round(i)) == y4Max:
        data_current = y4Max
    else:
        data_current = int(round(i + ((-1)**random.randint(1, 10)) * random.randint(0, 3)))
        if data_current < 0:
            data_current = 0
        elif data_current > y4Max:
            data_current = y4Max
    data.append(data_current)

year = 2018
month = 3
day = 1
days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
while month < 8:
    day = 1
    while day <= days[month-1]:
        hour1 = 7
        hour2 = 11
        hour3 = 17
        minute = 0
        second = random.randint(0, 59)
        idx1 = random.randint(0, 3)
        idx2 = random.randint(0, 3)
        idx3 = random.randint(0, 3)
        for i in range(0, 3):
            for j in range(0, 30):
                date1 = datetime(year, month, day, hour1 + i, minute + 2*j, second)
                date2 = datetime(year, month, day, hour2 + i, minute + 2*j, second)
                date3 = datetime(year, month, day, hour3 + i, minute + 2*j, second)
                ydata1 = yList[idx1][30*i+j]
                ydata2 = yList[idx2][30*i+j]
                ydata3 = yList[idx3][30*i+j]
                if int(round(ydata1)) == yMaxList[idx1]:
                    data_current = yMaxList[idx1]
                else:
                    data_current = int(round(ydata1 + ((-1) ** random.randint(1, 10)) * random.randint(0, 3)))
                    if data_current < 0:
                        data_current = 0
                    elif data_current > yMaxList[idx1]:
                        data_current = yMaxList[idx1]
                if int(round(ydata2)) == yMaxList[idx2]:
                    data_current2 = yMaxList[idx2]
                else:
                    data_current2 = int(round(ydata2 + ((-1) ** random.randint(1, 10)) * random.randint(0, 3)))
                    if data_current2 < 0:
                        data_current2 = 0
                    elif data_current2 > yMaxList[idx2]:
                        data_current2 = yMaxList[idx2]
                if int(round(ydata3)) == yMaxList[idx3]:
                    data_current3 = yMaxList[idx3]
                else:
                    data_current3 = int(round(ydata3 + ((-1) ** random.randint(1, 10)) * random.randint(0, 3)))
                    if data_current3 < 0:
                        data_current3 = 0
                    elif data_current3 > yMaxList[idx3]:
                        data_current3 = yMaxList[idx3]
                print(data_current, date1, '\n')
                print(data_current2, date2, '\n')
                print(data_current3, date3, '\n')
                data1 = CanteenData(number=data_current, date=date1, windowId=1)
                data2 = CanteenData(number=data_current, date=date2, windowId=1)
                data3 = CanteenData(number=data_current, date=date3, windowId=1)
                session.add(data1)
                session.add(data2)
                session.add(data3)
                session.commit()
        day += 1
    month += 1

session.close()

