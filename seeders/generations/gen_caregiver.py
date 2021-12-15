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

NUM_CAREGIVERS = 2
# id = 0
ids = random.sample(range(4), NUM_CAREGIVERS)
print(list(string.digits).remove('0'))
# os.makedirs('generated', exist_ok=True)
with open('caregivers.txt', 'w') as f:
    f.write("return queryInterface.bulkInsert('CareGivers', [")
    for i in range(NUM_CAREGIVERS):
        f.write("{"+"""
      id: {},
      patient_id: {},
      relationship: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    """.format(ids[i], ids[i-1], relationships[random.randint(0,1)])+'}, ')

with open('caregivers.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()
with open('caregivers.txt', 'a') as f:
    f.write(']);')