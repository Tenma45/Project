from flask import Flask,request,jsonify
import pickle
import pandas as pd
import numpy as np
import sklearn
import os

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
dbPath = os.path.join(APP_ROOT, "./model/db_forest.sav")
hdPath = os.path.join(APP_ROOT, "./model/hd_forest.sav")
db = pickle.load(open(dbPath, "rb"))
hd = pickle.load(open(hdPath, "rb"))

app = Flask(__name__)

@app.route('/predict/', methods=['POST'])
def predict():
    target = request.args.get('target')
    data = request.get_json()
    df = pd.DataFrame([data])
    if(target == 'db'):
        # app.logger.info('With data : [%s]' %data)
        result = db.predict(df)[-1]
        app.logger.info(result)
        return str(result)
    elif(target == 'hd'):
        # app.logger.info('With data : [%s]' %data)
        result = hd.predict(df)[-1]
        return str(result)
    return jsonify({"status": 100, "message": "Input params is diabete or heart."})

@app.route('/update/', methods=['POST'])	
def update():
	target = request.args.get('target')
	data = request.get_json()
	f = request.files['file']
	df = pd.read_csv(f)
	# recieve file form frontend
	if(target == 'db'):
		# update diabetes code
		pickle.dump(model, open('model/db_forest.sav', 'wb'))
		db = pickle.load(open('model/db_forest.sav','rb'))
	elif(target == 'heart'):
		# update heart code
		pickle.dump(model, open('model/hd_forest.sav', 'wb'))
		hd = pickle.load(open('model/hd_forest.sav','rb'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)