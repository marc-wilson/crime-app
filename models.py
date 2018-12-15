from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


class Case(db.Model):
    __tablename__ = 'cases'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    case_id = db.Column(db.Integer, nullable=False)
    case_number = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    block = db.Column(db.Text, nullable=False)
    iucr = db.Column(db.Text, nullable=False)
    primary_type = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    location_description = db.Column(db.Text, nullable=False)
    arrest = db.Column(db.Boolean, nullable=False)
    domestic = db.Column(db.Boolean, nullable=False)
    beat = db.Column(db.Integer, nullable=False)
    district = db.Column(db.Integer, nullable=False)
    ward = db.Column(db.Integer, nullable=False)
    community_area = db.Column(db.Integer, nullable=False)
    fbi_code = db.Column(db.Text, nullable=False)
    x_coordinate = db.Column(db.Text, nullable=False)
    y_coordinate = db.Column(db.Text, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    updated_on = db.Column(db.DateTime, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    location = db.Column(db.Text, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'case_id': self.case_id,
            'case_number': self.case_number,
            'date': self.date,
            'block': self.block,
            'iucr': self.iucr,
            'primary_type': self.primary_type,
            'description': self.description,
            'location_description': self.location_description,
            'arrest': self.arrest,
            'domestic': self.domestic,
            'beat': self.beat,
            'district': self.district,
            'ward': self.ward,
            'community_area': self.community_area,
            'fbi_code': self.fbi_code,
            'x_coordinate': self.x_coordinate,
            'y_coordinate': self.y_coordinate,
            'year': self.year,
            'updated_on': self.updated_on,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'location': self.location
        }


class Report(db.Model):
    __tablename__ = 'reports'
    rid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer, db.ForeignKey('users.uid'), nullable=False)
    type = db.Column(db.String, nullable=True)
    year = db.Column(db.Integer, nullable=True)
    district = db.Column(db.Integer, nullable=True)

    def to_json(self):
        return {
            'rid': self.rid,
            'uid': self.uid,
            'type': self.type,
            'year': self.year,
            'district': self.district
        }


class Predictive(db.Model):
    __tablename__ = 'predictive'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ds = db.Column(db.String, nullable=False)
    trend = db.Column(db.Numeric, nullable=False)
    yhat_lower = db.Column(db.Numeric, nullable=False)
    yhat_upper = db.Column(db.Numeric, nullable=False)
    trend_lower = db.Column(db.Numeric, nullable=False)
    trend_upper = db.Column(db.Numeric, nullable=False)
    additive_terms = db.Column(db.Numeric, nullable=False)
    additive_terms_lower = db.Column(db.Numeric, nullable=False)
    additive_terms_upper = db.Column(db.Numeric, nullable=False)
    daily = db.Column(db.Numeric, nullable=False)
    daily_lower = db.Column(db.Numeric, nullable=False)
    daily_upper = db.Column(db.Numeric, nullable=False)
    weekly = db.Column(db.Numeric, nullable=False)
    weekly_lower = db.Column(db.Numeric, nullable=False)
    weekly_upper = db.Column(db.Numeric, nullable=False)
    yearly = db.Column(db.Numeric, nullable=False)
    yearly_lower = db.Column(db.Numeric, nullable=False)
    yearly_upper = db.Column(db.Numeric, nullable=False)
    multiplicative_terms = db.Column(db.Numeric, nullable=False)
    multiplicative_terms_lower = db.Column(db.Numeric, nullable=False)
    multiplicative_terms_upper = db.Column(db.Numeric, nullable=False)
    yhat = db.Column(db.Numeric, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'ds': self.ds,
            'trend': self.trend,
            'yhat_lower': self.yhat_lower,
            'yhat_upper': self.yhat_upper,
            'trend_lower': self.trend_lower,
            'trend_upper': self.trend_upper,
            'additive_terms': self.additive_terms,
            'additive_terms_lower': self.additive_terms_lower,
            'additive_terms_upper': self.additive_terms_upper,
            'daily': self.daily,
            'daily_lower': self.daily_lower,
            'daily_upper': self.daily_upper,
            'weekly': self.weekly,
            'weekly_lower': self.weekly_lower,
            'weekly_upper': self.weekly_upper,
            'yearly': self.yearly,
            'yearly_lower': self.yearly_lower,
            'yearly_upper': self.yearly_upper,
            'multiplicative_terms': self.multiplicative_terms,
            'multiplicative_terms_lower': self.multiplicative_terms_lower,
            'multiplicative_terms_upper': self.multiplicative_terms_upper,
            'yhat': self.yhat
        }
