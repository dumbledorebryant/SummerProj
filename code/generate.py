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


def generate(window_id, idx_1, idx_2, idx_3):
    Session = sessionmaker(bind=engine)
    session = Session()

    session.query(CanteenData).filter(CanteenData.windowId == window_id).delete()
    session.commit()
    x = numpy.arange(0, 15, 15/90)
    y = 80 * norm.pdf(x, 7, 3)   # normal 0-0 max 13
    y2 = 80 * norm.pdf(x, 7, 5)    # average  breakfast 2-2 max 7
    x2 = numpy.arange(3, 18, 15/90)
    y3 = 80 * norm.pdf(x2, 7, 3)  # hot 5-0 max 13
    x3 = numpy.arange(6, 13, 7/90)
    y4 = 60 * norm.pdf(x3, 9, 2)  # 3-2 max 12
    y5 = 60 * norm.pdf(x, 7, 3)  # 0-0 max 8
    y6 = 60 * norm.pdf(x, 7, 5)  # 2-2 max 5
    y7 = 60 * norm.pdf(x2, 7, 3)  # 3-0 max 8
    yMax = int(round(y.max()))
    y2Max = int(round(y2.max()))
    y3Max = int(round(y3.max()))
    y4Max = int(round(y4.max()))
    y5Max = int(round(y5.max()))
    y6Max = int(round(y6.max()))
    y7Max = int(round(y7.max()))
    yList = [y, y2, y3, y4, y5, y6, y7]
    yMaxList = [yMax, y2Max, y3Max, y4Max, y5Max, y6Max, y7Max]
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
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    w = 0
    while month < 10:
        day = 1
        while day <= days[month-1]:
            hour1 = 7
            hour2 = 11
            hour3 = 17
            minute = 0
            second = random.randint(0, 59)
            idx1 = idx_1 % 7
            idx2 = idx_2 % 7
            idx3 = idx_3 % 7
            for i in range(0, 3):
                for j in range(0, 30):
                    date1 = datetime(year, month, day, hour1 + i, minute + 2*j, second)
                    date2 = datetime(year, month, day, hour2 + i, minute + 2*j, second)
                    date3 = datetime(year, month, day, hour3 + i, minute + 2*j, second)
                    ydata1 = yList[idx1][(30 * i + j + w % 7) % 90]
                    ydata2 = yList[idx2][(30 * i + j + w % 7) % 90]
                    ydata3 = yList[idx3][(30 * i + j + w % 7) % 90]
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
                    data1 = CanteenData(number=data_current, date=date1, windowId=window_id)
                    data2 = CanteenData(number=data_current2, date=date2, windowId=window_id)
                    data3 = CanteenData(number=data_current3, date=date3, windowId=window_id)
                    session.add(data1)
                    session.add(data2)
                    session.add(data3)
                    session.commit()
            day += 1
            w += 1
        month += 1

    session.close()


for i in range(1, 40):
    generate(window_id=i, idx_1=i, idx_2=i+1, idx_3=i+2)
    print(i)
