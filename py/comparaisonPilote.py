import fastf1 
import json
import sys
import os



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


if not os.path.exists("py/cache"):
 os.makedirs("py/cache")
fastf1.Cache.enable_cache("py/cache")
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
#def get_best_lap(session, driver):
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
    tyreLife= driver['TyreLife']
    tyre=tyre.to_numpy()
    tyreLife=tyreLife.to_numpy()
    

    #création d'un tableau vide avec les types de pneus dans l'ordre 
    tabTyre=[]
    #initialisation du tableau avec le premier type de pneu
    tabTyre.append(tyre[0])
    #parcours du tableau tyre
    for i in range(1, len(tyreLife)):
        #si la valeur actuelle est plus petite que la valeur précédente (ou si elle est aussi égale à 1), 
        #alors on ajoute le type de pneu actuel dans le tableau tabTyre
        if tyreLife[i]<=tyreLife[i-1]:
            tabTyre.append(tyre[i])
    return tabTyre

def get_tyre_and_lap_number_best_lap(session, driver):
    #création d'un tableau de taille 2
    tabTyreAndLapNumberBestLap=[]
    fast_lap_tyre = session.laps.pick_driver(driver).pick_fastest()["Compound"]
    fast_lap_number = int(session.laps.pick_driver(driver).pick_fastest()["LapNumber"])
    tabTyreAndLapNumberBestLap.append(fast_lap_tyre)
    tabTyreAndLapNumberBestLap.append(fast_lap_number)
    return tabTyreAndLapNumberBestLap
    


def get_tyreLife(session, driver):
    driver=session.laps.pick_driver(driver)
    tyreLife= driver['TyreLife']
    tyreLife=tyreLife.to_numpy()
    

    #création d'un tableau vide avec les types de pneus dans l'ordre
    tabTyreLife=[]
    #initialisation du tableau avec le premier type de pneu
    tabTyreLife.append(1)
    #parcours du tableau tyreLife
    for i in range(1, len(tyreLife)):
        #si la valeur actuelle est plus petite que la valeur précédente (ou si elle est aussi égale à 1),
        #alors on ajoute le type de pneu actuel dans le tableau tabTyre
        if tyreLife[i] <=tyreLife[i-1] :
            tabTyreLife.append(i+1)
    tabTyreLife.append(len(tyreLife)) #ajout le dernier élément du tableau
    return tabTyreLife

def get_nb_lap_done(session,driver):
    driver=session.laps.pick_driver(driver)
    tyreLife= driver['TyreLife']
    return len(tyreLife)

    
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

def get_status(session,driver):
    driver=session.get_driver(driver)
    grid_position = driver['Status']
    return grid_position


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

    #on récupere dans une variable le pneu utilisé
    pneuMeilleurTourPilote1=get_tyre_and_lap_number_best_lap(session, nomPilote1)[0]
    pneuMeilleurTourPilote2=get_tyre_and_lap_number_best_lap(session, nomPilote2)[0]

    #on récupere dans une variable le numéro du tour du meilleur tour du pilote 1 et du pilote 2
    numeroMeilleurTourPilote1=get_tyre_and_lap_number_best_lap(session, nomPilote1)[1]
    numeroMeilleurTourPilote2=get_tyre_and_lap_number_best_lap(session, nomPilote2)[1]

    #on crée un tableau contenant la durée de vie des pneus utilisés par les 2 pilotes (deux tableaux différents)
    tabDureePneuPilote1=get_tyreLife(session, nomPilote1)
    tabDureePneuPilote2=get_tyreLife(session, nomPilote2)

    #on récupere dans une variable le meilleur tour du pilote 1 et du pilote 2
    meilleurTourPilote1=get_best_lap(session, nomPilote1)
    meilleurTourPilote2=get_best_lap(session, nomPilote2)

    #on récupere dans un tableau les temps de chaque secteur du meilleur tour du pilote 1 et du pilote 2
    tabTempsSecteurPilote1=get_best_lap_by_sector(session, nomPilote1)
    tabTempsSecteurPilote2=get_best_lap_by_sector(session, nomPilote2)

    #on récupere le status de course du pilote (fini, crash, collision, etc...)
    statuPilote1=get_status(session, nomPilote1)
    statuPilote2=get_status(session, nomPilote2)

    #on récupère le nombre de tours effectués par le pilote 1 et le pilote 2 (grâce au tableau de durée de vie des pneus)
    nbTourEffectueesPilote1=tabDureePneuPilote1[len(tabDureePneuPilote1)-1] #renvoie un entier 
    nbTourEffectueesPilote2=tabDureePneuPilote2[len(tabDureePneuPilote2)-1] #renvoie un entier

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
        "pneuMeilleurTour": pneuMeilleurTourPilote1,
        "numeroMeilleurTour": numeroMeilleurTourPilote1,
        "statu": statuPilote1,
        "nbToursEffectuees": nbTourEffectueesPilote1,
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
        "pneuMeilleurTour": pneuMeilleurTourPilote2,
        "numeroMeilleurTour": numeroMeilleurTourPilote2,
        "statu": statuPilote2,
        "nbToursEffectuees": nbTourEffectueesPilote2,
        }
    

    with open('json/comparaisonPilote/comparaison'+pilote1+'_'+pilote2+'_'+grandPrix+'.json', 'w') as f:
            json.dump([objetPilote1, objetPilote2], f, indent=4)

    

comparaison(nameGP, saison, nomPilote1, nomPilote2)




