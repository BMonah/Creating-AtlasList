from exts import db
"""
class Jobs:
    id:int primary key
    title:str
    description:str(text)
"""


class Jobs(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    rate = db.Column(db.Integer())

    # below method will help us return string representation of objects created from the class

    def __repr__(self):
        return f"<Jobs {self.title}>"

    # create a save CRUD operation method

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title = title
        self.description = description

        db.session.commit()


# User model
"""
class User:
    id: integer
    username:string
    email: string
    password:string
"""


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    # Return a string representation of our object
    def __repr__(self):
        return f"<User {self.username}>"

    # save method to be called in main
    def save(self):
        db.session.add(self)
        db.session.commit()
