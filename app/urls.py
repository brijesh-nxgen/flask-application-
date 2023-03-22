from app import  app
from .views import *

@app.route("/", methods=['GET','POST'])
def home_page():
	return Home_Page()


@app.route("/topics", methods=['GET','POST'])
def topics_api():
	return Topics_API()

@app.route("/topic/q/<url>/", methods=['GET','POST'])
def complate_api(url):
	return Complate_API(url)

@app.route("/q/<url>")
def topic_show(url):
	return Topic_Show(url)

@app.route("/update/q/<url>/", methods=['GET','POST'])
def update(url):
	return Update(url)


@app.route("/query", methods=['GET','POST'])
def search():
	return Search()