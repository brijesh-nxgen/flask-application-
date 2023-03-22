from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SubmitField, HiddenField
from wtforms.validators import DataRequired, Email, EqualTo

# topics form
class fom_topics(FlaskForm):
	topic = StringField('topics')
	complate_topics = HiddenField('topics')
