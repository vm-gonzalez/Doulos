from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

# Cargar los versículos en memoria al iniciar
def load_verses():
    with open('verses.json', 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/')
def index():
    # Sirve el archivo HTML principal
    return render_template('index.html')

@app.route('/api/verse/<int:day>', methods=['GET'])
def get_verse(day):
    # Endpoint de la API que devuelve el versículo del día
    verses = load_verses()
    day_str = str(day)
    
    if day_str in verses:
        return jsonify({
            "day": day,
            "data": verses[day_str]
        }), 200
    else:
        return jsonify({"error": "Día fuera de rango o no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)