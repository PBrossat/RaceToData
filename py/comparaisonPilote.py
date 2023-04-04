import fastf1 
from fastf1 import plotting
from matplotlib import pyplot as plt
from matplotlib.pyplot import figure
from matplotlib.collections import LineCollection
from matplotlib import cm
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import json
import sys
import os
import time


sysArgv = sys.argv
nameGP = sysArgv[1]
nomPilote1 = sysArgv[2]
nomPilote2 = sysArgv[3]
saison=2022


#TODO Je veux pourvoir récuperer :
# - le temps du meilleur tour
# - la position du pilote au départ 
# - la position du pilote à l'arrivée
# - les differents pneus utilisés par le pilote et leur durée de vie
# - la vitesse moyenne du pilote durant le gp

print ("je suis avant la creation du cache")
if not os.path.exists("py/cache"):
 os.makedirs("py/cache")
fastf1.Cache.enable_cache("py/cache")
print ("je suis apres la creation du cache")
tabNomGP=[]



saisonProgrammation = fastf1.get_event_schedule(2022)

#Rempli le tableau des noms des GP de la saison 2022
for i in range (1,23):
    tabNomGP.append(saisonProgrammation.get_event_by_round(i)['Location'])
# print(tabNomGP)



#! A appeler une unique fois pour load les datas des GP de 2022 dans le cache
# Remarque => si on l'appel une seconde fois il ne se passera rien car les datas sont deja dans le cache
def loadAllSession(saison, tabNomGP):
    for i in range(0, len(tabNomGP)):
        session = fastf1.get_session(saison, tabNomGP[i], 'R')
        session.load()

#! A appeler une unique fois pour load les datas des GP de 2022 dans le cache
# Remarque => si on l'appel une seconde fois il ne se passera rien car les datas sont deja dans le cache
def loadAllSessionLaps(saison, tabNomGP):
    for i in range(0, len(tabNomGP)):
        session = fastf1.get_session(saison, tabNomGP[i], 'R')
        session.load_laps()

def getColor(pilote):
    #recuperation de la couleur du pilote
    driverColor = fastf1.plotting.driver_colors(pilote)
    return driverColor



def getInitials(nomPilote):
    #mettre en majuscule le nom du pilote
    nomPilote = nomPilote.upper()
    #recuperer les trois premiere lettres de nomPilote
    return nomPilote[0:3]

#fonction permettant de recuperer le meilleur tour d'un pilote à partir de l'abbreviation de son nom sur une session donnée
def get_best_lap(session, driver):
    fast_lap = session.laps.pick_driver(driver).pick_fastest()
    return fast_lap

def get_starting_position(session, driver):
    #recuperation de la position de depart du pilote
    driver=session.get_driver(driver)
    grid_position = driver['GridPosition']
    return int(grid_position)


def get_position_lap(session, driver):
    #creation d'un tableau vide
    tabPosition=[]
    #recuperation de la position du pilote à chaque tour
    driver=session.laps.pick_driver(driver)


def get_finishing_position(session, driver):
    #recuperation de la position d'arrivee du pilote
    driver=session.get_driver(driver)
    finish_position = driver['Position'] 
    return int(finish_position)


def get_tyre(session, driver):
    driver=session.laps.pick_driver(driver)
    tyre= driver['Compound']
    #cration d'un fichier json avec les infos des pneus
    result = tyre.to_json(orient="records")
    parsed = json.loads(result)
    #mettre chaque valeur de tyre dans un tableau
    tyre= tyre.to_numpy()

    #création d'un tableau vide avec les types de pneus dans l'ordre 
    tabTyre=[]
    #initialisation du tableau avec le premier type de pneu
    tabTyre.append(tyre[0])
    #parcours du tableau tyre
    for i in range(1, len(tyre)):
        #si la valeur précédente est différente de la valeur actuelle on l'ajoute au tableau
        if tyre[i-1] != tyre[i]:
            tabTyre.append(tyre[i])
    
    return tabTyre



def get_tyreLife(session, driver):
    driver=session.laps.pick_driver(driver)
    tyreLife= driver['TyreLife']
    #cration d'un fichier json avec les infos des pneus (création dans le terminal)
    result = tyreLife.to_json(orient="records")
    parsed = json.loads(result)
    #mettre chaque valeur de tyreLife dans un tableau
    tyreLife= tyreLife.to_numpy()

    #création d'un tableau vide avec les types de pneus dans l'ordre
    tabTyreLife=[]
    #initialisation du tableau avec le premier type de pneu
    tabTyreLife.append(tyreLife[0])
    #parcours du tableau tyreLife
    for i in range(1, len(tyreLife)):
        #si la valeur actuel est égal à 1 on ajoute la valeur précédente au tableau
        if tyreLife[i] ==1.0:
            tabTyreLife.append(tyreLife[i-1])
    
    #float to int
    for i in range(0, len(tabTyreLife)):
        tabTyreLife[i]=int(tabTyreLife[i])
    return tabTyreLife


def comparaison_telemetry(session, pilote1, pilote2):
    telemetryPilote1=session.laps.pick_driver(pilote1).pick_fastest().get_telemetry().add_distance()
    telemetryPilote2=session.laps.pick_driver(pilote2).pick_fastest().get_telemetry().add_distance()
    # création d'un tableau avec les données à comparer
    data = ['RPM', 'Speed', 'Throttle', 'Brake', 'nGear']
    fig, ax = plt.subplots(len(data), figsize=(8, 8))
    fig.suptitle("Comparaison des telemetries de " + pilote1 + " et de " + pilote2 + "sur leur meilleur tour")
    #changer la couleur de fond de la figure en noir
    fig.patch.set_facecolor('grey')
    for i in range(len(data)):
        ax[i].plot(telemetryPilote1['Distance'], telemetryPilote1[data[i]], label=pilote1)
        ax[i].plot(telemetryPilote2['Distance'], telemetryPilote2[data[i]], label=pilote2)
        ax[i].set(ylabel=data[i])
    for a in ax.flat:
        a.label_outer()
    ax[0].legend()
    # fig.subplots_adjust(left=0.095, bottom=0.04, right=1, top=0.96, wspace=None, hspace=None)
    plt.show()
    
def get_best_lap(session, driver):
    fast_lap = session.laps.pick_driver(driver).pick_fastest()
    fastest_lap=fast_lap['LapTime']    
    fastest_lap=str(fastest_lap) #on convertit en string
    fastest_lap=fastest_lap[7:] #on enleve les 7 premiers caracteres
    return fastest_lap
    

def get_best_lap_by_sector(session, driver):
    fast_lap = session.laps.pick_driver(driver).pick_fastest()
    #creation d'un tableau vide de string avec les temps de chaque secteur
    tabTempsSecteur=[]
    #pour i allant de 1 à 3 (secteur 1, 2 et 3)
    for i in range(1, 4):
        nameSector='Sector'+str(i)+'Time'
        #on recupere le temps du secteur i
        tempsSecteur=fast_lap[nameSector]
        #on convertit en string
        tempsSecteur=str(tempsSecteur)
        #on enleve les 7 premiers caracteres
        tempsSecteur=tempsSecteur[7:]
        #on ajoute le temps du secteur i au tableau
        tabTempsSecteur.append(tempsSecteur)
    return tabTempsSecteur
    

def get_speed(session, driver):
    #recuperation du meilleur tour du pilote
    fast_lap = session.laps.pick_driver(driver).pick_fastest()
    #recuperation de la vitesse du pilote
    speed1=fast_lap['SpeedI1']
    speed2=fast_lap['SpeedI2']

    tabSpeed=[speed1, speed2]
    return tabSpeed



#fonction de comparaison entre 2 pilotes
def comparaison(grandPrix, saison, pilote1, pilote2):
    #si le fichier json existe deja on sort de la fonction (on ne fait rien)
    if os.path.exists('json/comparaisonPilote/comparaison'+pilote1+'_'+pilote2+'_'+grandPrix+'.json'):
        return
    
    session = fastf1.get_session(saison, grandPrix, 'R')
    #on load la session et les tours avec les telemetries
    session.load()
    session.load_laps(with_telemetry=True)

    nomPilote1=getInitials(pilote1)
    nomPilote2=getInitials(pilote2)

    #on récupere dans une variable la position de départ du pilote 1 et du pilote 2
    positionDepartPilote1=get_starting_position(session, nomPilote1)
    positionDepartPilote2=get_starting_position(session, nomPilote2)
    
    #on récupere dans une variable la position d'arrivée du pilote 1 et du pilote 2
    positionArriveePilote1=get_finishing_position(session, nomPilote1)
    positionArriveePilote2=get_finishing_position(session, nomPilote2)

    #on crée un tableau contenant les pneus utilisés par les 2 pilotes (deux tableaux différents)
    tabPneuPilote1=get_tyre(session, nomPilote1)
    tabPneuPilote2=get_tyre(session, nomPilote2)

    #on crée un tableau contenant la durée de vie des pneus utilisés par les 2 pilotes (deux tableaux différents)
    tabDureePneuPilote1=get_tyreLife(session, nomPilote1)
    tabDureePneuPilote2=get_tyreLife(session, nomPilote2)

    #on récupere dans une variable le meilleur tour du pilote 1 et du pilote 2
    meilleurTourPilote1=get_best_lap(session, nomPilote1)
    meilleurTourPilote2=get_best_lap(session, nomPilote2)

    #on récupere dans un tableau les temps de chaque secteur du meilleur tour du pilote 1 et du pilote 2
    tabTempsSecteurPilote1=get_best_lap_by_sector(session, nomPilote1)
    tabTempsSecteurPilote2=get_best_lap_by_sector(session, nomPilote2)

    #création de deux objets contenant les informations des deux pilotes
    objetPilote1={
        "nomPilote": nomPilote1,
        "GrandPrix": grandPrix,
        "positionDepart": positionDepartPilote1,
        "positionArrivee": positionArriveePilote1,
        "pneu": tabPneuPilote1,
        "dureePneu": tabDureePneuPilote1,
        "meilleurTour": meilleurTourPilote1,
        "tempsSecteur": tabTempsSecteurPilote1,
        }
    
    objetPilote2={
        "nomPilote": pilote2,
        "GrandPrix": grandPrix,
        "positionDepart": positionDepartPilote2,
        "positionArrivee": positionArriveePilote2,
        "pneu": tabPneuPilote2,
        "dureePneu": tabDureePneuPilote2,
        "meilleurTour": meilleurTourPilote2,
        "tempsSecteur": tabTempsSecteurPilote2,
        }
    

    with open('json/comparaisonPilote/comparaison'+pilote1+'_'+pilote2+'_'+grandPrix+'.json', 'w') as f:
            json.dump([objetPilote1, objetPilote2], f, indent=4)

    

        
comparaison(nameGP, saison, nomPilote1, nomPilote2)





#recuperation des meilleurs tours de chaque pilote
# hamilton_lap=get_best_lap(session, 'HAM')
# verstappen_lap=get_best_lap(session, 'VER')




#----------------------------------Comparaison meilleurs minisecteurs----------------------------------
# fastest_ham_lap=hamilton_lap.get_telemetry().add_distance()
# fastest_ver_lap=verstappen_lap.get_telemetry().add_distance()

# # Since the telemetry data does not have a variable that indicates the driver, 
# # we need to create that column
# fastest_ver_lap['Driver'] = 'VER'
# fastest_ham_lap['Driver'] = 'HAM'

# # Combine le telemetry de hamilton et verstappen
# telemetry = fastest_ver_lap.append(fastest_ham_lap)

# #Le nombre de mini-sectors est arbitraire
# num_minisectors = 25

# # Permet de recupperer la longueur totale du circuit (valeur max de la colonne distance)
# total_distance = max(telemetry['Distance'])

# # Creer des segments de longueur egale (à partir du nombre de mini-sectors)
# minisector_length = total_distance / num_minisectors

# # Initialise la liste des minisectors avec le premier minisector (0)
# minisectors = [0]

# # Add multiples of minisector_length to the minisectors
# for i in range(0, (num_minisectors - 1)):
#     minisectors.append(minisector_length * (i + 1)) # i + 1 car on a deja ajoute le premier minisector (0)

# # ajoute le dernier minisector (valeur max de la colonne distance)
# telemetry['Minisector'] = telemetry['Distance'].apply(
#     lambda dist: (
#         int((dist // minisector_length) + 1) 
#     )
# )

# # Calcule la vitesse moyenne de chaque pilote par minisector
# average_speed = telemetry.groupby(['Minisector', 'Driver'])['Speed'].mean().reset_index()



# # Selectionne le pilote ayant la vitesse moyenne la plus elevee par minisector
# fastest_driver = average_speed.loc[average_speed.groupby(['Minisector'])['Speed'].idxmax()]

# # Renomme les colonnes pour faciliter la lecture
# fastest_driver = fastest_driver[['Minisector', 'Driver']].rename(columns={'Driver': 'Fastest_driver'})

# # Ajout de fastest_driver à telemetry pour avoir le nom du pilote ayant la vitesse moyenne la plus elevee par minisector
# telemetry = telemetry.merge(fastest_driver, on=['Minisector'])

# # ordonne les valeurs par distance
# telemetry = telemetry.sort_values(by=['Distance'])

# # verstappen = 1, hamilton = 2
# telemetry.loc[telemetry['Fastest_driver'] == 'VER', 'Fastest_driver_int'] = 1
# telemetry.loc[telemetry['Fastest_driver'] == 'HAM', 'Fastest_driver_int'] = 2

# #Creation du plot avec les segments de couleurs differentes
# x = np.array(telemetry['X'].values)
# y = np.array(telemetry['Y'].values)

# points = np.array([x, y]).T.reshape(-1, 1, 2)
# segments = np.concatenate([points[:-1], points[1:]], axis=1)
# fastest_driver_array = telemetry['Fastest_driver_int'].to_numpy().astype(float)

# cmap = cm.get_cmap('winter', 2)
# lc_comp = LineCollection(segments, norm=plt.Normalize(1, cmap.N+1), cmap=cmap)
# lc_comp.set_array(fastest_driver_array)
# lc_comp.set_linewidth(5)

# plt.rcParams['figure.figsize'] = [18, 10]

# plt.gca().add_collection(lc_comp)
# plt.axis('equal')
# plt.tick_params(labelleft=False, left=False, labelbottom=False, bottom=False)

# cbar = plt.colorbar(mappable=lc_comp, boundaries=np.arange(1,4))
# cbar.set_ticks([1.5, 2.5])
# cbar.set_ticklabels(['HAM', 'VER'])

# plt.savefig(f"2021_ver_ham_q.png", dpi=300)

# plt.show()

#----------------------------------Fin comparaison meilleurs minisecteurs----------------------------------






#recuperation des donnees de chaque pilote
# verstappen_tel = verstappen_lap.get_car_data().add_distance()
# hamilton_tel = hamilton_lap.get_car_data().add_distance()


#Gestion du graphique
#! Optionnel


#couleur de chaque pilote
# rbr_color = fastf1.plotting.team_color('RBR')
# mer_color = fastf1.plotting.team_color('MER')


# fig, ax = plt.subplots()
# ax.plot(verstappen_tel['Distance'], verstappen_tel['Speed'], color=rbr_color, label='VER')
# ax.plot(hamilton_tel['Distance'], hamilton_tel['Speed'], color=mer_color, label='HAM')

# ax.set_xlabel('Distance en metre')
# ax.set_ylabel('Vitesse en km/h')

# ax.legend()
# plt.suptitle(f"Fastest Lap Comparison \n "
#              f"{session.event['EventName']} {session.event.year} Course ")

# plt.show()



