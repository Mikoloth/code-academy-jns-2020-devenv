from flask import Flask, request, jsonify
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

catalog = [
    {"name": "White t-shirt", "type": "shirt"},
    {"name": "weed jacket", "type": "jacket"},
    {"name": "särmä pants", "type": "pants"}
]

@app.route("/")
def hello():
    return "Hello World from Flask"

@app.route("/catalog", methods=['GET'])
def getCatalog():
    return jsonify(catalog)

@app.route("/catalog", methods=['POST'])
def addToCatalog():
    data = request.json
    catalog.append(data)
    return jsonify(data)

@app.route("/catalog/<id>", methods=['DELETE'])
def removeFromCatalog():
    data = id
    catalog.pop(int(data))
    return jsonify(data)

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=8000)