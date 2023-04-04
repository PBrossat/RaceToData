import fastf1
import json
import sys
import os

sysArgv = sys.argv
namePilote1 = sysArgv[1]
namePilote2 = sysArgv[2]    
nameGP = sysArgv[3]

saison = 2022

if not os.path.exists("py/cache/"):
    os.makedirs("py/cache/")
fastf1.Cache.enable_cache("py/cache/")
session = fastf1.get_session(saison, nameGP, 'R')
session.load()

fast_pilote1 = session.laps.pick_driver(namePilote1).pick_fastest()
fast_pilote2 = session.laps.pick_driver(namePilote2).pick_fastest()

pilote1_car_telemetry = fast_pilote1.get_telemetry()
pilote2_car_telemetry = fast_pilote2.get_telemetry()

#BRAKE

pilote1Brake = pilote1_car_telemetry['Brake']
#transformer True en 1 et False en 0
pilote1Brake = pilote1Brake.astype(int)
pilote1Brake = json.loads(pilote1Brake.to_json(orient="records"))

pilote2Brake = pilote2_car_telemetry['Brake']
#transformer True en 1 et False en 0
pilote2Brake = pilote2Brake.astype(int)
pilote2Brake = json.loads(pilote2Brake.to_json(orient="records"))


#COORDX

pilote1CoordX = pilote1_car_telemetry['X']
pilote1CoordX = json.loads(pilote1CoordX.to_json(orient="records"))

pilote2CoordX = pilote2_car_telemetry['X']
pilote2CoordX = json.loads(pilote2CoordX.to_json(orient="records"))
json

#COORDY

pilote1CoordY = pilote1_car_telemetry['Y']
pilote1CoordY = json.loads(pilote1CoordY.to_json(orient="records"))

pilote2CoordY = pilote2_car_telemetry['Y']
pilote2CoordY = json.loads(pilote2CoordY.to_json(orient="records"))

#DRS

pilote1DRS = pilote1_car_telemetry['DRS']
pilote1DRS = json.loads(pilote1DRS.to_json(orient="records"))

pilote2DRS = pilote2_car_telemetry['DRS']
pilote2DRS = json.loads(pilote2DRS.to_json(orient="records"))

#NGEAR

pilote1NGear = pilote1_car_telemetry['nGear']
pilote1NGear = json.loads(pilote1NGear.to_json(orient="records"))

pilote2NGear = pilote2_car_telemetry['nGear']
pilote2NGear = json.loads(pilote2NGear.to_json(orient="records"))

#RPM

pilote1RPM = pilote1_car_telemetry['RPM']
pilote1RPM = json.loads(pilote1RPM.to_json(orient="records"))

pilote2RPM = pilote2_car_telemetry['RPM']
pilote2RPM = json.loads(pilote2RPM.to_json(orient="records"))

#SPEED

pilote1Speed = pilote1_car_telemetry['Speed']
pilote1Speed = json.loads(pilote1Speed.to_json(orient="records"))

pilote2Speed = pilote2_car_telemetry['Speed']
pilote2Speed = json.loads(pilote2Speed.to_json(orient="records"))


#THROTTLE

pilote1Throttle = pilote1_car_telemetry['Throttle']
pilote1Throttle = json.loads(pilote1Throttle.to_json(orient="records"))

pilote2Throttle = pilote2_car_telemetry['Throttle']
pilote2Throttle = json.loads(pilote2Throttle.to_json(orient="records"))

#TIME

pilote1Time = pilote1_car_telemetry['Time']
pilote1Time = json.loads(pilote1Time.to_json(orient="records"))

pilote2Time = pilote2_car_telemetry['Time']
pilote2Time = json.loads(pilote2Time.to_json(orient="records"))

#Création des objets JSON

pilote1 = {
    "name": namePilote1,
    "brake": pilote1Brake,
    "coordX": pilote1CoordX,
    "coordY": pilote1CoordY,
    "drs": pilote1DRS,
    "nGear": pilote1NGear,
    "rpm": pilote1RPM,
    "speed": pilote1Speed,
    "throttle": pilote1Throttle,
    "time": pilote1Time,
}

pilote2 = {
    "name": namePilote2,
    "brake": pilote2Brake,
    "coordX": pilote2CoordX,
    "coordY": pilote2CoordY,
    "drs": pilote2DRS,
    "nGear": pilote2NGear,
    "rpm": pilote2RPM,
    "speed": pilote2Speed,
    "throttle": pilote2Throttle,
    "time": pilote2Time,
}

with open('json/simulationGP/'+namePilote1+'_'+namePilote2+'_'+nameGP+'.json', 'w') as f:
    json.dump([pilote1, pilote2], f, indent=4)
