import random
import string
import os


characters = list(string.ascii_letters + string.digits)
relationships = ['Nurse', 'Companion']

def get_password(length=5, characters=characters):

	random.shuffle(characters)
	
	password = []
	for i in range(length):
		password.append(random.choice(characters))

	random.shuffle(password)

	return "".join(password)

NUM_sensor_readings = 5
id = 0
# ids = random.sample(range(4), NUM_sensor_readings)

patients = ['3', '2', '0']

lst = ['timestamp', 'sensor_reading', 'patient_id', 'sensor_id']

# os.makedirs('generated', exist_ok=True)
with open('sensor_readings.txt', 'w') as f:
    f.write("return queryInterface.bulkInsert('SensorUserData', [")
    for i in range(NUM_sensor_readings):
        f.write("{"+"""
      timestamp: {},
      patient_id: {},
      sensor_reading: '{:.2f}',
      sensor_id: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    """.format('new Date()', patients[random.randint(0,len(patients)-1)],
        random.uniform(10,80), random.randint(0,2))+'}, ')


with open('sensor_readings.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()
with open('sensor_readings.txt', 'a') as f:
    f.write(']);')