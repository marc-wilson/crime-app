from flask import Flask, flash, jsonify, render_template, request, url_for, redirect, session
from forms import LoginForm, SignupForm
from passlib.hash import sha256_crypt
from flask_heroku import Heroku

app = Flask(__name__)
app.secret_key = "crime-app"

@app.route('/')
@app.route('/index')

def index():
	if 'username' in session: 
		# session_user = User.query.filter_by(username=session['username']).first()
		return render_template('index.html', title='Home', session_username=session_user.username)
	else:
		return render_template('index.html', title='Home')

@app.route('/logout', methods=['POST'])
def logout():
	session.clear()
	return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
	print("hello")
	if 'username' in session:
		return redirect(url_for('index'))
	
	form = LoginForm()
	print(request.method)
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']

		user = User.query.filter_by(username=username).first()
		check_pw = False
		if (user):
			check_pw = sha256_crypt.verify(password, user.password)
		print(user, check_pw)
		if user is None or not check_pw:
			flash('Invalid username or password')
			return redirect(url_for('login'))
		else:
			session['username'] = username
			return redirect(url_for('index'))
	else:
		return render_template('login.html', title='Login', form=form)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
	if 'username' in session:
		return redirect(url_for('index'))
	
	form = SignupForm()
	if request.method == 'POST':
	
		username = request.form['username']
		password = request.form['password']
		existing_user = User.query.filter_by(username=username).first()
	 
		if existing_user:
			flash('The username already exists. Please pick another one.')
			return redirect(url_for('signup'))
		else:
			user = User(username=username, password=sha256_crypt.hash(password))
			db.session.add(user)
			db.session.commit()
			flash('Congratulations, you are now a registered user!')
			return redirect(url_for('login'))
	else:
		return render_template('signup.html', title='Signup', form=form)

if __name__ == '__main__':
	app.run(debug=True)

