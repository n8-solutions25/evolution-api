FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires à Puppeteer/Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    ca-certificates \
    bash \
    udev \
    git

# Copier les fichiers package.json
COPY package*.json ./

# Installer les dépendances npm sans télécharger Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install

# Copier tous les fichiers de l'application
COPY . .

# Définir les variables d'environnement nécessaires à Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV CHROME_BIN=/usr/bin/chromium-browser

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "index.js"]
