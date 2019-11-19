import os

# from werkzeug.routing import BaseConverter
from .api_flask import ApiFlask
# from .custom_error_handler import CustomErrorHandler
from .blueprints import api
from . import db

# class RegexConverter(BaseConverter):
#     def __init__(self, url_map, *items):
#         super(RegexConverter, self).__init__(url_map)
#         self.regex = items[0]


def create_app(config=None):
  app = ApiFlask(__name__)

  if config:
    app.config.from_object(config)
  
  app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path, 'recipe_keeper.sqlite')
  )

  try:
    os.makedirs(app.instance_path)
  except:
    pass

  # app.url_map.converters['regex'] = RegexConverter

  # error_handler = CustomErrorHandler()

  # error_handler.init_app(app)
  db.init_app(app)

  app.register_blueprint(api, url_prefix='/api')

  @app.route('/')
  @app.route('/<path:path>')
  def index(path=''):
    return app.send_static_file('index.html')


  return app