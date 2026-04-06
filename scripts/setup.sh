#!/bin/bash
set -e

echo "🚀 Setting up nextjs-saas-starter..."
echo ""

# Check dependencies
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required. Install from https://nodejs.org"; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "❌ npx is required. Install Node.js 18+"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    # Generate NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
    sed -i.bak "s|generate-with-openssl-rand-base64-32|${SECRET}|" .env.local 2>/dev/null || true
    rm -f .env.local.bak
    echo "✅ Created .env.local with generated NEXTAUTH_SECRET"
    echo "⚠️  Edit .env.local to add your Stripe and database credentials"
else
    echo "✅ .env.local already exists"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your Stripe + database credentials"
echo "  2. Run: npx prisma db push"
echo "  3. Run: npm run dev"
echo "  4. Open http://localhost:3000"
