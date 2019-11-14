import sqlite3
import click
import functools
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
  if 'db' not in g:
    g.db = sqlite3.connect(
      current_app.config['DATABASE'],
      detect_types=sqlite3.PARSE_DECLTYPES
    )
    g.db.row_factory = sqlite3.Row
  return g.db

def close_db(e=None):
  db = g.pop('db', None)
  if db:
    db.close()

def init_db():
  db = get_db()
  with current_app.open_resource('schema.sql') as f:
    db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command():
  init_db()
  click.echo('Initialized the database!')

def init_app(app):
  app.teardown_appcontext(close_db)
  app.cli.add_command(init_db_command)

# def execute_query(fetch='all'):
#   def func_accepter(func):
#     @functools.wraps(func)
#     def wrapper(*args, **kwargs):
#       db = get_db()
#       sql, *params = func(*args, **kwargs)
#       sql = sql.lower().strip()
#       try:
#         if sql.startswith('select'):
#           query = db.execute(sql, params)
#           if fetch == 'all':
#             return query.fetchall()
#           elif fetch == 'one':
#             return query.fetchone()
#         elif sql.startswith('insert') or sql.startswith('update') or sql.startswith('delete'):
#           db.execute(sql, params)
#           db.commit()
#           return True
#       except BaseException as err:
#         print('Query Failed: %s\nError: %s' % (sql, str(err)))
#         raise err

# def execute_query(sql, *params):
#   db = get_db()
#   sql = sql.lower().strip()
#   try:
#     if sql.startswith('select'):
#       query = db.execute(sql, params)
#       if fetch == 'all':
#         return query.fetchall()
#       elif fetch == 'one':
#         return query.fetchone()
#     elif sql.startswith('insert') or sql.startswith('update') or sql.startswith('delete'):
#       db.execute(sql, params)
#       db.commit()
#       return True
#   except BaseException as err:
#     print('Query Failed: %s\nError: %s' % (sql, str(err)))
#     raise err
