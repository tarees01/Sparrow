from flask import Flask, request, Blueprint, render_template, \
                  flash, g, session, redirect, url_for

app = Flask(__name__)
app.config.from_object('flaskconfig')

@app.errorhandler(404)
def not_found(error):
    return "404 error", 404

@app.errorhandler(401)
def not_found(error):
    return "Not Authenticated", 401

from app.views import general
app.register_blueprint(general.mod)
