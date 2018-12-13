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
