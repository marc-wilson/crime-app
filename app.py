from flask import Flask, render_template, redirect, url_for, request, session
from models import db, User
from passlib.hash import sha256_crypt
from forms import LoginForm, SignupForm

app = Flask(__name__)
app.secret_key = 'shhhhitsasecret'

app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgres://rfacbcjizycwdl:58ec71e5deca626dea647631b65719669587a5b56f69c6b7072dceeeda368d29@ec2-50-17-203-51.compute-1.amazonaws.com:5432/dmiofp34d7sht';
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


# General Redirect
@app.route('/')
def redir():
    return redirect(url_for('index'))


# Index
@app.route('/index')
def index():
    if 'username' in session:
        user = User.query.filter_by(username=session['username']).first()
        return render_template('index.html', session_username=user.username)
    else:
        return render_template('index.html')


# Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            # Username already exists. Do something meaninful
            return redirect(url_for('signup'))
        else:
            user = User(username=username, password=sha256_crypt.hash(password))
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('index'))
    else:
        return render_template('signup.html')


# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user is None:
            return redirect(url_for('login'))
        elif sha256_crypt.verify(password, user.password):
            session['username'] = user.username
            return redirect(url_for('index'))
        else:
            # TODO: Invalid Credentials
            return redirect(url_for('login'))
    else:
        return render_template('login.html', form=LoginForm())


# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
