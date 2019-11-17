import uuid
import re
from sqlite3 import Error as SQLError
from datetime import datetime
from flask import Blueprint, request, jsonify, abort
from app.db import get_db

api = Blueprint('api', __name__)

class ApiResponse:
  def __init__(self):
    self.data = None
    self.messages = []

  def json(self):
    return dict(data=self.data, messages=self.messages)

@api.route('/recipes')
def recipes():
  res = ApiResponse()
  try:
    db = get_db()
    query = db.execute('SELECT * FROM recipe')
    res.data = [dict(row) for row in query.fetchall()]
    return jsonify(res.json())
  except BaseException as e:
    print(e)
    abort(500)


@api.route('/recipe', methods=['POST'])
@api.route('/recipe/<id>', methods=['GET', 'PUT', 'DELETE'])
def recipe(id=''):
  res = ApiResponse()

  try:
    db = get_db()

    if request.method == 'GET':
      sql = 'SELECT * FROM recipe WHERE id = ?'
      res.data = db.execute(sql, (id,)).fetchone()

      return jsonify(res.json())

    elif request.method == 'POST':
      body = request.get_json()

      id = uuid.uuid4().hex
      date_created = datetime.utcnow()
      title = body.get('title')
      unique_title = body.get('unique_title')
      description = body.get('description')
      markdown = body.get('markdown')
      html = body.get('html')

      query1 = db.execute('SELECT * FROM recipe WHERE unique_title = ?', [unique_title])
      exists =  query1.fetchone()
      if exists:
        res.messages.append('There is already a recipe called "{}". Please choose another title'.format(title))
      else:
        query2 = '''INSERT INTO recipe (
                  id,
                  date_created,
                  title,
                  unique_title,
                  description,
                  markdown,
                  html
                ) VALUES (?,?,?,?,?,?,?)
              '''

        db.execute(query2, (id, date_created, title, unique_title, description, markdown, html))
        db.commit()

        res.data = id

      return jsonify(res.json()), 201

    elif request.method == 'PUT':
      body = request.get_json()

      title = body.get('title')
      unique_title = body.get('unique_title')
      description = body.get('description')
      markdown = body.get('markdown')
      html = body.get('html')

      query1 = db.execute('SELECT * FROM recipe WHERE unique_title = ? AND id != ?', [unique_title, id])
      exists =  query1.fetchone()
      if exists:
        res.messages.append('There is already a recipe called "{}". Please choose another title'.format(title))
      else:
        query2 = '''
        UPDATE recipe SET 
          date_updated=:date_updated,
          title=:title,
          unique_title=:unique_title,
          description=:description,
          markdown=:markdown,
          html=:html
        WHERE id=:id'''

        db.execute(query2, {
          'date_updated': datetime.utcnow(),
          'title': title,
          'unique_title': unique_title,
          'description': description,
          'markdown': markdown,
          'html': html,
          'id': id,
        })
        db.commit()

      return jsonify(res.json())

    elif request.method == 'DELETE':
      db.execute('DELETE FROM recipe WHERE id=?', (id,))

      return jsonify(res.json())

  except:
    abort(500)