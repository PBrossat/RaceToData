import fastf1
import json
import sys
import os

sysArgv = sys.argv
namePilote = sysArgv[1]
nameGP = sysArgv[2]
nameData = sysArgv[3]

if not os.path.exists("cache"):
 os.makedirs("cache")
fastf1.Cache.enable_cache("cache")
session = fastf1.get_session(2019, nameGP, 'R')
session.load()
fast_leclerc = session.laps.pick_driver(namePilote).pick_fastest()
lec_car_telemetry = fast_leclerc.get_telemetry()
dataCar = lec_car_telemetry[nameData]
# si nameData = "Brake" alors transformer True en 1 et False en 0
if nameData == "Brake":
    dataCar = dataCar.astype(int)
result = dataCar.to_json(orient="records")
parsed = json.loads(result)
json.dumps(parsed, indent=4)
print(parsed)