# from app.__init__ import app

# if __name__ == "__main__":
#     app.run


from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
