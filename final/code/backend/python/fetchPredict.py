from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import *
from sqlalchemy import Column, INTEGER, Float, DateTime
import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tvvt14005@localhost:3306/SummerProj'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


class PredictData(db.Model):
    __tablename__ = 'predict'
    predictId = Column(INTEGER, primary_key=True, autoincrement=True)
    number = Column(Float)
    windowId = Column(INTEGER)


class CanteenData(db.Model):
    __tablename__ = 'data'
    dataId = Column(INTEGER, primary_key=True, autoincrement=True)
    number = Column(INTEGER)
    date = Column(DateTime)
    windowId = Column(INTEGER)


@app.route('/data/predict', methods=['GET', 'POST'])
def predict_data():
    window_id = request.args.get("windowId")
    record = db.session.query(PredictData.number).filter(PredictData.windowId == window_id).all()
    if len(record) < 90:
        return jsonify([])
    for i in range(0, 90):
        record[i] = record[i][0]
    return jsonify(record)


@app.route('/data/now', methods=['GET', 'POST'])
def query_data_now():
    window_id = request.args.get("windowId")
    date_now = datetime.datetime.now()
    hour = date_now.hour
    if 7 <= hour < 10:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 7, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 10, 0, 0)
    elif 11 <= hour < 14:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 11, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 14, 0, 0)
    elif 17 <= hour < 22:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 17, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 20, 0, 0)
    else:
        return jsonify([])
    data_list = db.session.query(CanteenData.number) \
        .filter(CanteenData.date < date_end).filter(date_start <= CanteenData.date) \
        .filter(CanteenData.windowId == window_id).order_by(CanteenData.date).all()
    for i in range(0, len(data_list)):
        data_list[i] = data_list[i][0]
    return jsonify(data_list)


@app.route('/data/yesterday', methods=['GET', 'POST'])
def query_data_yesterday():
    window_id = request.args.get("windowId")
    date_now = datetime.datetime.now() + datetime.timedelta(days=-1)
    hour = date_now.hour
    if 7 <= hour < 10:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 7, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 10, 0, 0)
    elif 11 <= hour < 14:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 11, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 14, 0, 0)
    elif 17 <= hour < 22:
        date_start = datetime.datetime(date_now.year, date_now.month, date_now.day, 17, 0, 0)
        date_end = datetime.datetime(date_now.year, date_now.month, date_now.day, 20, 0, 0)
    else:
        return jsonify([])
    data_list = db.session.query(CanteenData.number) \
        .filter(CanteenData.date < date_end).filter(date_start <= CanteenData.date) \
        .filter(CanteenData.windowId == window_id).order_by(CanteenData.date).all()
    for i in range(0, len(data_list)):
        data_list[i] = data_list[i][0]
    return jsonify(data_list)


if __name__ == '__main__':
    app.run()
