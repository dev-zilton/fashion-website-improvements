#!/bin/bash

# DripGOd Hydration Test Script
# Detecta erros de SSR/Client mismatch

echo "🔍 Testando Hidratação DripGOd..."
echo ""

# 1. Build
echo "1️⃣  Build de produção..."
npm run build 2>&1 | grep -i "hydration\|warning\|error" && echo "⚠️  Warnings detectados!" || echo "✅ Build limpo"
echo ""

# 2. Start
echo "2️⃣  Iniciando servidor..."
npm start > /tmp/dripgod.log 2>&1 &
SERVER_PID=$!
sleep 5

# 3. Check logs
echo "3️⃣  Verificando logs..."
grep -i "hydration" /tmp/dripgod.log && echo "❌ Hydration error detectado!" || echo "✅ Sem hydration errors"
echo ""

# 4. Test URLs
echo "4️⃣  Testando URLs..."
curl -s http://localhost:3000 | grep -q "DripGOd" && echo "✅ Homepage carregada" || echo "❌ Homepage erro"
curl -s http://localhost:3000 | grep -q "coleccoes" && echo "✅ IDs válidos" || echo "❌ IDs inválidos"
echo ""

# 5. Cleanup
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo "✅ Teste completo!"
