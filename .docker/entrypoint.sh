#!/bin/bash
echo "Intalling app.."
exec npm install
exec npm run typeorm migration:run
exec npm run dev
