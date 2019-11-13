import os
from flask import Flask
from . import db
from .blueprints import api


def create_app(config=None):
  app = Flask(__name__)
  if config:
    app.config.from_object(config)
  
  app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path, 'recipe_keeper.sqlite')
  )

  try:
    os.makedirs(app.instance_path)
  except:
    pass

  db.init_app(app)

  app.register_blueprint(api, url_prefix='/api')
  
  @app.route('/')
  @app.route('/<path:path>')
  def index(path=''):
    return app.send_static_file('index.html')


  return app