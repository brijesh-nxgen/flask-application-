from flask import request, render_template, redirect, jsonify
from .forms import form_topic
from .models import data_python_complate_topics as dc
from app import db
from .auth import time, key
from  slugify import slugify

def Home_Page():
	form = form_topic.fom_topics()
	if form.validate() and request.method=='POST':
		add = dc(topic=form.topic.data, date=time(), key=key(20), url=slugify(form.topic.data), complate_topics=form.complate_topics.data)
		db.session.add(add)
		db.session.commit()
		db.session.close()
		return redirect("/")
	else:
		return render_template("index.html", form=form)

def Topics_API():
	data = dc.query.all()
	temp = {}
	for x in data:
		temp[x.key] ={
		'key':x.key,
		'url':x.url,
		'topic':x.topic,
		'complate':x.complate_topics,
		'date':x.date,
		}
	return jsonify({'res':temp})

def Complate_API(url):
	data = dc.query.filter_by(url=url).first()
	temp = {}
	temp[data.key] ={
	'key':data.key,
	'url':data.url,
	'topic':data.topic,
	'complate':data.complate_topics,
	'date':data.date,
	}
	return jsonify({'res':temp})

def Topic_Show(url):
	form = form_topic.fom_topics()
	return render_template("topics/complate-topics.html", form=form)

def Update(url):
	if request.method=='POST':
		check_url = dc.query.filter_by(url=url).first()
		if(check_url):
			check_url.complate_topics = request.form['data']
			check_url.topic = request.form['title']
			check_url.url = slugify(request.form['title'])
			db.session.commit()
			db.session.close()
			return jsonify(200)
		else:
			return jsonify(404)
	else:
		return jsonify({'hello':'get'})
def Search():
	form = form_topic.fom_topics()
	check_query = dc.query.filter(dc.complate_topics.like(f"%{request.form['query']}%")).all()
	return render_template("search.html", check_query=check_query,form=form)