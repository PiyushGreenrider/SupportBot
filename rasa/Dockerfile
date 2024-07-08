# rasa/Dockerfile
FROM rasa/rasa:3.1.0-full
WORKDIR /
# Copy Rasa project files to the container
COPY . .
# Expose the port Rasa will run on
EXPOSE 5005
# Run Rasa server
CMD ["run", "-m", "models", "--enable-api", "--cors", "*", "--debug"]