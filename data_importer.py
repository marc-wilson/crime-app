import psycopg2
import pandas as pd

connection = psycopg2.connect(host='ec2-50-17-203-51.compute-1.amazonaws.com', port='5432', dbname='dmiofp34d7sht',
                              user='rfacbcjizycwdl',
                              password='58ec71e5deca626dea647631b65719669587a5b56f69c6b7072dceeeda368d29')
cur = connection.cursor()

df_crime_data = pd.read_csv('data/crimes_2008.csv')
print(df_crime_data.isna().any())
for idx, c in df_crime_data.iterrows():
    try:
        cur.execute('''INSERT INTO cases (case_id, case_number, date, block, iucr, primary_type, description, location_description, arrest, domestic, beat, district, ward, community_area, fbi_code, x_coordinate, y_coordinate, year, updated_on, latitude, longitude, location)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''', (
        c['ID'], c['Case Number'], c['Date'], c['Block'], c['IUCR'], c['Primary Type'], c['Description'],
        c['Location Description'], c['Arrest'], c['Domestic'], c['Beat'], c['District'], c['Ward'], c['Community Area'],
        c['FBI Code'], c['X Coordinate'], c['Y Coordinate'], c['Year'], c['Updated On'], c['Latitude'], c['Longitude'],
        c['Location']))
        connection.commit()
    except:
        with open('misses.txt', 'a') as myFile:
            myFile.write(c['case_id'])
            myFile.close()

cur.close()
connection.close()
