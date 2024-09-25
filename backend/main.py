from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required


app = Flask(__name__)
app.config.from_object(DevConfig)

# this registers sqlalchemy to work with our current application
db.init_app(app)

migrate = Migrate(app, db)

# Allow JWT to work in our app
JWTManager(app)

api = Api(app, doc='/docs')

# create a serializer which will help to serialize the model and be able to return
# responses from the model in json format
recipe_model = api.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)

sign_up_model = api.model(
    'SignUp',
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model = api.model(
    'Login',
    {
        "username": fields.String(),
        "password": fields.String()
    }
)


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@api.route('/signup')
class SignUp(Resource):
    # This decorator is used to serialize the message into json format
    @api.expect(sign_up_model)
    def post(self):
        # note that the request object is imported above and has the data from the client when doing the post method
        data = request.get_json()

        username = data.get('username')

        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message": f"User with username {username} already exists"})
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()

        return jsonify({"message": "User created Successfully"})


@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):
            # The access token hides the identity of the user who it belongs to
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )


@api.route('/recipes')
class RecipesResource(Resource):
    # This returns the response in a json format
    @api.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes"""
        recipes = Recipe.query.all()
        return recipes

    @api.marshal_with(recipe_model)
    @api.expect(recipe_model)
    @jwt_required()
    def post(self):
        """Create a new recipe"""
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201


@api.route('/recipe/<int:id>')
class RecipeResource(Resource):
    @api.marshal_with(recipe_model)
    def get(self, id):
        """Get a recipe by id"""
        recipe = Recipe.query.get_or_404(id)
        return recipe

    @api.marshal_with(recipe_model)
    # This protects the update route
    @jwt_required()
    def put(self, id):
        """Update a recipe by id"""
        recipe_to_update = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe_to_update.update(data.get('title'), data.get('description'))

        return recipe_to_update

    @api.marshal_with(recipe_model)
    # This protects the delete route
    @jwt_required()
    def delete(self, id):
        """Delete a recipe by id"""
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return recipe_to_delete


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
