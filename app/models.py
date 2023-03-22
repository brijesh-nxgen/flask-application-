from app import db
# store topics
model = db.Model
column = db.Column
string = db.String()
integer = db.Integer()
json = db.JSON()
boolean = db.Boolean()

class data_python_complate_topics(model):
	__tablename__  = 'data'
	def __init__(self, topic, date, key, complate_topics, url):
		self.topic = topic
		self.date = date
		self.key = key
		self.url = url
		self.complate_topics = complate_topics

	id = column(integer, primary_key=True)
	key = column(string, nullable=False, unique=True)
	topic = column(string, nullable=False)
	date = column(string, nullable=False)
	complate_topics = column(string)
	url = column(string)