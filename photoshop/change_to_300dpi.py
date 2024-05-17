
from PIL import Image
import os
import contextlib

folder = "/Users/sunshower/Documents/#OldDocumentBefore050824/javascript-test/adobe-test/output/"
dpi = (300, 300)
for filename in os.listdir(folder):
    file_path = os.path.join(folder, filename)
    if filename.endswith(".png") and os.path.isfile(file_path):
        print(filename)
        with Image.open(file_path) as img:
            img.save(file_path, dpi=dpi)
