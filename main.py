from flask import Flask
from flask import render_template


app = Flask(__name__,
            static_url_path='/static',
            static_folder="static")


@app.route("/leaderboard")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5002", debug=True)
