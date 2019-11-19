import os
import uuid
from sqlite3 import Error as SQLError
from datetime import datetime
from flask import Blueprint, request, jsonify, abort, current_app
from werkzeug.exceptions import NotFound
from app.db import get_db
from app.api_flask import ApiResponse
# from app.custom_error_handler import CustomErrorHandler

api = Blueprint('api', __name__)

@api.route('/recipes')
def recipes():
  res = ApiResponse()
  try:
    db = get_db()
    query = db.execute('SELECT * FROM recipe')
    res.data = [dict(row) for row in query.fetchall()]
    return res
  except BaseException as e:
    res.status = 500
    if current_app.config['ENV'] == 'development':
      res.message = str(e)
    return res


@api.route('/recipe', methods=['POST'])
@api.route('/recipe/<id>', methods=['GET', 'PUT', 'DELETE'])
def recipe(id=''):
  res = ApiResponse()

  try:
    db = get_db()

    if request.method == 'GET':
      sql = 'SELECT * FROM recipe WHERE id = ?'
      res.data = db.execute(sql, (id,)).fetchone()
      return res

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
        res.message = 'There is already a recipe called "{}". Please choose another title'.format(title)
        res.status = 400
        return res
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

        res.data = dict(id=id, date_created=date_created)
        res.status = 201

      return res

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
        res.message = 'There is already a recipe called "{}". Please choose another title'.format(title)
        res.status = 400
        return res
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

      return res

    elif request.method == 'DELETE':
      db.execute('DELETE FROM recipe WHERE id=?', (id,))

      return res

  except:
    abort(500)