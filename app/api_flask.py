from flask import Flask, Response, json

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