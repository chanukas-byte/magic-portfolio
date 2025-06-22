import os
import requests
from pathlib import Path

# Create directories if they don't exist
directories = [
    'public/images/projects/ai-platform',
    'public/images/projects/robotics',
    'public/images/projects/ml-platform'
]

for directory in directories:
    Path(directory).mkdir(parents=True, exist_ok=True)

# Image URLs for AI Platform
ai_platform_images = {
    'deep-learning.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'neural-network.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'ai-visualization.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
}

# Image URLs for Robotics
robotics_images = {
    'robot-arm.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'computer-vision.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'autonomous-system.jpg': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
}

def download_image(url, save_path):
    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {save_path}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Download AI Platform images
for filename, url in ai_platform_images.items():
    save_path = os.path.join('public/images/projects/ai-platform', filename)
    download_image(url, save_path)

# Download Robotics images
for filename, url in robotics_images.items():
    save_path = os.path.join('public/images/projects/robotics', filename)
    download_image(url, save_path) 