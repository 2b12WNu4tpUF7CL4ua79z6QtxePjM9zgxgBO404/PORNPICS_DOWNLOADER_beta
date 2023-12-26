import requests
import os
from bs4 import BeautifulSoup

# Function to create the images directory if it doesn't exist
def create_images_directory(directory="images"):
    if not os.path.exists(directory):
        os.makedirs(directory)

# Main script
url = input('Enter the URL: ')
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
imgElements = soup.select("li.thumbwook a")
imageUrls = set()

# Create the images directory
create_images_directory()

for element in imgElements:
    imgUrl = element['href']
    imgName = imgUrl.split('/')[-1]
    if imgUrl not in imageUrls:
        imageUrls.add(imgUrl)
        response = requests.get(imgUrl, stream=True)
        with open(f'./images/{imgName}', 'wb') as file:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    file.write(chunk)