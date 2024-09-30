from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from models import Jobs
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify, make_response


jobs_ns = Namespace('jobs', description="Jobs namespace")


jobs_model = jobs_ns.model(
    "Jobs",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "rate": fields.Integer()
    }
)


@jobs_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        try:
            print("Successful")
            return make_response(jsonify({"message": "Hello World"}))
        except Exception as e:
            print("Failed")
            return make_response(jsonify({"error": str(e)}), 500)


@jobs_ns.route('/jobs')
class RecipesResource(Resource):
    # This returns the response in a json format
    @jobs_ns.marshal_list_with(jobs_model)
    @jwt_required()
    def get(self):
        """Get all jobs"""
        jobs = Jobs.query.all()
        return jobs

    @jobs_ns.marshal_with(jobs_model)
    @jobs_ns.expect(jobs_model)
    @jwt_required()
    def post(self):
        """Create a new job"""
        data = request.get_json()

        # Validate data
        if not data.get('title') or not data.get('description') or not data.get('rate'):
            return {"message": "Title, description, and rate are required"}, 400

        # Create and save the new job
        new_job = Jobs(
            title=data.get('title'),
            description=data.get('description'),
            # Ensure this is a float or the correct data type
            rate=data.get('rate')
        )

        try:
            new_job.save()
            return new_job, 201
        except Exception as e:
            return {"message": "Failed to create job", "error": str(e)}, 500


@jobs_ns.route('/jobs/<int:id>')
class RecipeResource(Resource):
    @jobs_ns.marshal_with(jobs_model)
    def get(self, id):
        """Get a job by id"""
        job = Jobs.query.get_or_404(id)
        return job

    @jobs_ns.marshal_with(jobs_model)
    # This protects the update route
    @jwt_required()
    def put(self, id):
        """Update a recipe by id"""
        job_to_update = Jobs.query.get_or_404(id)
        data = request.get_json()
        job_to_update.update(data.get('title'), data.get('description'))

        return job_to_update

    @jobs_ns.marshal_with(jobs_model)
    # This protects the delete route
    @jwt_required()
    def delete(self, id):
        """Delete a recipe by id"""
        job_to_delete = Jobs.query.get_or_404(id)
        job_to_delete.delete()
        return job_to_delete
