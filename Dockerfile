# Utilisation de l'image officielle Node.js
FROM node:18-alpine

# Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tous les fichiers de l'application Angular
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Utiliser Nginx pour servir les fichiers construits
FROM nginx:alpine

# Copier les fichiers de build Angular dans le répertoire Nginx
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
