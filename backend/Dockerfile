# Use the official Python image from the Docker Hub
FROM python:3.8
# Set the working directory in the container
WORKDIR /
# Copy the requirements file into the container
COPY requirements.txt requirements.txt
# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt
# Copy the rest of the code into the container
COPY . .
# Expose the port FastAPI runs on
EXPOSE 8000
# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]