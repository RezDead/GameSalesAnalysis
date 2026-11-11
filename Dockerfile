FROM postgres:17

# Install dos2unix to permanently fix Windows formatting during the build phase
RUN apt-get update && apt-get install -y dos2unix && rm -rf /var/lib/apt/lists/*

# Copy your local scripts folder into a safe place inside the container image
COPY ./database /internal-scripts

# Fix all line endings completely so they are native Linux files
RUN dos2unix /internal-scripts/*.sh