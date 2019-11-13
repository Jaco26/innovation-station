import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify, abort
from app.db import get_db

api = Blueprint('api', __name__)

@api.route('/recipes')
def recipes():
  try:
    db = get_db()
    res = db.execute('SELECT * FROM recipe').fetchall()
    return jsonify(res)
  except BaseException as e:
    print(e)
    abort(500)


@api.route('/recipe/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def recipe(id=''):
  db = get_db()

  if request.method == 'GET':
    sql = 'SELECT * FROM recipe WHERE id = ?'
    recipe = db.execute(sql, (id,)).fetchone()
    return jsonify(recipe)

  elif request.method == 'POST':
    body = request.get_json()

    id = uuid.uuid4().hex()
    date_created = datetime.utcnow()
    title = body.get('title', '')
    description = body.get('description', '')
    markdown = body.get('markdown', '')
    html = body.get('html', '')

    sql = '''INSERT INTO recipe (
              id,
              date_created,
              title,
              description,
              markdown,
              html
            ) VALUES (?,?,?,?,?,?)
          '''

    recipe = db.execute(sql, (id, date_created, title, description, markdown, html))
    return jsonify({}), 201

  elif request.method == 'PUT':
    body = request.get_json()

    sql = '''UPDATE recipe SET 
              date_updated=:date_updated,
              title=:title,
              description=:description,
              markdown=:markdown,
              html=:html
            WHERE id=:id
          '''
    db.execute(sql, {
      'date_updated': datetime.utcnow(),
      'title': body.get('title'),
      'description': body.get('description'),
      'markdown': body.get('markdown'),
      'html': body.get('html'),
      'id': id,
    })

    return jsonify({})

  elif request.method == 'DELETE':
    db.execute('DELETE FROM recipe WHERE id=?', (id,))

    return jsonify({})
