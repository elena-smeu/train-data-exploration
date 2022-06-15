from flask import Flask, render_template
import json
import pandas as pd

# Loading stop information
with open("./stops_ALL.json", 'r') as ft:
        stop_dict = json.load(ft)

stops = pd.DataFrame(stop_dict)

# trip information
stop_times = pd.read_table("./GFTS_Fahrplan_OEBB/stop_times.txt", sep = ",")
stop_times = stop_times.drop(columns=["stop_headsign", "shape_dist_traveled"])

# Merging the stop information on the trip information
stop_times_coord = pd.merge(stop_times, stops, on='stop_id', how='left')
stop_times_coord["hour"] = stop_times_coord["arrival_time"].str[:2].astype(int)
stop_times_coord["hour"] = stop_times_coord["hour"].apply(lambda x: x if x < 24 else x - 24)
stop_times_coord = stop_times_coord.drop(["pickup_type", "drop_off_type", "departure_time", "country"], axis = 1)

app = Flask(__name__)

# ensure that we can reload when we change the HTML / JS for debugging
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/trips/<int:start_hour>/<int:end_hour>')
def create_data(start_hour, end_hour):

    start_hour = 9  
    end_hour = 12

    stops_data = stop_times_coord[(stop_times_coord["hour"] >= start_hour) & (stop_times_coord["hour"] <= end_hour)]

# Creating a list fo dicts with information of the path with coordinates etc.
    stop_times_all = list()

    for ids in list(stops_data.trip_id.unique()): 
        tempdf = stops_data[stops_data["trip_id"] == ids].copy()
        tempdf = tempdf.sort_values("stop_sequence")
        tempdict = dict()
        tempdict["trip_id"] = int(ids)
        tempdict["path"] = list()  
        for index, row in tempdf.iterrows():
            tempdict["path"].append({"stop_id": int(row["stop_id"]), "stop_name": row["stop_name"], "coordinates": row["coordinates"], "time": row["arrival_time"]})

        stop_times_all.append(tempdict)
        del tempdf
# 
    stop_times_all_json = json.dumps(stop_times_all)

    # show the user profile for that user
    return render_template("index.html", data=stop_times_all_json)

if __name__ == '__main__':
    app.run(debug=True)

