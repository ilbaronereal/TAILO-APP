#!/bin/bash

# Vai nella cartella del progetto (stessa cartella di questo file)
cd "$(dirname "$0")"

echo "=============================="
echo "  TAiLO App - Avvio in corso"
echo "=============================="
echo ""

# Libera la porta 5173 se occupata
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Installa le dipendenze se mancanti
if [ ! -d "node_modules/react" ]; then
  echo "Installazione dipendenze..."
  npm install --legacy-peer-deps
  npm install react@18.3.1 react-dom@18.3.1 --force
  echo ""
fi

echo "Server in avvio su http://localhost:5173"
echo ""
echo "Per SPEGNERE l'app: chiudi questa finestra (o premi Ctrl+C)"
echo ""

# Apri il browser quando il server è pronto
(until curl -s http://localhost:5173 > /dev/null 2>&1; do sleep 1; done && open http://localhost:5173) &

# Avvia il server sulla porta fissa 5173
npm run dev -- --port 5173
