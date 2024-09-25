from flask_restx import Namespace, Resource

# we create a namespace which will help us register in the main application
auth_ns = Namespace('auth', description="Authentication")
