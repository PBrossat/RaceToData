from matplotlib import pyplot as plt
import fastf1 
from fastf1 import plotting
from matplotlib.pyplot import figure
import numpy as np
import pandas as pd
import sys
import os

fastf1.plotting.setup_mpl()
if not os.path.exists("cache/"):
    os.makedirs("cache/")
fastf1.Cache.enable_cache("cache/")

sysArgv = sys.argv
nameGP = sysArgv[1] 

saison = 2022

# Load the session data
race = fastf1.get_session(saison, nameGP, 'R')
race.load(laps=True)
laps = race.laps

pd.options.mode.chained_assignment = None

############################################################################# LAPTIME COMPARISON ############################################################################

# laps["LapTimeMillis"] = laps["LapTime"].dt.total_seconds() * 1000

# # # To get accurate laps only, we exclude in- and outlaps
# laps = laps.loc[(laps['PitOutTime'].isnull() & laps['PitInTime'].isnull())]

# plt.rcParams["figure.figsize"] = [15, 10]
# fig, ax = plt.subplots()

# visualized_teams = []

# for driver in race.results['Abbreviation']:
#     driver_laptimes = laps.pick_driver(driver)[["LapTimeMillis", "LapNumber", "Team"]].dropna() #enlever les nan
    
#     # Extract the team for coloring purploses
#     team = pd.unique(driver_laptimes['Team'])[0]
    
#     x = driver_laptimes["LapNumber"]
    
#     # y = driver_laptimes["LapTimeMillis"]
#     poly = np.polyfit(driver_laptimes['LapNumber'], driver_laptimes['LapTimeMillis'], 5)
#     y = np.poly1d(poly)(driver_laptimes['LapNumber'])
    
#     # Make sure that two teammates don't get the same line style
#     linestyle = '-' if team not in visualized_teams else ':'
    
#     ax.plot(x, y, label=driver, color=fastf1.plotting.team_color(team), linestyle = linestyle)
#     ax.set_title('Laptime comparison')
#     ax.set(xlabel='LapNumber', ylabel='Laptime (ms)')
#     ax.legend(loc='upper right')
    
#     visualized_teams.append(team)

# plt.show()

#######################################################################################################################################################

########################################################## Rythme moyen des pilotes ###############################################################

laps_rythme = laps[['Team', 'Driver', 'LapTime']].groupby(['Team', 'Driver']).mean().sort_values(['LapTime'])

plt.rcParams["figure.figsize"] = [15, 10]
plt.rcParams["figure.autolayout"] = True
fig, ax = plt.subplots()

# initialiser la variable pour stocker le temps du pilote précédent
prev_laptime = None

for i, driver_team in enumerate(laps_rythme.index):
    driver = driver_team[1]
    team = driver_team[0]
    laptime = laps_rythme.loc[driver_team]['LapTime']
    # convertir le temps en secondes
    laptime = laptime.total_seconds() 
    ax.barh(driver, laptime, color=fastf1.plotting.team_color(team))
    ax.set_title(f'Rythme moyen des pilotes - {nameGP} {saison}')
    ax.set(xlabel='Temps au tour (s)', ylabel='Pilote')
    
    # calculer et afficher la différence de temps par rapport au précédent pilote
    if prev_laptime is not None:
        delta = laptime - prev_laptime
        ax.text(laptime + 1, i, f'+{delta:.3f}s', ha='left', va='center', fontsize=8)
    
    prev_laptime = laptime

# plt.show()
plt.savefig('rythme_moyen_pilotes.png', dpi=300)

#######################################################################################################################################################

################################################################# Position finale et vitesse ################################################################

driver_speed = laps[['Driver', 'SpeedST', 'Team']].groupby(['Driver']).max().sort_values('SpeedST', ascending=False)
driver_position = race.results[['Abbreviation', 'Position']].sort_values('Position')
driver_position.rename(columns={'Abbreviation': 'Driver'}, inplace=True)

# jointure driver_speed et driver_position
driver_speed_position = driver_speed.merge(driver_position, on='Driver', how='inner')

driver_speed_position['SpeedST'] = driver_speed_position['SpeedST'].astype(float)
driver_speed_position['Position'] = driver_speed_position['Position'].astype(int)

plt.rcParams["figure.figsize"] = [15, 10]
plt.rcParams["figure.autolayout"] = True
fig, ax = plt.subplots()

print(driver_speed_position.index)

for driver in driver_speed_position.index:
    
    team = driver_speed_position.loc[driver, 'Team']
    color = fastf1.plotting.team_color(team)
    
    abr = driver_speed_position.loc[driver, 'Driver']
    
    ax.scatter(driver_speed_position.loc[driver, 'SpeedST'], driver_speed_position.loc[driver, 'Position'], label=abr, color=color, s=150, edgecolor='black')
    ax.text(driver_speed_position.loc[driver, 'SpeedST'] + 0.5, driver_speed_position.loc[driver, 'Position'], abr, fontsize=10, va='center', color=color)

    ax.set_title(f'Position finale et vitesse - {nameGP} {saison}')
    ax.set(xlabel='Vitesse Max (km/h)', ylabel='Position')
    ax.set_yticks(range(1, 21))
    # ax.legend(loc='upper right')
    
# plt.show()
plt.savefig('position_finale_vitesse.png', dpi=300)

#######################################################################################################################################################

################################################################# Temps au tour selon les pneus ################################################################

compound_colors = {
    'SOFT': '#FF3333',
    'MEDIUM': '#FFF200',
    'HARD': '#EBEBEB',
    'INTERMEDIATE': '#39B54A',
    'WET': '#00AEEF',
}

laps["LapTimeSec"] = laps["LapTime"].dt.total_seconds() 

# On exclut les tours d'entrée et de sortie des stands
laps_without_na = laps.loc[(laps['PitOutTime'].isnull() & laps['PitInTime'].isnull())]

quartile1 = laps_without_na["LapTimeSec"].quantile(0.25)
quartile3 = laps_without_na["LapTimeSec"].quantile(0.75)
interQuartileRange = quartile3 - quartile1

lapTimeMax = quartile3 + 1.5 * interQuartileRange
lapTimeMin = quartile1 - 1.5 * interQuartileRange

# remove outliers
laps_without_na.loc[laps_without_na["LapTimeSec"] > lapTimeMax, "LapTimeSec"] = np.nan
laps_without_na.loc[laps_without_na["LapTimeSec"] < lapTimeMin, "LapTimeSec"] = np.nan

plt.rcParams["figure.figsize"] = [15, 10]
plt.rcParams["figure.autolayout"] = True
fig, ax = plt.subplots()

times_compounds = laps_without_na[["LapTimeSec", "Compound"]].groupby(['Compound'])
laptimes = []

# créer une liste de couleurs pour chaque compound
colors = [compound_colors[compound] for compound in times_compounds.groups.keys()]

# pour chaque groupe de pneus de times_compounds, on récupère le nom du pneu/groupe (compound) et les données associées (group)
for compound, group in times_compounds:
    laptimes.append(group.dropna()['LapTimeSec'].values)
    
for i, (compound, group) in enumerate(times_compounds):
    laptimes.append(group.dropna()['LapTimeSec'].values)
    bp = ax.boxplot(laptimes[i], positions=[i], patch_artist=True, medianprops={'color': 'black'}, whiskerprops= {'color': 'white'}, capprops={'color': 'white'}, showfliers=False)
    for box in bp['boxes']:
        box.set(facecolor=colors[i])

plt.xticks(range(len(times_compounds.groups)), times_compounds.groups.keys())
plt.title(f'Temps au tour selon les types de pneus - {nameGP} {saison}')
plt.xlabel('Type de pneu')
plt.ylabel('Temps au tour (s)')
plt.legend()


# plt.show()
plt.savefig('temps_tour_pneus.png', dpi=300)

#######################################################################################################################################################

################################################################# Stratégie de course ################################################################
#https://medium.com/towards-formula-1-analysis/visualizing-formula-1-race-strategies-in-python-using-fastf1-pandas-and-matplotlib-95fe6b3298fa

driver_stints = laps[['Driver', 'Stint', 'Compound', 'LapNumber']].groupby(
    ['Driver', 'Stint', 'Compound']
).count().reset_index()
driver_stints = driver_stints.rename(columns={'LapNumber': 'StintLength'})
driver_stints = driver_stints.sort_values(by=['Stint'])

plt.rcParams["figure.figsize"] = [15, 10]
plt.rcParams["figure.autolayout"] = True

fig, ax = plt.subplots()

for driver in race.results['Abbreviation']:
    stints = driver_stints.loc[driver_stints['Driver'] == driver]
    previous_stint_end = 0
    for _, stint in stints.iterrows():
        plt.barh(
            [driver], 
            stint['StintLength'], 
            left=previous_stint_end, 
            color=compound_colors[stint['Compound']], 
            edgecolor = "black"
        )
        
        previous_stint_end = previous_stint_end + stint['StintLength']
        

plt.title(f'Stratégie de course - {nameGP} {saison}')
plt.xlabel('Tour')
# Invert y-axis 
plt.gca().invert_yaxis()
# Remove frame from plot
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
# Create custom legend
legend_elements = []
for compound in driver_stints['Compound'].unique():
    legend_elements.append(
        plt.Line2D([0], [0], marker='o', color='w', label=compound.capitalize(), markerfacecolor=compound_colors[compound], markersize=15)
    )
# Add legend to plot
plt.legend(handles=legend_elements, loc='lower right')

#plt.show()
plt.savefig('strategie_course.png', dpi=300)

#######################################################################################################################################################