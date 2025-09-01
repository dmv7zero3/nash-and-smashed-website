#!/bin/bash
# Setup script for Local SEO Generator

echo "🚀 Setting up Local SEO Generator..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p src/core/Blogs/Templates/LocalSEO
mkdir -p dist/blogs/nash-and-smashed/json
mkdir -p backup/blogs/nash-and-smashed
mkdir -p dist/sitemaps

# Check if Ollama is installed
echo "🔍 Checking for Ollama..."
if command -v ollama &> /dev/null; then
    echo "✅ Ollama is installed"
    
    # Check for model
    if ollama list | grep -q "llama3.2"; then
        echo "✅ llama3.2 model found"
    else
        echo "📥 Pulling llama3.2 model..."
        ollama pull llama3.2
    fi
else
    echo "❌ Ollama not found. Please install from https://ollama.ai"
    echo "   On macOS: brew install ollama"
    echo "   On Linux: curl -fsSL https://ollama.ai/install.sh | sh"
fi

# Make scripts executable
chmod +x validate_system.py
chmod +x run.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start Ollama service: ollama serve"
echo "2. Validate the system: python validate_system.py"
echo "3. Generate content: python run.py generate 1"
echo ""
echo "🎯 Quick commands:"
echo "  python run.py generate 5                              # Generate 5 blogs"
echo "  python run.py single \"Best Chicken Wings\" \"Manassas VA\"  # Generate single blog"
echo "  python run.py export                                   # Export all content"
echo "  python run.py config                                   # Show configuration"