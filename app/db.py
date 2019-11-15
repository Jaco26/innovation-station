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
  for_real = input('\n> Hey, just so you know, this will drop all tables currently defined and destroy all data in them.' +
                  '\n> Type "MY NAME IS DROPPY DROPPERSON" to continue. Enter anything else to cancel. ')
  if for_real.strip() == 'MY NAME IS DROPPY DROPPERSON':
    init_db()
    click.echo('Initialized the database!')
  else:
    click.echo('Okay 👍. You\'ll figure something else out 😀.')

def init_app(app):
  app.teardown_appcontext(close_db)
  app.cli.add_command(init_db_command)


