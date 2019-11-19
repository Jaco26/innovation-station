from werkzeug.exceptions import default_exceptions, HTTPException
from app.api_flask import ApiResponse

class CustomErrorHandler:
  def error_to_api_reponse(self, error):
    res = ApiResponse()

    if isinstance(error, HTTPException):
      res.status = error.code
      res.message = str(error)
    else:
      res.status = 500
      res.message = str(error)
    
    return res
  
  def init_app(self, app):
    for code in default_exceptions.keys():
      app.register_error_handler(code, self.error_to_api_reponse)
    