from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, DATETIME
from sqlalchemy.orm import sessionmaker
from datetime import *
from random import *
import math

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
data_total = 0
data_current = 0
idx = 0
time_now_form = 0
dataid = 0
while True:
    time_temp = datetime.now()
    if (time_temp-time_now).seconds == 120:
        idx -= 1
        data_current = int(20 * (1.1 ** idx)+(-1)**(randint(1, 10))*randint(1, 10))
        if data_current < 0:
            data_current = 0
        print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print('number = ' + str(data_current))
        time_now = time_temp
        time_now_form = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        data = CanteenData(number=data_current, date=time_now_form, windowId=1)
        data2 = CanteenData(number=data_current, date=time_now_form, windowId=2)
        session.add(data)
        session.add(data2)
        session.commit()
        data_total += int(data_current)
        data_current = 0
session.close()
