from flask import Flask, jsonify, request
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

catalog = [
    {"name": "White t-shirt", "type": "top"},
    {"name": "Blue Petrifun", "type": "shirt"},
    {"name": "Black tweed öä", "type": "coat"}
]

@app.route("/")
def hello():
    return "Hello World from Flask"

@app.route("/catalog")
def getCatalog():
    return jsonify(catalog)
    #return app.response_class(response=json.dumps(catalog), status=200, mimetype='application/json')

@app.route('/catalog', methods=['POST']) 
def addToCatalog():
    data = request.json
    catalog.append(data)
    return jsonify(data)

@app.route('/catalog/<id>', methods=['DELETE'])
def removeFromCatalog(id):
    catalog.pop(int(id))
    return jsonify(id)

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=8000)