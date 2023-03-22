import datetime
import random

def key(length):
	char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
	temp = random.choice(char[:51])
	for x in range(1,length):
		temp += random.choice(char)
	return temp

def time():
	current_time = datetime.datetime.now()
	return str(current_time)[:19]
