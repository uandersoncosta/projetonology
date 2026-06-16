from flask import Flask
from flask_migrate import Migrate
from database.db import db
from models.consulta import Consulta
from routes.cashback_routes import cashback_bp

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(cashback_bp)

if __name__ == '__main__':
  app.run(debug=True, port=8080, host='0.0.0.0')