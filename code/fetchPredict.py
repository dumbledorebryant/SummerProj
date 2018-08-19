from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import *
from sqlalchemy import Column, INTEGER, Float


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


@app.route('/data/query', methods=['GET', 'POST'])
def query_data():
    window_id = request.args.get("windowId")
    record = db.session.query(PredictData.number).filter(PredictData.windowId == window_id).all()
    for i in range(0, 90):
        record[i] = record[i][0]
    return jsonify(record)


if __name__ == '__main__':
    app.run()
