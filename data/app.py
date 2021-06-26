from flask import Flask,request,jsonify
import pickle
import pandas as pd
import numpy as np
from sklearn import tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, classification_report, accuracy_score
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import scipy.stats as ss
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
    f = request.files['file']
    df=pd.read_csv(f)
    norm = data[data['heart']==0]
    db = data[data['heart']==1]
    z_scores = ss.zscore(norm[['fbs','bmi','waist','tchol','hdl','bpdi','bpsy']])
    abs_z_scores = np.abs(z_scores)
    filtered_entries = (abs_z_scores < 3).all(axis=1)
    norm = norm[filtered_entries].sample(n=1500)
    z_scores = ss.zscore(db[['fbs','bmi','waist','tchol','hdl','bpdi','bpsy']])
    abs_z_scores = np.abs(z_scores)
    filtered_entries = (abs_z_scores < 3).all(axis=1)
    db = db[filtered_entries]
    hdata = norm.append(db).sort_index().reset_index().drop(['index','bmi','diabetes'],axis=1)

    norm = data[data['diabetes']==0].sample(n=3000)
    db = data[data['diabetes']==1]
    z_scores = ss.zscore(norm[['fbs','bmi','waist','tchol','hdl','bpsy']])
    abs_z_scores = np.abs(z_scores)
    filtered_entries = (abs_z_scores < 3).all(axis=1)
    norm = norm[filtered_entries].sample(1500)
    z_scores = ss.zscore(db[['fbs','bmi','waist','tchol','hdl','bpsy']])
    abs_z_scores = np.abs(z_scores)
    filtered_entries = (abs_z_scores < 3).all(axis=1)
    db = db[filtered_entries]
    ddata = norm.append(db).sort_index().reset_index().drop(['index','bpdi','heart'],axis=1)

    db_y = ddata.diabetes
    db_x = ddata.drop('diabetes',axis=1)
    clf = tree.DecisionTreeClassifier(max_depth=5)
    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    dbtree = clf.fit(x_train, y_train)
    y_scores = dbtree.predict(x_test)
    dbtree_scores = f1_score(y_test, y_scores)

    hd_y = hdata.heart
    hd_x = hdata.drop('heart',axis=1)
    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    hdtree = clf.fit(x_train, y_train)
    y_scores = hdtree.predict(x_test)
    hdtree_scores = f1_score(y_test, y_scores)

    clf = RandomForestClassifier(max_depth=7)
    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    dbforest = clf.fit(x_train, y_train)
    y_scores = dbforest.predict(x_test)
    dbforest_scores = f1_score(y_test, y_scores)

    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    hdforest = clf.fit(x_train, y_train)
    y_scores = hdforest.predict(x_test)
    hdforest_scores = f1_score(y_test, y_scores)

    clf = MLPClassifier(solver='adam', hidden_layer_sizes=(16, 16, 8),max_iter=500)
    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    dbmlp = clf.fit(x_train, y_train)
    y_scores = dbmlp.predict(x_test)
    dbmlp_scores = f1_score(y_test, y_scores)

    x_train, x_test, y_train, y_test = train_test_split(db_x, db_y, test_size=0.3)
    hdmlp = clf.fit(x_train, y_train)
    y_scores = hdmlp.predict(x_test)
    hdmlp_scores = f1_score(y_test, y_scores)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)