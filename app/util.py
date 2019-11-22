from werkzeug.exceptions import default_exceptions, HTTPException
from flask import Flask, Response, json

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
    


class ApiResponse:
  def __init__(self):
    self.data = None
    self.message = ''
    self.status = 200

  def to_response(self):
    return Response(
      json.dumps({
        'data': self.data,
        'message': self.message,
      }),
      status=self.status,
      mimetype='application/json'
    )


  
class ApiFlask(Flask):
  def make_response(self, rv):
    if isinstance(rv, ApiResponse):
      return rv.to_response()
    return Flask.make_response(self, rv)